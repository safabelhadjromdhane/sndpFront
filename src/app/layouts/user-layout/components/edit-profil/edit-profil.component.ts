import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../../../core/services/user-service.service';
import Validation from '../../../../shared/models/Validation';

@Component({
  selector: 'app-edit-profil',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './edit-profil.component.html',
  styleUrl: './edit-profil.component.css'
})
export class EditProfilComponent implements OnInit {
  userId!: any;
  updateForm!:FormGroup;
  constructor(private route:Router, private active: ActivatedRoute,
    private userservice:UserServiceService,
    private fb:FormBuilder){

  }
  ngOnInit(): void {
    let userCurrentId!:any;
    this.userId = this.active.params.subscribe(params => {
      console.log(params) //log the entire params object

      console.log(params['id']) //log the value of id
      userCurrentId=params['id'];
    });
    userCurrentId = localStorage.getItem('id');
    this.userservice.getUserById(userCurrentId).subscribe(
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
    this.userservice.editUser(this.userId,this.updateForm.value).subscribe({
      next : ()=>{
        alert("Utilisateur modifié avec succès");
        this.route.navigate(['client'])
      }
    })
  }
  onAbort(){
    this.route.navigate(['/client']);
  }
  logout(){
    this.userservice.logout();
  }
}
