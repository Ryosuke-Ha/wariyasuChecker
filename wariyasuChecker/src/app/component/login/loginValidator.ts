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

  // public static comfirmPass(control: FormControl, abstractControl: AbstractControl){
  //   // const pass = group.controls['siginPassForm'].value;
  //   // const comfirmPass = group.controls['siginComfirmPassForm'].value;

  //   // if(pass.value !== comfirmPass.value){
  //   //   return { comfirmPass: true};
  //   // }
  //   // else{
  //   //   return null;
  //   // }

  //   return { comfirmPass: true};
  // }
}
