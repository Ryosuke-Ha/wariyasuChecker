import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  signinFrom: FormGroup;

  loginMailForm = new FormControl('',[Validators.required]);
  loginPassForm: FormControl;

  siginMailForm: FormControl;
  siginPassForm: FormControl;
  siginComfirmPassForm: FormControl;

  showLogin = true;

  constructor() { }

  ngOnInit(): void {

  }

  changeDisplay(): void{
    this.showLogin = !this.showLogin;
  }

}
