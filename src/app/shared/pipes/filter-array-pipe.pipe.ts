import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArrayPipe',
  standalone: true
})
export class FilterArrayPipePipe implements PipeTransform {

  transform(items: any[], property: string, filterValue: any): any[] {
    if (!items) return [];
    return items.filter(item => item[property] === filterValue);  }

}
