import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(items: any, searchText: string | boolean ): any[] {
    if(!items) return [];
   if(typeof searchText === 'boolean' && searchText){
    return items.filter( (item: any) => {
      return item.discountPercentage>20;
    });
   }else{
    searchText = typeof searchText ==='string'? searchText.trim():searchText;
    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter( (item: any) => {
      return item.productName.toLowerCase().includes(searchText);
    });
   }
  }
}
