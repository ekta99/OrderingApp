import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProducts(){
    return this.http.get(`http://localhost:5000/products`);
  }
  getProductByName(productName:any){
   return this.http.get( `http://localhost:5000/searchproduct/${productName}`);
  }
  updatePassword(user:string, password :string){
    return this.http.post(`http://localhost:5000/${user}/update`,{password:password});
  }
}
