import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { ProduitServiceService } from '../../../../core/services/produit-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-produit',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.css'
})
export class EditProduitComponent implements OnInit {

  prodId!:any;

  constructor(private usersvr:UserServiceService,
    private prdsvr:ProduitServiceService,
    private route:Router,
    private fb:FormBuilder,
    private active:ActivatedRoute
  ) { }

  updateForms!:FormGroup;
  ngOnInit(): void {
    let prodCurrentId!:any;
    this.prodId = this.active.params.subscribe(
      params=>{
        console.log(params['id']) //log the value of id
        prodCurrentId=params['id'];
      }
    );
    this.prdsvr.getProductById(prodCurrentId).subscribe({
      next:(infos)=>{
        console.log("This is the searched Product",infos['data']);
        this.updateForms = this.fb.group({
          guichet:[infos["data"]["guichet"], Validators.required],
          libProd:[infos["data"]["libProd"],Validators.required],
          quantite:[infos['data']['quantite'], Validators.required]
        })
      },
      error:()=>{
        alert("On ne parviens pas à recuperer les informations!!!")

      }
    })
    this.prodId = prodCurrentId;

  }

  logout(){
    this.usersvr.logout();
  }
  onUpdate(){
    this.prdsvr.updateProduct(this.prodId, this.updateForms.value).subscribe({
     next:()=>{
        alert('Le produit a bien été modifié');
        this.route.navigate(['/admin','produits']);
     },
     error:(e)=>{
      alert('Erreur de modification')
      console.log(e)
     }
    })

  }
  onAbort(){
    this.route.navigate(['/admin','produits'])
  }
}
