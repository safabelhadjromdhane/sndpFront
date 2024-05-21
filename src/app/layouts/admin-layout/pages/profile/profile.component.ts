import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Validation from '../../../../shared/models/Validation';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private route:Router, private usersrv:UserServiceService,
    private fb:FormBuilder, private active:ActivatedRoute
  ) { }
  userId!: any;
  updateForm!:FormGroup;
  ngOnInit(): void {
    let userCurrentId!:any;
    this.userId = this.active.params.subscribe(params => {
      console.log(params) //log the entire params object

      console.log(params['id']) //log the value of id
      userCurrentId=params['id'];
    });
    userCurrentId = localStorage.getItem('id');
    this.usersrv.getUserById(userCurrentId).subscribe(
      {
        next : (data)=> {
          console.log("This is the searched User",data["user"])
          this.updateForm = this.fb.group({
            nom : [data['user']['nom'], [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+)$')]],
            prenom: [data['user']['prenom'], [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+)$')]],
            email : [data['user']['email'], [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            telephone : [data['user']['telephone'], [Validators.required, Validators.maxLength(8)]],
            password : ["",[Validators.required, Validators.minLength(6), Validators.maxLength(45)]],
            confirmPassword: ["",Validators.required],
          },
          {validators: [Validation.match("password", "confirmPassword")]}
        )
        },
        error : (e)=> {
          alert("On ne parviens pas à recuperer les informations!!!")
        }
      }
     )
     this.userId = userCurrentId;
  }
  onUpdate(){
    this.usersrv.editUser(this.userId,this.updateForm.value).subscribe({
      next : ()=>{
        alert("Admin modifié avec succès");
        this.route.navigate(['/admin'])
      }
    })
  }
  logout(){
    this.usersrv.logout();
  }
  onAbort(){
    this.route.navigate(['/admin']);
  }

}
