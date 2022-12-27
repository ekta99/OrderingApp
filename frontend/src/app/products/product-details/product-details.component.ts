import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login/login/login.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  productDetails!:any;
  errorMessage !:String;
  descriptionList!:String[];
  productName!:String;
  showMore!:boolean;
  successMessage!:String;
  interval!: NodeJS.Timer;
  timeLeft: number=1;

@ViewChild('select') selectedQuantity!:ElementRef;
 username!:any;
 @ViewChild('loginEl')
 loginVal!: ElementRef;


  constructor(private router:Router,private productService:ProductService,
    private loginService:LoginService,private renderer:Renderer2,
    private cartService:CartService,private route:ActivatedRoute){}

    ngAfterViewInit() {
      // console.log("after view init from product details")
      // this.loginVal = this.loginService.loginElement;  
      // this.renderer.setProperty(this.loginVal.nativeElement, 'innerText', 'Logout');
     }
  ngOnInit(){
    this.loginVal = this.loginService.loginElement;  
    this.renderer.setProperty(this.loginVal.nativeElement, 'innerText', 'Logout');
    this.productName = this.route.snapshot.paramMap.get('productName')!;
    this.username = this.loginService.username;
    this.productService.getProductByName(this.productName).subscribe({
      next:( obj:any)=>{
        this.productDetails=obj[0];
        this.descriptionList = obj[0].description.split(';'); 
        // console.log(obj[0]);
        // console.log(this.descriptionList)
        this.errorMessage = "";
      },
      error: _=>{
        this.errorMessage = _.error.message;
        this.productDetails=null;
        this.descriptionList=[];
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
    this.timeLeft = 1;
    this.successMessage=''
  }

  addToCart(productName:string){
    this.cartService.addToCart({productName,quantity:this.selectedQuantity?.nativeElement?.value},this.username).subscribe({
      next: (obj:any)=>{
        // window.alert(obj.message);
        this.successMessage = obj.message;
        this.startTimer()
      },
      error: _=>{
        this.successMessage='';
        window.alert(_.error.message)
        
      }
    })
  }
}
