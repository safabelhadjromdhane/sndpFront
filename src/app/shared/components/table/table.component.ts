import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserServiceService } from '../../../core/services/user-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormGroup, ReactiveFormsModule , FormsModule, FormBuilder, Validators} from '@angular/forms';
import Validation from '../../models/Validation';
import { CustomDatePipePipe } from '../../pipes/custom-date-pipe.pipe';
import { GuichetServiceService } from '../../../core/services/guichet-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ReactiveFormsModule, FormsModule, RouterLink, CustomDatePipePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  rows:User[] = [];
  operateurs:User[]=[];
  deleConfirmation:boolean =false;
  idUser!:string;
  updateForm!:FormGroup;
  infoUser!:any;
  userId!:any;
  userBureau!:any;
  guichetUser!:any;

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
    private gchsrv:GuichetServiceService,
    private router:Router, private fb:FormBuilder) {

  }
  getAll() {
    this.userservice.getAllOps()
    .subscribe(
      {
        next: (donnes)=>{
          this.rows = Object.assign(donnes['data'])
          this.operateurs = Object.assign(donnes['data'])
       },
       error: (e)=> {
       }
      }
    )
  }
  deleteUser(idUser:any) {
    if(idUser!==null){
      Swal.fire({
        title: "Êtes-vous sûr de vouloir supprimer ce compte ?",
        icon: "warning",
        text: "Vous ne pouvez plus récuper ce compte!",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
        reverseButtons: true
      }).then((result)=>{
       if(result.isConfirmed){
        this.userservice.deleteUser(idUser).subscribe({
          next:(info)=>{
            Swal.fire({
              title: "Compte supprimé avec succès",
              icon: "success",
              // text: "Vous ne pouvez plus la récuperer!",
              showConfirmButton: false,
              timer:1500
              // confirmButtonText: "Oui",
              // cancelButtonText: "Non",
              // reverseButtons: true
            })
            this.getAll();

          }
         })
       }
      // this.getAll();
      })
      // this.getAll()

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
  }

  updateUser(id:any){
    this.userservice.getUserById(id).subscribe({
      next: (data)=>{
        this.idUser = id;
      },
      error : ()=> {

        Swal.fire({
          title: "Une erreur est survenue lors de la modification du compte ?",
          icon: "error",
          showConfirmButton: false,
          timer:1500

        })
      }
    })
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
        this.userId = info.user.id;
        this.gchsrv.getGuichetByUser(this.userId).subscribe({
            next:(inf)=>{
              this.userBureau = inf.guichet.bureau;
              this.guichetUser = inf.guichet.nomGuichet
            }
          })

      },
      error:(e)=>{
          Swal.fire({
            title: "Une erreur est survenue lors de l'affichage des données' ?",
            icon: "error",
            showConfirmButton: false,
            timer:2500
          })
      }
    })
  }

}
