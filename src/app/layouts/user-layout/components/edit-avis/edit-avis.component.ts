import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FeedbackServiceService } from '../../../../core/services/feedback-service.service';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Validation from '../../../../shared/models/Validation';
import Swal from "sweetalert2"
@Component({
  selector: 'app-edit-avis',
  standalone: true,
  imports: [RouterLink, FooterComponent,ReactiveFormsModule, FormsModule
  ],
  templateUrl: './edit-avis.component.html',
  styleUrl: './edit-avis.component.css'
})
export class EditAvisComponent implements OnInit{
  constructor(private route: Router, private feedbacksrv:FeedbackServiceService,
    private usersrv:UserServiceService, private active:ActivatedRoute, private fb:FormBuilder
  ){}
  feedId!: any;
  updateForm:FormGroup = this.fb.group({
    email : ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    avis : ['',[Validators.required, Validators.minLength(6)]],
  });
  ngOnInit(): void {
    let feedCurrentId!:any;
    this.feedId = this.active.params.subscribe(params => {
      feedCurrentId=params['id'];
    });
    // console.log("ID Feedback", feedCurrentId)
    this.feedbacksrv.getFeedBackById(feedCurrentId).subscribe(
      {
        next : (info)=> {
          this.updateForm = this.fb.group({

            email : [info['feed']["email"], [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            avis : [info['feed']['avis'],[Validators.required, Validators.minLength(6)]],

          },
        )
        },
        error : (e)=> {
          Swal.fire({
            icon: "error",
            title: "On ne parviens pas à recuperer les informations",
            showConfirmButton: true,
            timer: 1500
          });
          // alert("On ne parviens pas à recuperer les informations!!!")
        }
      }
     )
     this.feedId = feedCurrentId;
  }

  onUpdate(){
    this.feedbacksrv.updateFeedback(this.feedId,this.updateForm.value).subscribe({
      next : ()=>{
        Swal.fire({
          icon: "success",
          title: "Avis Modifié avec succés!!",
          showConfirmButton: true,
          timer: 1500
        });
        this.route.navigate(['/client'])
      }
    })
  }
  logout(){
    this.usersrv.logout();
  }
  onAbort(){
    this.route.navigate(['/client', "avis"]);
  }
}
