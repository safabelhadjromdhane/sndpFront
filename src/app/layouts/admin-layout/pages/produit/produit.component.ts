import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProduitServiceService } from '../../../../core/services/produit-service.service';
import { Produit } from '../../../../shared/models/Produit';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit {

  prds:Produit[]= [];
  constructor(private prodservice:ProduitServiceService){

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  getAllProds(){
    this.prodservice.getAllProducts().subscribe({
      next: (infos)=>{
        // this.prds = Object.assign(infos['data'])
      }
    })
  }

}
