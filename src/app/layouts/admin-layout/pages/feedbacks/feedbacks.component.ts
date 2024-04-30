import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { HeaderComponent } from '../../../../core/header/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { FeedbackServiceService } from '../../../../core/services/feedback-service.service';
import { Feedback } from '../../../../shared/models/Feedback';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterLink],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css'
})
export class FeedbacksComponent implements OnInit {
  constructor(private route:Router ,
    private feedbackservice:FeedbackServiceService

  ){

  }
  feeds:Feedback[] = [];
  ngOnInit(): void {
    this.feedbackservice.getFeedBacks().subscribe(
      {
        next : (info)=> {
          console.log(info.data);
          this.feeds= Object.assign(info["data"]);
        },
        error: ()=>{

        }
      }
    )
  }

}
