import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabase } from "@angular/fire/database";

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { ConsolesComponent } from "./consoles/consoles.component";

@NgModule({
  declarations: [AppComponent, ConsolesComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule {}
