import { Component } from '@angular/core';
import { HeaderComponent } from '../../Header/header/header.component';
import { FooterComponent } from '../../Footer/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [HeaderComponent,FooterComponent,NgxPaginationModule,FormsModule,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {


  products = Array.from({ length: 30 }, (_, i) => ({
    name: `Fox & Fern ${i + 1}`,
    description: 'Lorem ipsum dolor sit.',
    image: '../../../../assets/image/Product/productlist.png'
  }));


  currentPage = 1;
  itemsPerPage = 12;

}
