import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HeaderComponent } from '../../Header/header/header.component';
import { FooterComponent } from '../../Footer/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { WebService } from '../../../Service/web.service';
import { ToastrNotificationService } from '../../../Common/toastr-notification.service';
import { LoaderService } from '../../../Service/loader.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,CommonModule,HeaderComponent,FooterComponent,ReactiveFormsModule ],
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

  usersCount = 0;
bookingCount = 0;
customerCount = 0;


  showAll = false; 

  cartItems: any[] = [];

  isViewAll: boolean = false;

  products:any[] = [];
  selectedCategoryID: number = 1;
  activeTab: number = 0;


  ngOnInit(): void {


    this.getalldata();

    this.getproduct(this.selectedCategoryID, 0);


    this.animateCounter('usersCount', 300);
  this.animateCounter('bookingCount', 300);
  this.animateCounter('customerCount', 300);
  }


  animateCounter(field: 'usersCount' | 'bookingCount' | 'customerCount', target: number) {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      this[field] = count;
      if (count >= target) {
        clearInterval(interval);
      }
    }, 10); // speed of count (lower is faster)
  }

  toggleViewAll() {
    this.isViewAll = !this.isViewAll;
  }
  constructor(private service:WebService,private toast:ToastrNotificationService,private loader:LoaderService,private route:Router){}

  AddInquiryForm = new FormGroup({
    inquiryName:new FormControl('',Validators.required),
    inquiryEmail:new FormControl('',Validators.required),
    subject : new FormControl('',Validators.required),
    message:new FormControl('',Validators.required)    
  })

  starsArray(rating: number) {
    return Array(5).fill(0); // Creates an array of 5 elements for stars
  }

  AddInquiry(){
    this.service.Addinquiry(this.AddInquiryForm.value).subscribe(
      (resp:any)=>{
       if(resp.status === true){
        this.toast.showSuccess(resp.message);
        this.ngOnInit();
       } else{
        this.toast.showError(resp.message);
       }
      }
    )
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
          if(this.cat.length === 0){
            this.activeTab = this.cat[0].categoryID;
            this.getproduct(this.activeTab,0);
          }
        }else{
          this.loader.hideLoader();
          this.toast.showError(resp.message)
        }
      }
    )
  }

  selectedCategory: any = null;
  
  onCategorySelect(category: any) {
    this.selectedCategory = category;
    this.products = []; 
    this.getproduct(category.categoryID, 1);
  }
  
  getproduct(categoryID: number, pageNumber: number) {
    this.service.getproductbycategory(categoryID, pageNumber).subscribe(
      (resp: any) => {
        if (resp.status === true && resp.data.products) {
          this.products = resp.data.products;
        }
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }
  
  
  navigate(categoryID: number, categoryName?: string) {
    console.log("Category ID:", categoryID);
    console.log("Category Name:", categoryName);
  
    if (!categoryName) {
      console.error("Category Name is undefined!");
    }
  
    this.route.navigate(['/ProductList', categoryID], { 
      queryParams: { name: categoryName || 'Unknown' } // Default to avoid undefined
    });
  }
  
  navigateToAllProducts() {
    this.route.navigate(['/ProductList']); 
  }

  navigates(userProductID: number) {
    this.route.navigate([`/ProductDetails/${userProductID}`]);
  }
  navigatess(userProductID: number) {
    this.route.navigate([`/ProductDetails/${userProductID}`]);
  }

  redirectblog(blogID: number){
    this.route.navigate([`/BlogDetails/${blogID}`])
  }


 


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    dots: false,
    navSpeed: 100,
    nav: true,
    navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
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
  }


  customOptions1: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    dots: false,
    navSpeed: 700,
    nav: true,
    navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
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
  }


  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
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


  customOptions3: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  customOptions4: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
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
        items: 4.5
      }
    },
    nav: true
  }

}
