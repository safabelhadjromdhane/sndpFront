import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { HeaderComponent } from '../../../../core/header/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { FeedbackServiceService } from '../../../../core/services/feedback-service.service';
import { Feedback } from '../../../../shared/models/Feedback';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { CustomDatePipePipe } from '../../../../shared/pipes/custom-date-pipe.pipe';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterLink, CustomDatePipePipe],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css'
})
export class FeedbacksComponent implements OnInit {
  constructor(private route:Router ,
    private feedbackservice:FeedbackServiceService,
    private usersvr:UserServiceService

  ){

  }
  feeds:Feedback[] = [];
  deleCon!:boolean;
  avisNum!:number;
  ngOnInit(): void {
    this.getAll();
    this.totalAvis();
  }
  logout(){
    this.usersvr.logout()
  }

  getAll(){
    this.feedbackservice.getFeedBacks().subscribe(
      {
        next : (info)=> {
          console.log(info.data);
          this.feeds= Object.assign(info["data"]);
        },
        error: (error)=>{
          console.log("Error",error)
        }
      }
    )
  }
  updateAvis(id:any){

  }
  deleteAvis(id:any){
    console.log("the feedback to be deleted!!",id);
    this.feedbackservice.deleteFeedback(id).subscribe({
      next:(info)=>{
        alert(info.message);
        console.log('as been deleted successfully!',info.message);
        // window.location.reload();
        this.getAll();
      },
      error:(e)=>{
        alert('Feedback could not be deleted!!');

        console.log('Feedback could not be deleted!!',e)
      }
    })

  }
  // delConfirm(){
  //   const btnCon = document.getElementsByClassName('deleteConfirm');
  //   if(btnCon){
  //     this.deleCon = true;
  //   }
  // }
  totalAvis(){
    this.feedbackservice.totalFeedbacks().subscribe({
      next:(info)=>{
        this.avisNum = info.nbr;
      },
      error:(e)=>{
        console.log("Error",e)
      }
    })
  }

}
