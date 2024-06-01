import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserServiceService } from '../../../core/services/user-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormGroup, ReactiveFormsModule , FormsModule, FormBuilder, Validators} from '@angular/forms';
import Validation from '../../models/Validation';
import { CustomDatePipePipe } from '../../pipes/custom-date-pipe.pipe';
import { GuichetServiceService } from '../../../core/services/guichet-service.service';

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
          this.operateurs = Object.assign(donnes['data'])
          // console.log("All the opertateurs", this.operateurs)


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
    // this.router.navigate(['register']);
    this.router.navigate(['/admin', "add-user"])

  }
  details(id:any){
    this.userservice.getUserById(id).subscribe({
      next:(info)=>{
        console.log("HI from user details Method",info.user)
        this.userId = info.user.id;
        this.gchsrv.getGuichetByUser(this.userId).subscribe({
            next:(inf)=>{
              console.log("HEllo from Info Guichet",inf.guichet)
              this.userBureau = inf.guichet.bureau;
              this.guichetUser = inf.guichet.nomGuichet
              // this.userBureau = inf.guichet.bureau;
              // this.guichetUser = inf.guichet.
            }
          })

      },
      error:(e)=>{

      }
    })
  }

}
