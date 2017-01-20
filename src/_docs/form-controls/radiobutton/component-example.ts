import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { BaseExampleComponent } from '../../baseexample.component';

@Component({
	selector: 'doc-radio',
  template: `
<doc-template [markdown]="markdown" [example]="example" [typedoc]="typedoc_content">
<samRadioButton
  [(model)]="radioModel"
  [options]="radioConfig.options"
  [label]="radioConfig.label"
  [hint]="radioConfig.hint"
  [name]="radioConfig.name"
  [errorMessage]="radioConfig.errorMessage">
</samRadioButton>
</doc-template>
`
})
export class RadioExampleComponent extends BaseExampleComponent implements OnInit {
	radioModel: any = 'ma';
  radioConfig = {
    options: [
      {value: 'dc', label: 'DC', name: 'radio-dc'},
      {value: 'ma', label: 'Maryland', name: 'radio-maryland'},
      {value: 'va', label: 'Virginia', name: 'radio-virginia'},
    ],
    name: 'radio-component',
    label: 'Select a region',
    errorMessage: '',
    hint: ''
  };
  typedoc_target = "radiobutton.component";
  typedoc_content = "";
  markdown = require("html-loader!markdown-loader!./documentation.md");
	example = `<samRadioButton
  [(model)]="radioModel"
  [options]="radioConfig.options"
  [label]="radioConfig.label"
  [hint]="radioConfig.hint"
  [name]="radioConfig.name"
  [errorMessage]="radioConfig.errorMessage">
</samRadioButton>`;
}