import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { eachMonthOfInterval } from 'date-fns';
import { FeedbackServiceService } from '../../../../core/services/feedback-service.service';
import { UserServiceService } from '../../../../core/services/user-service.service';

@Component({
  selector: 'app-add-feedback',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './add-feedback.component.html',
  styleUrl: './add-feedback.component.css'
})
export class AddFeedbackComponent implements OnInit {
  feedForm!:FormGroup;
  constructor(private route:Router,
    private fb:FormBuilder,
    private feedservice:FeedbackServiceService,
    private usersrv:UserServiceService
  ){}
  ngOnInit(): void {
    this.feedForm = this.fb.group({
      email : ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      userId: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(12)] ],
      avis: ['', [Validators.required]],
    })
  }

  onSave(){
    console.log("this is from templae", this.feedForm.value)
   if(this.feedForm.value !=null){
    this.feedservice.addFeedBack(this.feedForm.value).subscribe(
      {next: (infos:any)=>{
        if(infos["status"]= 200){
          alert("Avis Créé avec succèss!!");
          setTimeout(()=>{
            this.route.navigate(['client','avis'])
          },500)
        }


      },
    }
    )
   }
  }
  logout(){
  this.usersrv.logout();
  }
}
