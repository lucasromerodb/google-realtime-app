import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filterText?: string): any[] {
    if (!items) {
      return [];
    }
    if (!filterText) {
      return items;
    }

    filterText = filterText.toLowerCase();

    return items.filter(item => {
      return item.console.toLowerCase().includes(filterText);
    });
  }
}
