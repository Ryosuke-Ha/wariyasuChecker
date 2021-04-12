import { AbstractControl, FormControl, FormGroup} from '@angular/forms';

export class LoginValidator{
  public static checkValidPass(control: FormControl){
    let hasNumber = /\d/.test(control.value);
    let hasAlphabet = /[A-Za-z]/.test(control.value);

    const valid = hasNumber && hasAlphabet;

    if(!valid){
      return { password: true };
    }

    return null;
  }

  static comparePass(abstractControl: AbstractControl): void{
    const pass = abstractControl.get('pass').value;
    const comfirmPass =abstractControl.get('comfirmPass').value;

    if(pass !== comfirmPass){
      abstractControl.get('comfirmPass').setErrors({ comparePass: true});
    }
  }
}
