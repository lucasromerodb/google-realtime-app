import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsolesListModule } from "../consoles-list/consoles-list.module";

@NgModule({
  imports: [CommonModule, ConsolesListModule],
  exports: [CommonModule, ConsolesListModule]
})
export class CoreModule {}
