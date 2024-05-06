import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProduitServiceService } from '../../../core/services/produit-service.service';
import { FooterComponent } from '../../../core/footer/footer/footer.component';
import { Produit } from '../../models/Produit';
import { UserServiceService } from '../../../core/services/user-service.service';

@Component({
  selector: 'app-produit-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink,FooterComponent,RouterOutlet],
  templateUrl: './produit-list.component.html',
  styleUrl: './produit-list.component.css'
})
export class ProduitListComponent implements OnInit {
  constructor(private route:Router,
    private productservice:ProduitServiceService,
    private userservice:UserServiceService,
  ){

  }
  prds:Produit[]=[];
  nbProds!:number;
  ngOnInit(): void {
    this.AllProducts();
    this.countProducts()
    // throw new Error('Method not implemented.');
  }
  AllProducts(){
    this.productservice.getAllProducts().subscribe(
      {
        next : (infos)=>{
          console.log("liste des produits", infos.products);
          this.prds = Object.assign(infos['products'])
        },
        error : (err)=>{
          console.log("Error I can not get all products", err)
        }
      }
    )
  }

  logout(){
    this.userservice.logout();
  }
  deleteProduit(id:any) {
    if(window.confirm("Êtes-vous sûr de vouloir supprimer ce produit?")){
      this.productservice.deleteProduct(id).subscribe({
        next:(info)=> {
          alert(info.message)
          window.location.reload()
          // this.AllProducts();
        },
        error:(e)=>{
          console.log(e);
          alert("Nous n'avons pas parvenue à supprimer cet produit!!")
        }
      })
    }
  }
  updateProduit(id:any){
    this.productservice.getProductById(id).subscribe({

         next:()=>{

          },
          error:(e)=>{
            setTimeout(()=> {
              alert("Il ya un problème lors de la modification de ce produit!!")
            }, 2000)
          },
        })

  }
  countProducts(){
    this.productservice.totalProducts().subscribe({
      next:(infos)=>{
        this.nbProds = infos.nbr;
      },
       error:(e)=>{
        console.log('Erreur lors du calcul total',e)
       }

    })
  }

}
