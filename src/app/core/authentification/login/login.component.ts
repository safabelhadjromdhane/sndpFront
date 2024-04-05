import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Validation from '../../../shared/models/Validation';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  signinForm!:FormGroup;
  isLogged!:boolean;
  role!:string;
  alert!:boolean;
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
  }

  onSignIn() {
    console.log("This is the value of the form ",this.signinForm.value);
    this.userService.login(this.signinForm.value).subscribe(
      {
        next: (data)=> {
          localStorage.setItem('isUserLoggedIn', data.token);

        if(data.user.role == 'admin'){
           this.role='admin';
           this.isLogged = true;
          //  setTimeout(()=>{
          //   1000
          //  })
           this.router.navigate(['admin']);

        }
        else if(data.user.role == 'operateur'){
          this.role='operateur';
          this.isLogged = true;
          // setTimeout(()=>{
          //   1000
          //  })
           this.router.navigate(['operateur']);
        }
        else if(data.user.role == 'client'){
          this.role='client';
          this.isLogged = true;
          // setTimeout(()=>{
          //   1000
          //  })
           this.router.navigate(['client']);

        }        },
        error : (error) => {
          console.log("Erreur lors d'authentification: " + error);
          this.isLogged = false;

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

}
