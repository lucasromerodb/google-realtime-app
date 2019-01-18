import { Component, Input } from "@angular/core";

@Component({
  selector: "app-consoles",
  templateUrl: "./consoles.component.html",
  styleUrls: ["./consoles.component.css"]
})
export class ConsolesComponent {
  @Input() consoles: any[];
  @Input() filterBy: string;
}
