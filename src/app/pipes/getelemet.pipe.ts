import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getelemet'
})
export class GetelemetPipe implements PipeTransform {

  transform(object: any = [], index: number): any {

      return Object.values(object)[index];
  }

}
