
import {
  Component,
  OnInit,
  Input,
  ComponentRef,
  ViewChild,
  ViewRef,
  TemplateRef,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';
import { BaseExampleComponent } from '../../baseexample.component';

//tabs/spacing matters for code example block
var code_example = `<sam-label-wrapper label="Fieldset Label Example" hint="Hint text goes here">
  <sam-text label="Field #1" name="field1"></sam-text>
</sam-label-wrapper>`;


@Component({
  selector: 'doc-sam-label-wrapper',
  template: '<doc-template [markdown]="markdown" [example]="example" [typedoc]="typedoc_content">' + code_example + '</doc-template>'
})
export class LabelWrapperExampleComponent extends BaseExampleComponent implements OnInit {
  typedoc_target = "LabelWrapper";
  typedoc_content = "";
  markdown = require("html-loader!markdown-it-loader!./documentation.md");
  example = code_example;
}