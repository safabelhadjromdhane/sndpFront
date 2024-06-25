import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Validation from './../../../shared/models/Validation';
import { ClosingDirectiveDirective } from '../../../shared/directives/closing-directive.directive';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ClosingDirectiveDirective
  ],
 templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  userForm:FormGroup = this.fb.group({
    id : ['', [Validators.required,Validators.minLength(8), Validators.maxLength(12)]],
      nom : ['', [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+ [A-Z][a-z]+|[A-Z][a-z]+)$')]],
      prenom: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+ [A-Z][a-z]+|[A-Z][a-z]+)$')]],
      email : ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      telephone : ['', [Validators.required, Validators.maxLength(8)]],
      password : ['',[Validators.required, Validators.minLength(6), Validators.maxLength(45)]],
      confirmPassword: ['',Validators.required],
      role : ['', Validators.required],
   });
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
      role : ['', Validators.required],
   },
   {validators: [Validation.match("password", "confirmPassword")]}
  )

  }
  constructor(private router:Router,
    private userservice:UserServiceService,
    private fb:FormBuilder) {

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
            Swal.fire({
              icon: "success",
              title: "Votre compte a été créer avec Succès",
              showConfirmButton: false,
              timer: 1500
            });
            // window.alert("Votre compte a été créer avec Succès!!!");
            this.router.navigate(['login']);
          }
          else if(data['status'] = 500){
            Swal.fire({
              icon: "warning",
              title: "Utilisateur existant déjà, veuillez re-introduire les données",
              showConfirmButton: false,
              timer: 1500
            });
            // alert("Utilisateur existant déjà!!");
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
    Swal.fire({
      icon: "warning",
      title: "Veuillez remplir le formulaire convenbalement",
      showConfirmButton: true,
      timer: 1500
    });
    // window.alert("Veuillez remplir le formulaire convenbalement");
    this.isInvalid = false;
  }

  }
  closeAlert() {
  //  this.
  }

}
