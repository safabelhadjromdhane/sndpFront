import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../../core/services/user-service.service';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Validation from '../../models/Validation';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  userId!: any;
  updateForm!:FormGroup;
  constructor(private route:Router, private active: ActivatedRoute,
    private userservice:UserServiceService,
    private fb:FormBuilder
  ){
  }
  ngOnInit(): void {
   let userCurrentId!:any;
    this.userId = this.active.params.subscribe(params => {
      console.log(params['id']) //log the value of id
      userCurrentId=params['id'];
    });
   this.userservice.getUserById(userCurrentId).subscribe(
    {
      next : (data)=> {
        console.log("This is the searched User",data["user"])
        this.updateForm = this.fb.group({
          nom : [data['user']['nom'], [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+)$')]],
          prenom: [data['user']['prenom'], [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+)$')]],
          email : [data['user']['email'], [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
          telephone : [data['user']['telephone'], [Validators.required, Validators.maxLength(8)]],
          password : ["",[Validators.required, Validators.minLength(6), Validators.maxLength(45)]],
          confirmPassword: ["",Validators.required],
        },
        {validators: [Validation.match("password", "confirmPassword")]}
      )
      },
      error : (e)=> {
        Swal.fire({
          // position: "top-end",
          icon: "error",
          title: "Une erreur est survenue, veuillez réessayer plus tard!!! ",
          showConfirmButton: false,
          timer: 1500
        })
        // alert("On ne parviens pas à recuperer les informations!!!")
      }
    }
   )
   this.userId = userCurrentId;

  }
  onUpdate(){
    this.userservice.editUser(this.userId,this.updateForm.value).subscribe({
      next : (info)=>{
        Swal.fire({
          icon: "success",
          title: "Modification réalisé avec succés",
          showConfirmButton: false,
          timer: 1500
        });
        this.route.navigate(['/admin']);
      },
      error:(error)=>
        {
          // alert("Une erreur est survenue lors de la modification de cet utilisateur!!!");
          Swal.fire({
            // position: "top-end",
            icon: "warning",
            title: "Données Non valide, veuillez vérifier vos données!! ",
            showConfirmButton: false,
            timer: 1500
          });
          console.log(error)
      }
    })
  }
  logout(){
    this.userservice.logout()
  }
  returnToBoard(){
    this.route.navigate(['/admin'])

  }


}
