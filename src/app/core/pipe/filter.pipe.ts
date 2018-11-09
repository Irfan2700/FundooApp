import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;

    args = args.toLowerCase();

    return value.filter(function(items) {
      let obj = {
        "title": items.title,
        "description": items.description,
        "noteLabels": items.noteLabels
      }
      return JSON.stringify(obj).toLowerCase().includes(args);
    })
  }

}
