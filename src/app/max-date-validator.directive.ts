import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function maxDateValidator(maxDate: Date): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const dateValue = new Date(control.value);
    var dateDif = maxDate.valueOf() - dateValue.valueOf();
    
    return dateDif < 0 ? {'maxDate': {dateValue}} : null;
  };
}

@Directive({
  selector: '[maxDate]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxDateValidatorDirective, multi: true}]
})
export class MaxDateValidatorDirective implements Validator, OnChanges {
  @Input() dateValue: Date;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['maxDate'];
    if (change) {
      const val: string | Date = change.currentValue;
      const maxDate = val instanceof Date ? val : new Date(val);
      this.valFn = maxDateValidator(maxDate);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}


