import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HeaderComponent } from '../../Header/header/header.component';
import { FooterComponent } from '../../Footer/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { WebService } from '../../../Service/web.service';
import { ToastrNotificationService } from '../../../Common/toastr-notification.service';
import { LoaderService } from '../../../Service/loader.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,CommonModule,HeaderComponent,FooterComponent,RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  slider:any;
  testi:any;
  ser:any;
  client:any;
  blog:any;
  cat:any;

  cartItems: any[] = [];

  products:any[] = [];
  selectedCategoryID: number = 1;
  activeTab: number = 0;


  ngOnInit(): void {
    this.getalldata();

    this.getproduct(this.selectedCategoryID, 0);
  }

  constructor(private service:WebService,private toast:ToastrNotificationService,private loader:LoaderService,private route:Router){}



  starsArray(rating: number) {
    return Array(5).fill(0); // Creates an array of 5 elements for stars
  }

  getalldata(){
    this.loader.showLoader();
    this.service.getalldashboard().subscribe(
      (resp:any)=>{
        if(resp.status === true){
          this.loader.hideLoader();
          this.toast.showSuccess(resp.message)
          this.slider = resp.data.sliders;
          this.testi = resp.data.testimonials;
          this.ser = resp.data.services;
          this.client = resp.data.clients;
          this.blog = resp.data.blogs;
          this.cat = resp.data.categories;
          if(this.cat.length > 0){
            this.activeTab = this.cat[0].id;
            this.getproduct(this.activeTab,1);
          }
        }else{
          this.loader.hideLoader();
          this.toast.showError(resp.message)
        }
      }
    )
  }

  getproduct(CategoryID: number, pageNumber: number){
    this.service.getproductbycategory(CategoryID, pageNumber).subscribe(
      (resp:any)=>{
        this.products = resp.data;
        console.log(resp.data);
        
      }
    )
  }


  onCategoryChange(newCategoryID: number) {
    this.selectedCategoryID = newCategoryID;
    this.getproduct(this.selectedCategoryID, 0); // Fetch products for new category
  }

  setActiveTab(categoryID: number) {
    this.activeTab = categoryID; // Set active category
    this.getproduct(categoryID, 0); // Fetch products for selected category
  }

  navigate(categoryID: number) {
    this.route.navigate([`/ProductList/${categoryID}`]);
  }
  navigates(userProductID: number) {
    this.route.navigate([`/ProductDetails/${userProductID}`]);
  }


 


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="bi bi-arrow-left text-dark"></i>', '<i class="bi bi-arrow-right text-dark"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  customOptions1: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="bi bi-arrow-left text-dark"></i>', '<i class="bi bi-arrow-right text-dark"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

}
