import { Component, OnInit } from "@angular/core";
import { FilterPipe } from "../filter.pipe";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})
export class FilterComponent {
  filterText: any;
  constructor() {}
}
