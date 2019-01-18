import { NgModule } from "@angular/core";
import { ConsolesComponent } from "./consoles/consoles.component";
import { FilterComponent } from "./filter/filter.component";
import { ConsolesListComponent } from "./consoles-list.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabase } from "@angular/fire/database";

import { environment } from "../../environments/environment";
import { SharedModule } from "../shared/shared.module";
import { FilterPipe } from "../shared/filter.pipe";

@NgModule({
  declarations: [
    FilterPipe,
    ConsolesListComponent,
    ConsolesComponent,
    FilterComponent
  ],
  imports: [
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AngularFireDatabase],

  exports: [ConsolesListComponent]
})
export class ConsolesListModule {}
