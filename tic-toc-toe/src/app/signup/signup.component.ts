import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormGroup, FormBuilder, Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router,
    private fb: FormBuilder,
    private http: HttpClient) { }



  ngOnInit(): void {
  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]),
    email: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8),]),
    cpassword: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8),]),
  });




  get username() {
    return this.form.get('username');
  }



  get email() {
    return this.form.get('email');
  }


  get password() {
    return this.form.get('password');
  }


  get cpassword() {
    return this.form.get('cpassword');
  }


  //////Ajax////////////
  async RegisterHere() {

    const data1 = this.form.value;

    const url = 'http://localhost :5600/signup';

    const result: any = await this.http.post(url, data1).toPromise();

    if (result.opr) {

      this.router.navigate(['login']);

    } else {

      //this.uiInvalidCredential = true;


    }

    //console.log(data);
  }





  LoginPage() {
    this.router.navigate(['login']);
  }
}
