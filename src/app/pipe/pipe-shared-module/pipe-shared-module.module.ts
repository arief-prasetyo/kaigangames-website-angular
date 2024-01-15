import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HtmldataPipe } from '../htmldata.pipe';
import { SanitizedHtmlPipe } from '../sanitized-html.pipe';
import { TruncateTextPipe } from '../truncate-text.pipe';
import { PureSlicePipe } from '../pure-slice.pipe';

@NgModule({
  declarations: [
    HtmldataPipe,
    SanitizedHtmlPipe,
    TruncateTextPipe,
    PureSlicePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HtmldataPipe,
    SanitizedHtmlPipe,
    TruncateTextPipe,
    PureSlicePipe
  ]
})
export class PipeSharedModuleModule { }
