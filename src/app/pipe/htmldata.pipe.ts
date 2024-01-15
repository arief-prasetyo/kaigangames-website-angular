import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'htmldata'
})
export class HtmldataPipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){}

  transform(value: any, ...args: any[]): unknown {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
