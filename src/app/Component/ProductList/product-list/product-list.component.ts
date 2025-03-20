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
  itemsPerPage: number = 12;  // Set how many items per page
  currentPage: number = 0;
  categoryID!: number;
  categoryName: string = '';

  ngOnInit(): void {

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


  getproduct(CategoryID: number, pageNumber: number){
    this.service.getproductbycategory(CategoryID, pageNumber).subscribe(
      (resp:any)=>{
        this.products = resp.data;
        console.log(resp.data);
        
      }
    )
  }

  onPageChange(event: number) {
    this.currentPage = event;
    this.getproduct(this.categoryID, this.currentPage);
  }

  navigate(userProductID: number) {
    this.router.navigate([`/ProductDetails/${userProductID}`]);
  }




}
