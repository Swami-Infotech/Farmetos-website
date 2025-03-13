import { Component } from '@angular/core';
import { HeaderComponent } from '../../Header/header/header.component';
import { FooterComponent } from '../../Footer/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  imports: [HeaderComponent,FooterComponent,NgxPaginationModule,CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {


  blogs = Array.from({ length: 20 }, (_, i) => ({
    title: `New Roses From Star Roses & Plants ${i + 1}`,
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit...',
    image: '../../../../assets/image/testi/blog.png',
    date: `20 Jan`,
    comments: Math.floor(Math.random() * 20) + 1 // Random comments count
  }));

  currentPage = 1;
  itemsPerPage = 6;

}
