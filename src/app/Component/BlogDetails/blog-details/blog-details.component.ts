import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Header/header/header.component';
import { FooterComponent } from '../../Footer/footer/footer.component';
import { WebService } from '../../../Service/web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  imports: [HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {


  blogdeatils:any;
  blogID!:number



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.blogID = Number(params.get('blogID'));
      if (this.blogID) {
        this.getallworkbyid(this.blogID);
      }
    });
  }

  constructor(private service:WebService,private route: ActivatedRoute,
        private router: Router){}

  getallworkbyid(blogID:number){
    this.service.getblogbyid(blogID).subscribe(
      (resp:any)=>{
        this.blogdeatils = resp.data
      }
    )
  }

}
