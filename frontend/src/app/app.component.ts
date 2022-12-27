import {  AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'frontend';
  loginTitle = 'Login';
  @ViewChild('loginEl')
  loginVal!: ElementRef;
  username!:any;

constructor(private loginService:LoginService , private router:Router,
  private renderer: Renderer2,private cdr: ChangeDetectorRef){}

  ngAfterViewInit() {
    // console.log(this.username)
    this.username = this.loginService.username;     
    this.loginService.loginElement = this.loginVal;
      
}
ngAfterViewChecked(){
  this.loginTitle=this.loginVal.nativeElement.innerText;
    this.cdr.detectChanges();    
}

  login() {
    const value = this.loginVal.nativeElement.innerText;
    this.loginTitle='';
    if (value === 'Login') {
       this.router.navigate(['/login']);
    } else if (value === 'Logout') {
        this.loginTitle = 'Login';
        this.renderer.setProperty(this.loginVal.nativeElement, 'innerText', 'Login');
        this.router.navigate(['/login']);
    }
}
}
