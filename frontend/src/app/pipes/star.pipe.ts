import { NgIterable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'star'
})
export class StarPipe implements PipeTransform {

  transform(value: number, arg: String):NgIterable<Number> {

    if(arg === 'before'){

      return Array(Math.floor(value)).fill(1).map((x,i) => i)

    }else{

      return Array(5 - Math.floor(value)).fill(1).map((x,i) => i);

    }

  }

}
