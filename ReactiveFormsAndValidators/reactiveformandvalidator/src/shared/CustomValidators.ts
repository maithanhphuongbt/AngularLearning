import {AbstractControl} from '@angular/forms';
import {ValidatorFn} from '@angular/forms'; // Interface

export const emailValidator = (): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: string} => {
    const result = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i.test(
      control.value
    );
    console.log(`emailValidator = ${result}`);
    return result === true ? null : {error: 'Wrong email format'};
  };
};
