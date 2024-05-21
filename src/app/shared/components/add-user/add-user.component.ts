import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Validation from '../../models/Validation';
import { UserServiceService } from '../../../core/services/user-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{
  userForm!:FormGroup;
  Roles = ['admin', 'operateur'];
  constructor(private fb:FormBuilder, private userservice:UserServiceService, private route:Router){}
isConnected!:boolean;
isInvalid!:boolean;

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
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
              this.route.navigate(['/admin',"dashboard"])
              // this.router.navigate(['login']);
            }
            else if(data['status'] = 500){
              alert("Utilisateur existant déjà!!");
              this.isInvalid = false;

            }
          },
          error : (error)=> {
            this.isConnected = false;
            console.log("C'est quoi l'erreur", error);
            this.isInvalid = false;

          }
        }
      )
    }
    else {
      window.alert("Veuillez remplir le formulaire convenbalement");

      this.isInvalid = false;

    }

    }
  logout(){
    this.userservice.logout();
  }

}
