import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { FeedbackServiceService } from '../../../../core/services/feedback-service.service';
import { User } from '../../../../shared/models/User';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { Feedback } from '../../../../shared/models/Feedback';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { CustomDatePipePipe } from '../../../../shared/pipes/custom-date-pipe.pipe';

@Component({
  selector: 'app-cl-profile',
  standalone: true,
  imports: [RouterLink, FooterComponent, CustomDatePipePipe],
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
   confirmDel:boolean =false;
   userEmail!:any;
  ngOnInit(){
    // this.getAllFeedbacks()
    this.userId= localStorage.getItem('id');
    this.getAllUserFeedback();


  }
  logout(){
    this.userservice.logout();

  }
  goBack() {
    setTimeout(function(){
   }, 500);
      this.location.back();
  }
  getAllUserFeedback(){
    this.getUser(this.userId)
    this.feebackservice.getFeedBackByUserMail(this.userEmail).subscribe({
     next:(inf)=>{
      // console.log(this.userEmail)
      // console.log(inf['data'])
      var res =inf['data'].filter((el:any)=>{
       return el.email == this.userEmail
      })
      this.feeds = res;
        if(this.feeds.length>0){
          this.userfeeds = Object.keys(this.feeds).length;
        }
        else{
          this.userfeeds = 0;
        }
        console.log("Numéro des avis pour cet client", this.userfeeds)
      // console.log(res)
      // this.feeds = Object.assign(inf['data'])
      // console.log(inf.data)
      // if(this.feeds.length>0){
      //   this.userfeeds = Object.keys(this.feeds).length;
      // }
      // else{
      //   this.userfeeds = 0;
      // }
      // console.log("Numéro des avis pour cet client", this.userfeeds)

     }
     ,
      error : (error)=>{
        console.log(error)
      }
    })

  }
  getUser(id:any):string{
    this.userservice.getUserById(this.userId).subscribe({
      next:(infod)=>{
        this.userName=infod.user.nom + " "+ infod.user.prenom;
        this.userEmail = infod.user.email;
        // console.log("getUser",this.userEmail)
      }
    })
    return this.userEmail
  }
  deleteAvis(id:any){
    // if(window.confirm("Êtes-vous sûr de vouloir supprimer cet avis?")){

    //   this.feebackservice.deleteFeedback(id).subscribe(
    //     {
    //       next: (infos)=>{
    //         this.getAllUserFeedback();
    //         alert(infos.message)
    //       },
    //       error : (error)=>{
    //         console.log(error);
    //         alert("Nous n'avons pas parvenue à supprimer votre avis!!")
    //       }
    //     }
    //    )
    // }

  }


}
