import { Component, OnInit } from '@angular/core';
import { GuichetServiceService } from '../../../../core/services/guichet-service.service';
import { FormBuilder, FormGroup,FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

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
    private router:Router, private fb:FormBuilder
  ){
  }
  ngOnInit() {
    this.addForms = this.fb.group({
      user:['',[Validators.required, Validators.minLength(3),Validators.maxLength(12)]],
      localisation: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+)$')]]
    })
  }

  ajouterGuichet(){
    if(this.addForms!=null){
      this.guichetservice.createNewGuichet(this.addForms.value).subscribe({
        next : (infos)=>{
          if(infos["message"]== ""){

          }
        },
        error:(error)=>{
        }
      })
    }
  }

}
