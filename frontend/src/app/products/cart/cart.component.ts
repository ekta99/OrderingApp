import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login/login.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  username!:any;
  password!:string | null;
  errorMessage!:string;
  cart!:any;
  @ViewChild('qty') qty!:ElementRef;
  @ViewChild('loginEl')
  loginVal!: ElementRef;
  ngAfterViewInit() {
    this.loginVal = this.loginService.loginElement;  
    this.renderer.setProperty(this.loginVal.nativeElement, 'innerText', 'Logout');
   }
  
constructor(private cartService:CartService,private loginService :LoginService,
  private renderer:Renderer2,private router:Router){}

ngOnInit(){
  this.username=this.loginService.username;
  this.password= this.loginService.password;
  this.callCart();
 
}
callCart(){
  this.cartService.viewCart(this.username).subscribe({
    next:(obj:any)=>{
      this.cart = obj[0];
      this.errorMessage='';
    },
    error: _=>{
      this.errorMessage = _.error.message;
      this.cart=null
    }
  })
}
ngDoCheck(){
  // // console.log(this.cart)
  // console.log(this.qty);
  // console.log(this.qty?.nativeElement.value)
}
updateQuantity(ev:any,productName:string){
  console.log(ev,'product name Is ', productName);
  console.log(ev.target.value)
  this.cartService.updateCart({productName,quantity:ev.target.value},this.username).subscribe({
    next: (obj:any)=>{
        this.callCart();
    }
  })
}
removeFromCart(quantity:number,productName:string){
  this.cartService.updateCart({productName,quantity},this.username).subscribe({
    next: (obj:any)=>{
        this.callCart();
    }
  })
}
placeOrder(cart:any){
  // console.log('inside place order')
  this.cartService.placeOrder(cart.username).subscribe({
    next: (obj:any)=>{
      // console.log(obj);
      this.router.navigate(['../product/myorders']);
    },
    error:_=>{
      console.log(_.error.errorMessage)
    }
  })
}
}
