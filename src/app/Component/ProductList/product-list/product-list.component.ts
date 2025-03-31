import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Header/header/header.component';
import { FooterComponent } from '../../Footer/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebService } from '../../../Service/web.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [HeaderComponent,FooterComponent,NgxPaginationModule,FormsModule,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  itemsPerPage: number = 12;  
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;
  categoryID!: number;
  categoryName: string = '';

  ngOnInit(): void {
    this.currentPage = 1;

    this.route.queryParams.subscribe(params => {
      this.categoryName = params['name']; 
    });
    this.route.paramMap.subscribe(params => {
      this.categoryID = Number(params.get('categoryID'));
      if (this.categoryID) {
        this.getproduct(this.categoryID, this.currentPage);
      }
    });
  }

  constructor(private service:WebService,private route: ActivatedRoute,
    private router: Router,){}


    getproduct(CategoryID: number, pageNumber: number) {
      this.service.getproductbycategory(CategoryID, pageNumber).subscribe(
        (resp: any) => {
          if (resp.status) {
            this.products = resp.data.products;
            this.totalItems = resp.data.totalCount;
            this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          }
        },
        (error) => {
          console.error("Error fetching products:", error);
        }
      );
    }

    getPages(): number[] {
      return Array(this.totalPages).fill(0).map((_, i) => i + 1);
    }
    
    goToPage(page: number) {
      if (page !== this.currentPage) {
        this.currentPage = page;
        this.getproduct(this.categoryID, this.currentPage);
        this.scrollToTop();
      }
    }



  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getproduct(this.categoryID, this.currentPage);
      this.scrollToTop();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getproduct(this.categoryID, this.currentPage);
      this.scrollToTop();
    }
  }

  scrollToTop() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }

  navigate(userProductID: number) {
    this.router.navigate([`/ProductDetails/${userProductID}`]);
  }



}
