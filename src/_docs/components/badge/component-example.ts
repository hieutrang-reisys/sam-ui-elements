
import {
  Component,
  OnInit,
  Input,
  ComponentRef,
  ViewChild,
  ViewRef,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { BaseExampleComponent } from '../../baseexample.component';
import { markdownLoader } from '../../markdown-loader';

//tabs/spacing matters for code example block
var code_example = `
<div style='width:400px; height:400px; border:3px dotted black; position:relative;'>
  <sam-badge [options]="{attached:'top-right'}">hello</sam-badge>
</div>`;

@Component({
	selector: 'doc-sam-badge',
  template: '<doc-template [markdown]="markdown" [example]="example" [typedoc]="typedoc_content">'+ code_example +'</doc-template>'
})
export class SamBadgeComponentExampleComponent extends BaseExampleComponent implements OnInit {
  typedoc_target = "SamBadgeComponent";
  typedoc_content = "";

  documentation = require('raw-loader!./documentation.md');
  markdown = markdownLoader(this.documentation);
  
	example = code_example;
}