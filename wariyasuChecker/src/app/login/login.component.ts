import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginValidator } from './loginValidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginMailForm = new FormControl('',[
    Validators.required,
    Validators.email
  ]);
  loginPassForm = new FormControl('',[
    Validators.required,
    Validators.minLength(7)
  ]);

  siginMailForm = new FormControl('',[
    Validators.required,
    Validators.email
  ]);
  siginPassForm = new FormControl('',[
    Validators.required,
    Validators.minLength(7),
    LoginValidator.checkValidPass
  ]);
  siginComfirmPassForm = new FormControl('',[
    Validators.required
  ]);

  loginFormGroup = this.fb.group({
    mail: this.loginMailForm,
    pass: this.loginPassForm
  });

  siginFormGroup = this.fb.group({
    mail: this.siginMailForm,
    pass: this.siginPassForm,
    comfirmPass: this.siginComfirmPassForm
  },{
    validators:[
      LoginValidator.comparePass
    ]
  });

  showLogin = true;


  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  changeDisplay(): void{
    this.showLogin = !this.showLogin;
  }

  login(){
    alert('login');
  }

  sigin(){
    alert('sigin');
  }
}
