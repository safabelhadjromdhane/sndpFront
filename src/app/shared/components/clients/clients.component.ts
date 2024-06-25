import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomDatePipePipe } from '../../pipes/custom-date-pipe.pipe';
import { UserServiceService } from '../../../core/services/user-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/User';
import Validation from '../../models/Validation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [RouterLink, CustomDatePipePipe],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements  OnInit {
  rows:User[] = [];
  operateurs:User[]=[];
  deleConfirmation:boolean =false;
  idUser!:string;
  updateForm!:FormGroup;
  infoUser!:any;
  constructor(private userservice:UserServiceService, private router:Router,
    private fb:FormBuilder) {

  }
  ngOnInit(): void {
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
  getAll() {
    this.userservice.getAllClients()
    .subscribe(
      {
        next: (donnes)=>{
          // console.log("Data ",donnes['data'])
          this.rows = Object.assign(donnes['data'])
          // this.rows.filter((el)=>{
          //   if(el.role == "operateur" || "admin"){
          //      this.operateurs = Object.assign(this.rows)
          //   }
          //   else{
          //     this.rows = Object.assign(this.rows);

          //   }
          // })
          // console.log("All the opertateurs", this.operateurs)
            this.operateurs = Object.assign(donnes['data'])

       },
       error: (e)=> {
        // console.log("I can't find the data message to display users "+e);
       }
      }
    )
  }
  deleteUser(idUser:any) {
    if(idUser!==null){
      Swal.fire({
        title: "Êtes-vous sûr de vouloir supprimer ce compte?",
        icon: "warning",
        text: "Vous ne pouvez plus le récuper!",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
        reverseButtons: true
      }).then((result)=>{
       if(result.isConfirmed){
        this.userservice.deleteUser(idUser).subscribe({
          next:(info)=>{
            console.log("User to be delete!!", info);
            this.getAll();
          }
         })
       }
      })
    }
    else{
      Swal.fire({
        // position: "top-end",
        icon: "error",
        title: "Une erreur lors de la connexion à la base de données!! ",
        showConfirmButton: false,
        timer: 1500
      });
    }
    // if(window.confirm("Êtes-vous sûr de vouloir supprimer ce compte?")){

    //   this.userservice.deleteUser(idUser).subscribe(
    //     {
    //       next : (data)=>{
    //         // alert(data.message);
    //         // window.location.reload();
    //       },
    //       error : (err)=>{
    //         // console.log('Error', err);
    //       }
    //     }
    //   )
    // }
  }


  deleteConfirmed(){
    this.deleConfirmation = true;
  }

  addUser() {
    this.router.navigate(['/admin', "add-user"])

  }

  details(id:any){
    this.userservice.getUserById(id).subscribe({
      next:(info)=>{

      },
      error:(e)=>{

      }
    })
  }

}
