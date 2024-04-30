import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProduitServiceService } from '../../../core/services/produit-service.service';
import { FooterComponent } from '../../../core/footer/footer/footer.component';
import { Produit } from '../../models/Produit';

@Component({
  selector: 'app-produit-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink,FooterComponent],
  templateUrl: './produit-list.component.html',
  styleUrl: './produit-list.component.css'
})
export class ProduitListComponent implements OnInit {
  constructor(private route:Router,
    private productservice:ProduitServiceService
  ){

  }
  prds:Produit[]=[];
  ngOnInit(): void {
    this. AllProducts();
    // throw new Error('Method not implemented.');
  }
  AllProducts(){
    this.productservice.getAllProducts().subscribe(
      {
        next : (infos)=>{
          console.log("liste des produits", infos.message);
          // this.prds = Object.assign(infos["data"])
        }
      }
    )
  }


}
