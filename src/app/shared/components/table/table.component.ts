import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserServiceService } from '../../../core/services/user-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormGroup, ReactiveFormsModule , FormsModule, FormBuilder, Validators} from '@angular/forms';
import Validation from '../../models/Validation';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  rows:User[] = [];
  deleConfirmation:boolean =false;
  idUser!:string;
  updateForm!:FormGroup;
  ngOnInit(){
   this.getAll();
   this.updateForm = this.fb.group({
    id : ['', [Validators.required,Validators.minLength(8), Validators.maxLength(12)]],
      nom : ['', [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+ [A-Z][a-z]+|[A-Z][a-z]+)$')]],
      prenom: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+ [A-Z][a-z]+|[A-Z][a-z]+)$')]],
      email : ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      telephone : ['', [Validators.required, Validators.maxLength(8)]],
      password : ['',[Validators.required, Validators.minLength(6), Validators.maxLength(45)]],
      confirmPassword: ['',Validators.required],
      role : ['', Validators.required],
   },
   {validators: [Validation.match("password", "confirmPassword")]
   })

  }
  constructor(private userservice: UserServiceService,
    private router:Router, private fb:FormBuilder) {

  }
  getAll() {
    this.userservice.getAllUsers()
    .subscribe(
      {
        next: (donnes)=>{
          // console.log("Data ",donnes['data'])
          this.rows = Object.assign(donnes['data'])
       },
       error: (e)=> {
        // console.log("I can't find the data message to display users "+e);
       }
      }
    )
  }
  deleteUser(idUser:any) {
    if(window.confirm("Êtes-vous sûr de vouloir supprimer ce compte?")){
      console.log("This is the id of the user to be deleted", idUser)
      // this.idUser = id;
      this.userservice.deleteUser(idUser).subscribe(
        {
          next : (data)=>{
            alert(data.message);
            window.location.reload();
          },
          error : (err)=>{
            console.log('Error', err);
          }
        }
      )
    }
    // if(this.deleConfirmation = true){

    // }

  }
  updateUser(id:any){
    this.userservice.getUserById(id).subscribe({
      next: (data)=>{

        this.idUser = id;
        // console.log(data['user'])
      },
      error : ()=> {
        setTimeout(()=> {
          alert("Il ya un problème lors de la modification de cet utiliateur!!")
        }, 2000)
      }
    })
  }

  deleteConfirmed(){
    this.deleConfirmation = true;
    // this.deleteUser(this.idUser);
  }

  addUser() {
    this.router.navigate(['register']);

  }

}
