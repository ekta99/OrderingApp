import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent  {
  signupForm!:FormGroup;
  successMessage!:Object;
  errorMessage!:String;
  duplicateEmail!:String;
  
    constructor(private loginService:LoginService, private fb:FormBuilder,private router:Router,private customValidatorService:CustomValidatorsService){}
  
    ngOnInit(): void {
      this.signupForm = this.fb.group({
        username:['',[Validators.required,this.customValidatorService.validateEmail]],
        name:['',[Validators.required,Validators.pattern('^([a-zA-Z\s])+$')]],
        password:['',[Validators.required,Validators.minLength(6),this.customValidatorService.PasswordStrengthValidator]],
        confirmPassword:['',[Validators.required]]
      },
      {
        validators: this.customValidatorService.matchValidator
      })
    }
  
    onSubmit(){
      this.loginService.signup(this.signupForm.value).subscribe({
        next: (obj:any )=>{
          // console.log(obj);
          this.successMessage = obj.message;
          this.errorMessage = "";
          this.loginService.username = this.signupForm.value.username;
          this.loginService.password = this.signupForm.value.password;
          this.router.navigate(['/product']);
        },
        error: _ =>{
          this.successMessage = "";
          this.loginService.username = '';
          this.loginService.password = ""
          if(_.status === 400){
            this.duplicateEmail=_.error.message;
            this.errorMessage = "notFound";
          }else{
            this.duplicateEmail="";
            this.errorMessage = _.error.message;
           
          }
          
          // console.log(_)
          
        }
      })
      
    }
    ngDoCheck(){
      // console.log(this.signupForm.controls['username'].errors)
      // console.log(this.signupForm.controls['name'].errors)
    }
  }
  