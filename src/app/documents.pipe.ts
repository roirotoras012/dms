import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documents'
})
export class DocumentsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
