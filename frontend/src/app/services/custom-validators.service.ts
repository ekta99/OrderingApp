import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }
   validateEmail(c: FormControl): any {
    let EMAIL_REGEXP = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return c.value ? EMAIL_REGEXP.test(c.value) ? null : {
      emailInvalid: {
        message: "Invalid Format!"
      }
    } : null;
  }

  PasswordStrengthValidator (control: AbstractControl): ValidationErrors | null {

    let value: string = control.value || '';
  
    if (!value) {
      return null
    }
    let upperCaseCharacters = /[A-Z]+/g
    if (upperCaseCharacters.test(value) === false) {
      return { passwordStrength: ` Password should contain at least an uppercase and a lowercase character, a number and a special character` };
    }
  
    let lowerCaseCharacters = /[a-z]+/g
    if (lowerCaseCharacters.test(value) === false) {
      return { passwordStrength: ` Password should contain at least an uppercase and a lowercase character, a number and a special character` };
    }
  
  
    let numberCharacters = /[0-9]+/g
    if (numberCharacters.test(value) === false) {
      return { passwordStrength: ` Password should contain at least an uppercase and a lowercase character, a number and a special character` };
    }
  
    let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    if (specialCharacters.test(value) === false) {
      return { passwordStrength: ` Password should contain at least an uppercase and a lowercase character, a number and a special character` };
    }
    return null;
  }

   matchValidator(control: AbstractControl) {
    const password: string = control.get("password")?.value; // get password from our password form control
    const confirmPassword: string = control.get("confirmPassword")?.value; // get password from our confirmPassword form control
    
    // if the confirmPassword value is null or empty, don't return an error.
    if (!confirmPassword?.length) {
      return null;
    }

    // if the confirmPassword length is < 8, set the minLength error.
    // if (confirmPassword.length < 6) {
    //   control?.get('confirmPassword')?.setErrors({ minLength: true });
    // } else {
      // compare the passwords and see if they match.
      if (password !== confirmPassword) {
        control.get("confirmPassword")?.setErrors({ mismatch: true });
      } else {
        // if passwords match, don't return an error.
        return null;
      }
    // }
    return null;
  }
}
