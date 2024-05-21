import { Component, OnInit } from '@angular/core';
import { GuichetServiceService } from '../../../../core/services/guichet-service.service';
import { FormBuilder, FormGroup,FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../../../core/services/user-service.service';

@Component({
  selector: 'app-add-guichet',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './add-guichet.component.html',
  styleUrl: './add-guichet.component.css'
})
export class AddGuichetComponent implements OnInit {
  addForms!:FormGroup;
  constructor(private guichetservice:GuichetServiceService,
    private router:Router, private fb:FormBuilder,
    private usersvr:UserServiceService
  ){
  }
  ngOnInit() {
    this.addForms = this.fb.group({
      // localisation: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+)$')]],
      nomGuichet:['', [Validators.required]],
      bureau:['', [Validators.required]],
      user:['',[Validators.required, Validators.minLength(3),Validators.maxLength(12)]],
      produit:['', ],


    })
  }

  ajouterGuichet(){
    if(this.addForms!=null){
            console.log(this.addForms.value);

      this.guichetservice.createNewGuichet(this.addForms.value).subscribe({
        next : (infos)=>{
          if(infos["message"]== "Guichet has been created successfully"){
            window.alert("Le guichet a été créer avec Succès!!!");
            this.router.navigate(['admin', "guichets"])
          }
        },
        error:(error)=>{
        }
      })
    }
  }
  logout(){
    this.usersvr.logout();
}
}
