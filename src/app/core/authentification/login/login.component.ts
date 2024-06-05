import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Validation from '../../../shared/models/Validation';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/user-service.service';
@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule, ReactiveFormsModule, CommonModule,RouterLink]
})
export class LoginComponent implements OnInit {

  signinForm!:FormGroup;
  isLogged:boolean = true;
  role!:string;
  alertContent!:string;
  // timeOfConnexionforOp!: Date;


  constructor(private router:Router,
    private userService:UserServiceService,
    private fb:FormBuilder
    ){
  }
    ngOnInit(){
    this.signinForm =this.fb.group({
      id : ['', Validators.required, Validators.maxLength(12)],
      password : ['',Validators.required],
    })
    console.log(this.isLogged)

  }

  onSignIn() {
    console.log("This is the value of the form ",this.signinForm.value);
    this.userService.login(this.signinForm.value).subscribe(
      {
        next: (data)=> {
          localStorage.setItem('isUserLoggedIn', data.token);
          localStorage.setItem('id', data.user.id);

        if(data.user.role == 'admin'){
           this.role= "admin";
           this.isLogged == true;

           this.router.navigate(['admin']);

        }
        else if(data.user.role == 'operateur'){
          this.role= "operateur";
          this.isLogged == true;

           this.router.navigate(['operateur']);
        }
        else if(data.user.role == 'client'){
          this.role= "client";
          this.isLogged == true;
           this.router.navigate(['client']);

        }        },
        error : (error) => {
          console.log("Erreur lors d'authentification: " + error);
          window.alert("Vous devez vérifier vos données saisies!!!");
          this.alertContent ="Vous devez vérifier vos données saisies!!!"

          this.isLogged == false;

        }
      }
    )
  }
  // exit(role:string) {
  //   console.log('I clicked the close button',role)
  //   this.isLogged == false;
  //  switch(role){
  //   case "admin":
  //     this.router.navigate(['admin']);
  //     break;
  //     case "operateur":
  //     this.router.navigate(['operateur']);
  //     break;
  //     case "client":
  //     this.router.navigate(['client']);
  //     break;
  //  }

  // }

  // closeBtn(){
  //   console.log("close the button with tailwindcss plz!!!")
  // }

}
