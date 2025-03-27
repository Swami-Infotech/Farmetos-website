import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Header/header/header.component';
import { FooterComponent } from '../../Footer/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WebService } from '../../../Service/web.service';

@Component({
  selector: 'app-our-work',
  imports: [HeaderComponent,FooterComponent,NgxPaginationModule,CommonModule],
  templateUrl: './our-work.component.html',
  styleUrl: './our-work.component.css'
})
export class OurWorkComponent implements OnInit {

  work: any[] = [];
  itemsPerPage: number = 12;  // Set how many items per page
  currentPage: number = 0;
  categoryID!: number;

  ngOnInit(): void {
    this.getalldata(this.currentPage)
  }
  
  constructor(private service:WebService,private route: ActivatedRoute,
      private router: Router,){}






  getalldata( pageNumber: number){
    this.service.getallwork( pageNumber).subscribe(
      (resp:any)=>{
        this.work = resp.data;
        console.log(resp.data);
        
      }
    )
  }

  onPageChange(event: number) {
    this.currentPage = event;
    this.getalldata( this.currentPage);
  }


  navigate(workID: number) {
    this.router.navigate([`/WorkDetails/${workID}`]);
  }
}
