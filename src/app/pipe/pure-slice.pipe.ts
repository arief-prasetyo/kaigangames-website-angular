import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pureSlice'
})
export class PureSlicePipe implements PipeTransform {

  transform(str: string, start?: number, end?: number): string;
    transform<T>(arr: readonly T[], start?: number, end?: number): T[];
    transform(obj: string | readonly unknown[], start?: number, end?: number): string | unknown[] {
        return obj.slice(start, end);
  }

}
