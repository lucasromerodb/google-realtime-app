import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabase } from "@angular/fire/database";

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { ConsolesComponent } from "./consoles/consoles.component";
import { FilterComponent } from "./filter/filter.component";
import { FilterPipe } from "./filter.pipe";

@NgModule({
  declarations: [AppComponent, ConsolesComponent, FilterComponent, FilterPipe],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule {}
