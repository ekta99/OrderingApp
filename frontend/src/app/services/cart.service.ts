import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  viewCart(username:string){
    return this.http.get(`http://localhost:5000/${username}/cart`)
  }
  updateCart(obj:any,username:string){
    console.log(obj)
    return this.http.post(`http://localhost:5000/${username}/updatecart`,obj)
  }
  addToCart(obj:any,username:string){
    return this.http.post(`http://localhost:5000/${username}/addtocart`,obj);
  }
   
  placeOrder(username:string){
    return this.http.post(`http://localhost:5000/${username}/orders`,{});
  }

  getOrderDetails(username:string){
    return this.http.get(`http://localhost:5000/${username}/vieworders`)
  }
}
