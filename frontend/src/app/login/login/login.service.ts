import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn!:boolean;
  loginElement!: ElementRef;
  username!:string;
  password!:string;

  constructor(private http:HttpClient) { }

  loginUser(data: any){
    return this.http.post('http://localhost:5000/login',data)
  }
  
  signup(data:any){
    return this.http.post('http://localhost:5000/signup',data)
  }
}
