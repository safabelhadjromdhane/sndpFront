import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BureauServiceService } from '../../../../core/services/bureau-service.service';

@Component({
  selector: 'app-add-bureau',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,RouterLink],
  templateUrl: './add-bureau.component.html',
  styleUrl: './add-bureau.component.css'
})
export class AddBureauComponent implements OnInit{
  isAdded!:boolean;
  createForm!:FormGroup;
  constructor(private fb:FormBuilder,
    private router:Router,
    private bureauService:BureauServiceService) {

  }
  ngOnInit(){
   this.createForm = this.fb.group({
    user:['',[Validators.required, Validators.minLength(3),Validators.maxLength(12)]],
    localisation: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+)$')]]
   })
  }
  ajouterBureau(){
    if(this.createForm!=null) {
      this.isAdded = false;
      this.bureauService.createBureau(this.createForm.value).subscribe({
        next : (data)=>{
              if(data['message']== "Bureau has been created successfully"){
                window.alert("Le bureau a été créer avec Succès!!!");
                this.router.navigate(['admin','bureaux']);

              }
        },
        error : (error)=> {
        }
      })
    }
    else {
      this.isAdded = true;
    }
  }
  // onCreate(){
  //   this.router.navigate(['admin','bureaux']);

  // }

}
