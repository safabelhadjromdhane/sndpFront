import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProduitServiceService } from '../../../../core/services/produit-service.service';
import { UserServiceService } from '../../../../core/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-produit',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent implements OnInit{

  createProduit!:FormGroup;
  constructor(private fb:FormBuilder, private prodservice:ProduitServiceService,
    private route: Router,
    private usersvr:UserServiceService
  ){

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.createProduit = this.fb.group(
      {
        codeProd:['',[Validators.required, Validators.minLength(1)] ],
        quantite:['', Validators.required],
        // user:['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
        guichet :['', Validators.required],
        libProd:['',Validators.required]
      }
    )

  }

  onSave(){
    console.log("thisis from templae", this.createProduit.value)
    if(this.createProduit.value !=null){
      this.prodservice.creatingProduct(this.createProduit.value).subscribe({
        next:(infos)=>{
          if(infos["status"]= 200){
            Swal.fire({
              icon: "success",
              text: "Produit créer avec succés!",
              showConfirmButton: true,

              // confirmButtonText: "Oui",
              // cancelButtonText: "Non",
              // reverseButtons: true
          })
            this.route.navigate(['admin','produits'])

          }

        }
      })
    }
  }
  logout(){
    this.usersvr.logout();
  }

}
