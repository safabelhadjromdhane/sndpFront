import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { HeaderComponent } from '../../../../core/header/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { FeedbackServiceService } from '../../../../core/services/feedback-service.service';
import { Feedback } from '../../../../shared/models/Feedback';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { CustomDatePipePipe } from '../../../../shared/pipes/custom-date-pipe.pipe';
import Swal from 'sweetalert2';

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
    if(id!=null){
      Swal.fire({
        title: "Êtes-vous sûr de vouloir supprimer cet avis ?",
        icon: "warning",
        text: "Vous ne pouvez plus le récuper !",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
        reverseButtons: true
      }).then((result)=>{
        if(result.isConfirmed){
          this.feedbackservice.deleteFeedback(id).subscribe({
            next:(info)=>{
              // alert(info.message);
              Swal.fire({
                title: "Avis supprimé avec succès",
                icon: "success",
                // text: "Vous ne pouvez plus la récuperer!",
                showConfirmButton: false,
                timer:1500
                // confirmButtonText: "Oui",
                // cancelButtonText: "Non",
                // reverseButtons: true
              })
              // window.location.reload();
              this.getAll();
            },
        })
      }
      })
    }
    // console.log("the feedback to be deleted!!",id);
    // this.feedbackservice.deleteFeedback(id).subscribe({
    //   next:(info)=>{
    //     // alert(info.message);
    //     Swal.fire({
    //       title: "Avis supprimé avec succès",
    //       icon: "success",
    //       // text: "Vous ne pouvez plus la récuperer!",
    //       showConfirmButton: false,
    //       timer:1500
    //       // confirmButtonText: "Oui",
    //       // cancelButtonText: "Non",
    //       // reverseButtons: true
    //     })
    //     // window.location.reload();
        // this.getAll();

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
