import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { ProduitServiceService } from '../../../../core/services/produit-service.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-produit',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.css'
})
export class EditProduitComponent implements OnInit {
  constructor(private usersvr:UserServiceService,
    private prdsvr:ProduitServiceService,
    private route:Router,
    private fb:FormBuilder
  ) { }

  updateForms!:FormGroup;
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  logout(){
    this.usersvr.logout();
  }
  onUpdate(){

  }
}
