import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Header/header/header.component';
import { FooterComponent } from '../../Footer/footer/footer.component';
import { WebService } from '../../../Service/web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-details',
  imports: [HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './work-details.component.html',
  styleUrl: './work-details.component.css'
})
export class WorkDetailsComponent implements OnInit {
  workdeatils:any
  
  workID!:number
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.workID = Number(params.get('workID'));
      if (this.workID) {
        this.getallworkbyid(this.workID);
      }
    });
  }

  constructor(private service:WebService,private route: ActivatedRoute,
      private router: Router,){

  }


  getallworkbyid(workID:number){
    this.service.getworkdetails(workID).subscribe(
      (resp:any)=>{
        this.workdeatils = resp.data
      }
    )
  }

}
