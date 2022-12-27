import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, DoCheck {
loginForm!:FormGroup;
successMessage!:Object;
errorMessage!:String;
isLoggedIn!:boolean

  constructor(private loginService:LoginService, private fb:FormBuilder,private router:Router,private customValidatorService:CustomValidatorsService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['',[Validators.required,this.customValidatorService.validateEmail]],
      password:['',[Validators.required]]
    })
  }

  onSubmit(){
    console.log(this.loginForm.value)
    this.loginService.loginUser(this.loginForm.value).subscribe({
      next: (obj:any )=>{
        // console.log(obj);
        this.successMessage = obj.message;
        this.errorMessage = "";
        this.isLoggedIn=true;
        this.loginService.isLoggedIn=true;
        this.loginService.username = this.loginForm.value.username;
        this.loginService.password = this.loginForm.value.password;
        localStorage.setItem('username',this.loginForm.value.username);
        localStorage.setItem('password',this.loginForm.value.password);
        this.router.navigate(['/product']);
      },
      error: _ =>{
        this.successMessage = "";
        this.isLoggedIn=false;
        this.loginService.isLoggedIn=false;
        this.loginService.username = "";
        this.loginService.password = ""
        this.errorMessage = _.error.message;
        localStorage.clear()
      }
    })
    
  }
  ngDoCheck(){
  }
}
