import { ChangeDetectionStrategy } from '@angular/compiler';
import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/login/login/login.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  @ViewChild('loginEl')
  loginVal!: ElementRef;
  orderDetails!:any;
username!:any;
  errorMessage!: any;

  ngAfterViewInit() {
    this.loginVal = this.loginService.loginElement;  
    this.renderer.setProperty(this.loginVal.nativeElement, 'innerText', 'Logout');
   }
   constructor(private loginService:LoginService,private renderer:Renderer2,private cartService:CartService
  ){}



  ngOnInit(){
    this.username= this.loginService.username;
    this.cartService.getOrderDetails(this.username).subscribe({
      next: (obj:any)=>{
        // console.log(obj);
        this.orderDetails=obj;
        this.errorMessage = "";
      },
      error:_=>{
        this.errorMessage= _.error.message;
        this.orderDetails=[];

      }
    })
    
  }


}
