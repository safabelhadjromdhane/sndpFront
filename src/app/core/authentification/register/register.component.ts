import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Validation from './../../../shared/models/Validation';
import { ClosingDirectiveDirective } from '../../../shared/directives/closing-directive.directive';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ClosingDirectiveDirective
  ],
 templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  userForm!:FormGroup;
  Roles:string[] = ["admin","operateur", "client"];
  isConnected!:boolean;
  isInvalid!:boolean;

  ngOnInit(){
   this.userForm = this.fb.group({
    id : ['', [Validators.required,Validators.minLength(8), Validators.maxLength(12)]],
      nom : ['', [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+ [A-Z][a-z]+|[A-Z][a-z]+)$')]],
      prenom: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+ [A-Z][a-z]+|[A-Z][a-z]+)$')]],
      email : ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      telephone : ['', [Validators.required, Validators.maxLength(8)]],
      password : ['',[Validators.required, Validators.minLength(6), Validators.maxLength(45)]],
      confirmPassword: ['',Validators.required],
      role : [''],
   },
   {validators: [Validation.match("password", "confirmPassword")]}
  )

  }
  constructor(private router:Router,
    private userservice:UserServiceService,
    private fb:FormBuilder,

    ) {

  }


  onSignUp() {
  //  console.log("This is the value of the form ",this.userForm.value);
  if(this.userForm.value!= null){
    this.userservice.signup(this.userForm.value).subscribe(
      {
        next :(data) => {

          if(data["status"] = 200){
            this.isConnected = true;
            this.isInvalid = true;
            // console.log("This is the sign up informations",data);
            window.alert("Votre compte a été créer avec Succès!!!");
            this.router.navigate(['login']);
          }
          else if(data['status'] = 500){
            alert("Utilisateur existant déjà!!");
            this.isInvalid = false;

          }
        },
        error : (error)=> {
          this.isConnected = false;
          this.isInvalid = false;

          console.log("C'est quoi l'erreur", error);
        }
      }
    )
  }
  else {
    window.alert("Veuillez remplir le formulaire convenbalement");
    this.isInvalid = false;
  }

  }
  closeAlert() {
  //  this.
  }

}
