import { Component, Input } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";

@Component({
  selector: "consoles-list",
  templateUrl: "consoles-list.component.html"
})
export class ConsolesListComponent {
  consoles: Observable<any[]>;
  filterBy: string = "";

  constructor(db: AngularFireDatabase) {
    this.consoles = db.list("consoles").valueChanges();
  }

  onFilter(e): void {
    this.filterBy = e;
  }
}
