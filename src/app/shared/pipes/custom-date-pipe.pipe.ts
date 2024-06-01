import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDatePipe',
  standalone: true
})
export class CustomDatePipePipe implements PipeTransform {

  transform(timestamp: number, format?: string): string {
    const date = new Date(timestamp);
    let options: Intl.DateTimeFormatOptions;

    switch (format) {
      case 'short':
        options = { year: 'numeric', month: 'short', day: 'numeric' };
        break;
      case 'long':
        options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        break;
      default:
        options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    }

    return date.toLocaleDateString(undefined, options);
  }


}
