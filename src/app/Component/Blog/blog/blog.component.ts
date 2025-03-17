import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Header/header/header.component';
import { FooterComponent } from '../../Footer/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { WebService } from '../../../Service/web.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [HeaderComponent,FooterComponent,NgxPaginationModule,CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  blog: any[] = [];
  itemsPerPage: number = 12;  // Set how many items per page
  currentPage: number = 0;
  categoryID!: number;

  ngOnInit(): void {
    this.getallblog(this.currentPage);
  }

  constructor(private service:WebService,private route: ActivatedRoute,
        private router: Router,){}


        getallblog(pageNumber: number){
          this.service.getallblog( pageNumber).subscribe(
            (resp:any)=>{
              this.blog = resp.data;
              console.log(resp.data);
              
            }
          )
        }

        onPageChange(event: number) {
          this.currentPage = event;
          this.getallblog(this.currentPage);
        }



}
