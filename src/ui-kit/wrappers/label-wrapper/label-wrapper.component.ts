import { Component, Input, ViewChild,HostListener, AfterViewChecked,ChangeDetectorRef } from '@angular/core';
import { AbstractControl } from "@angular/forms";

@Component({
  selector: 'sam-label-wrapper',
  templateUrl: 'label-wrapper.template.html',
})
export class LabelWrapper implements AfterViewChecked{
  @Input() label: string;
  @Input() name: string;
  @Input() hint: string;
  @Input() required: boolean = false;
  @Input() errorMessage: string;

  @ViewChild('labelDiv')
  public labelDiv: any;
  @ViewChild('hintContainer')
  public hintContainer: any;
  private showToggle: boolean = false;
  private toggleOpen: boolean = false;
  private lineSize: number;
  private lineLimit: number = 2;
  private checkMore = false;//semaphore
  constructor(private cdr: ChangeDetectorRef) { }
  ngOnChanges(c){
    if(!this.checkMore && c['hint'] && c['hint']['previousValue']!= c['hint']['currentValue']){
      //needs to be open to recalc correctly in ngAfterViewChecked
      this.showToggle = false;
      this.toggleOpen = false;
      this.checkMore = true;
      this.cdr.detectChanges();
    }
  }

  ngAfterViewInit(){
    this.calcToggle();
  }

  ngAfterViewChecked(){
    if(this.checkMore){
      this.calcToggle();
      this.cdr.detectChanges();
      this.checkMore = false;
    }
  }

  calcToggle(){
    if(this.hintContainer){
      let numOfLines = this.calculateNumberOfLines(this.hintContainer.nativeElement);
      if(numOfLines>this.lineLimit){
        this.showToggle = true;
      } else {
        this.showToggle = false;
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //needs to be open to recalc correctly in ngAfterViewChecked
    this.showToggle = false;
    this.toggleOpen = false;
    this.checkMore = true;
    this.cdr.detectChanges();
  }

  toggleHint(status){
    this.toggleOpen = !status;
  }

  calculateNumberOfLines = function(obj){
    if(!this.lineSize){
      let other = obj.cloneNode(true);
      other.innerHTML = 'a<br>b';
      other.style.visibility = "hidden";
      let el = <HTMLElement>document.getElementsByTagName("body")[0];
      el.appendChild(other);
      this.lineSize = other.offsetHeight / 2;
      el.removeChild(other);
    }
    let val = Math.floor(obj.offsetHeight /  this.lineSize);
    return val;
  }

  formatErrors(control: AbstractControl) {
    if (!control) {
      return;
    }
    // if(control.pristine){
    //   this.errorMessage = "";
    //   return;
    // }

    if (control.invalid && control.errors) {
      for (let k in control.errors) {
        let errorObject = control.errors[k];
        switch (k) {
          case 'maxlength':
            const actualLength = errorObject.actualLength;
            const requiredLength = errorObject.requiredLength;
            this.errorMessage = `${actualLength} characters input but max length is ${requiredLength}`;
            return;
          case 'required':
            this.errorMessage = 'This field cannot be empty';
            return;
          case 'isNotBeforeToday':
            this.errorMessage = "Date must not be before today";
            return;
          default:
            if (errorObject.message) {
              this.errorMessage = errorObject.message;
            } else {
              this.errorMessage = 'Invalid';
            }
            return;
        }
      }
    } else if (control.valid) {
      this.errorMessage = '';
    }
  }
  clearError(){
    this.errorMessage = '';
  }
}
