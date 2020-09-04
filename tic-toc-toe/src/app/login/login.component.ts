import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
//import { } from '@fortawesome/free-solid-svg-icons';
import { faGooglePlusG, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {
  }


  faGoogle = faGooglePlusG;
  fafacebook = faFacebookSquare;


  get email() {
    return this.loginform.get('email');
  }


  get password() {
    return this.loginform.get('password');
  }


  loginform = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(12), Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
  });



  ///////AJAX//////////////////
  async loginHere() {
    const data = this.loginform.value;

    const url = 'http://localhost :5600/login';

    const result: any = await this.http.post(url, data).toPromise();

    if (result.opr) {
      //sesssion manangemt

      sessionStorage.setItem('sid', 'true');

      this.router.navigate(['game']);

    } else {

      //this.uiInvalidCredential = true;
    }

    //console.log(data);
  }



  RegisterPage() {
    this.router.navigate(['signup']);
  }


  ForgotPage() {
    this.router.navigate(['forgot-password']);
  }

}
