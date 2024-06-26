import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Validation from '../../models/Validation';
import { UserServiceService } from '../../../core/services/user-service.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

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
  constructor(private fb:FormBuilder,
    private userservice:UserServiceService, private route:Router){}
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
    if(this.userForm.value!= null){
      // console.log(this.userForm.value)
      this.userservice.signup(this.userForm.value).subscribe(
        {
          next :(data) => {
            console.log(data)
            // if(data['status'] ==200){
            //   this.isConnected = true;
            //   this.isInvalid = true;

            //   Swal.fire({
            //     icon: "success",
            //     title: "Compte Operateur dcréer avec succés!!",
            //     text: "L'agent peux se connecter à son compte",
            //     timer:1500
            //   })
            //   this.route.navigate(['/admin',"dashboard"])
            // }
            this.isConnected = true;
            this.isInvalid = true;

            Swal.fire({
              icon: "success",
              title: "Compte Operateur est créer avec succés!!",
              text: "L'agent peux se connecter à son compte",
              timer:1500
            })
            this.route.navigate(['/admin',"dashboard"])
            // else if (data['status']==500){
            //   Swal.fire({
            //     icon: "warning",
            //     title: "Utilisateur existant déjà, veuillez re-introduire les données",
            //     showConfirmButton: false,
            //     timer: 1500
            //   });
            //   // alert("Utilisateur existant déjà!!");
            //   this.isInvalid = false;
            //   this.isConnected = false;

            // }


          },
          error : (error)=> {
            // this.isConnected = false;
            // console.log("Une erreur est survenue",error)
            Swal.fire({
              icon: "warning",
              title: "Une erreur est surveue lors de la création du compte!!",
              text:"Veuillez vérifier vos informations saisies",
              showConfirmButton: true,

              timer:1500
            })
            this.isInvalid = false;

          }
        }
      )
    }


    }
  logout(){
    this.userservice.logout();
  }

}
