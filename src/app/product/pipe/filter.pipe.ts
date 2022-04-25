import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../models/productModel';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], prop: string, filteredText?: string): any {
    debugger;
    if (!value) {
      return value;
    }
    if (!filteredText) {
      return value;
    }

    const filter = filteredText.toLocaleLowerCase();
    return value.filter(
      (product) => product[prop]?.toLocaleLowerCase().indexOf(filter) !== -1
    );
  }
}
