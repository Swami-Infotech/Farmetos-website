import { Component } from '@angular/core';
import { HeaderComponent } from '../../Header/header/header.component';
import { FooterComponent } from '../../Footer/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-our-work',
  imports: [HeaderComponent,FooterComponent,NgxPaginationModule,CommonModule,RouterLink],
  templateUrl: './our-work.component.html',
  styleUrl: './our-work.component.css'
})
export class OurWorkComponent {

  Works = Array.from({length: 20},(_, i) =>({
    title:`Fox & Fern 11 ${i + 1}`,
    subtitle:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, hic incidunt molestias est ipsa temporibus quos illo. Modi, fugiat earum suscipit reiciendis est velit ea doloribus.",
    image:"../../../../assets/image/work/work1.png"
  }))


  currentPage = 1;
  itemsPerPage = 6;

}
