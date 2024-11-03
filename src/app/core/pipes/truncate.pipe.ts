import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform
{
  transform(value: string, wordLimit: number = 10, trail: string = '...'): string
  {
    //return value.length > wordLimit ? value.substring(0, wordLimit) + trail : value;
    if (!value) return '';
    const words = value.split(' '); // Split by spaces to get words
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + trail : value;
  }
}
