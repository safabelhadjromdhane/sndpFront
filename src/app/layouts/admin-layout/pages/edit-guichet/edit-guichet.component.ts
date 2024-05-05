import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { ProduitServiceService } from '../../../../core/services/produit-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-guichet',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-guichet.component.html',
  styleUrl: './edit-guichet.component.css'
})
export class EditGuichetComponent implements OnInit {

  constructor(private usersrv:UserServiceService,
    private prdsvr:ProduitServiceService,
    private fb:FormBuilder
  ) { }
  updateForms!:FormGroup;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  logout(){
    this.usersrv.logout();
  }
  onUpdate(){

  }

}
