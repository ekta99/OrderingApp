import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login/login.service';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent {
  updateForm!: FormGroup;
  pass!: string;
  username!:string
  interval!: NodeJS.Timer;
  timeLeft: number=5;
  errorMessage!: any;
  successMessage!: string;
  @ViewChild('loginEl')
  loginVal!: ElementRef;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,private renderer: Renderer2,
    private customValidatorService: CustomValidatorsService,
    private productService:ProductService
  ) {}
  ngAfterViewInit() {
    this.loginVal = this.loginService.loginElement;  
    this.renderer.setProperty(this.loginVal.nativeElement, 'innerText', 'Logout');
   }

  ngOnInit(): void {
    this.pass = this.loginService.password;
    this.username=this.loginService.username;
    this.updateForm = this.fb.group(
      {
        currentPassword: [
          '',
          [Validators.required, Validators.pattern(this.pass?.toString())],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            this.customValidatorService.PasswordStrengthValidator,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [
          this.customValidatorService.matchValidator,
          this.misMatchValidator('currentPassword', 'password'),
        ],
      }
    );
  }
 
  onSubmit(){
    this.productService.updatePassword(this.username,this.updateForm.value.password).subscribe({
      next: (obj:any) =>{
        this.successMessage = obj.message;
        this.errorMessage = " ";
        // console.log(obj)
        this.startTimer();
      },
      error: _ =>{
        this.errorMessage = _.error.message;
        this.successMessage= " ";
      }
    })
  }

  startTimer() {

    this.interval = setInterval(() => {

      if(this.timeLeft > 0) {

        this.timeLeft--;

      } else {

        this.stopInterval();

      }

    },1000);

  }



  stopInterval(){

    clearInterval(this.interval);

    this.timeLeft = 5;

    this.loginService.isLoggedIn = false;

    this.loginService.username = '';
    this.loginService.password = ''

    this.router.navigate(['login']);

  }

  misMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mismatch']) {
        return;
      }

      if ( control.value && matchingControl.value &&  control.value === matchingControl.value) {
        matchingControl.setErrors({ matchedValidator: true });
      } else {
        // matchingControl.setErrors(null);
      }
    };
  }
}
