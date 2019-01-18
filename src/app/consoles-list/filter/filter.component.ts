import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})
export class FilterComponent {
  inputText: string;
  @Output() outputText: EventEmitter<string> = new EventEmitter();

  onChange(): void {
    this.outputText.emit(this.inputText);
  }
}
