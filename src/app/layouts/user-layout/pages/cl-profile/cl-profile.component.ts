import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { FeedbackServiceService } from '../../../../core/services/feedback-service.service';
import { User } from '../../../../shared/models/User';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { Feedback } from '../../../../shared/models/Feedback';

@Component({
  selector: 'app-cl-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cl-profile.component.html',
  styleUrl: './cl-profile.component.css'
})
export class ClProfileComponent implements OnInit{
   constructor( private location:Location,
    private router:Router,
    private feebackservice: FeedbackServiceService,
    private activated:ActivatedRoute, private userservice:UserServiceService   ) {

   }
   userId!:any;
   userName!:any;
   feeds:Feedback []= [];
   userfeeds:number =0;
  ngOnInit(){
    // this.getAllFeedbacks()
    this.userId= localStorage.getItem('id');
    this.getAllUserFeedback();
    // this.userservice.getUserById(this.userId).subscribe({
    //   next: (data)=>{
    //      this.userName = data.user.nom + " "+ data.user.prenom;
    //   }
    // })
    // this.feebackservice.getFeedbackByUserId(this.userId).subscribe({
    //   next : (donnes)=> {
    //   this.feeds = Object.assign(donnes['data'])
    //   },
    //   error : (error)=>{
    //     console.log(error)
    //   }
    // })

  }
  logout(){
    this.userservice.logout();

  }
  goBack() {
    setTimeout(function(){
      //code goes here
   }, 500);
      this.location.back();
  }
  getAllUserFeedback(){
    this.userservice.getUserById(this.userId).subscribe({
      next: (data)=>{
         this.userName = data.user.nom + " "+ data.user.prenom;
      }
    })
    this.feebackservice.getFeedbackByUserId(this.userId).subscribe({
      next : (donnes)=> {
      // console.log(typeof(donnes.data));
      this.feeds = Object.assign(donnes['data'])
      this.userfeeds = Object.keys(this.feeds).length;
      console.log("Numéro des avis", this.userfeeds)
      },
      error : (error)=>{
        console.log(error)
      }
    })
  }
  deleteAvis(id:any){
   this.feebackservice.deleteFeedback(id).subscribe(
    {
      next: ()=>{
        this.getAllUserFeedback();
      },
      error : ()=>{
      }
    }
   )
  }

  // getAllFeedbacks() {
  //   this.feebackservice.getFeedBacks().subscribe({
  //     next: (donnes)=> {
  //      console.log("Les Avis ",donnes["data"])
  //     },
  //     error : (e)=> {
  //       console.log("I can't find the data message to display users "+e);
  //     }
  //   })
  // }
}
