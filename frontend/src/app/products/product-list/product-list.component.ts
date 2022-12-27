import { AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/login/login/login.service';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements DoCheck, AfterViewInit {

  productList!:any[];
  errorMessage!:String;
  searchText!:any;
  dealsOfTheDay:boolean=false;


  @ViewChild('loginEl')
    loginVal!: ElementRef;

  constructor(private loginService:LoginService,private productService:ProductService, private renderer: Renderer2){}

  ngOnInit(){
    this.productService.getAllProducts().subscribe({
      next: (obj:any)=>{
        this.productList = obj;
        console.log(obj);
        this.errorMessage='';
      },
      error: _ =>{
        this.errorMessage= _.error.message;
        this.productList=[];
      }
    })
  }
  ngDoCheck(){
    // console.log(this.dealsOfTheDay)
  }


  ngAfterViewInit() {
    this.loginVal = this.loginService.loginElement;  

    this.renderer.setProperty(this.loginVal.nativeElement, 'innerText', 'Logout');

}
}
