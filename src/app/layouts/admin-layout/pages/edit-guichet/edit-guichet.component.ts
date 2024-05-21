import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { ProduitServiceService } from '../../../../core/services/produit-service.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { GuichetServiceService } from '../../../../core/services/guichet-service.service';

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
    private fb:FormBuilder,
    private guichetsvr:GuichetServiceService,
    private active:ActivatedRoute,
    private route:Router
  ) { }
  updateForms!:FormGroup;
  gchId!:any;

  ngOnInit(): void {
    let currentGch!:any;
    this.gchId = this.active.params.subscribe(
      params =>{
        console.log(params['id']) //log the value of id
        currentGch = params['id'];
      }
    );
    this.guichetsvr.getGuichetById(currentGch).subscribe({
      next:(infos)=>{
          console.log("This is the searched guichet", infos["data"]);
          this.updateForms = this.fb.group({
            nomGuichet:[infos['data']['nomGuichet'],Validators.required],
            bureau:[infos['data']['bureau'], Validators.required],
            user:[infos["data"]["user"],Validators.required],
            produit:[infos['data']['produit'],Validators.required]
          })
        },
        error:(e)=>{
          alert("On ne parviens pas à recuperer les informations!!!")
        }

      })
      this.gchId = currentGch;
  }
  logout(){
    this.usersrv.logout();
  }
  onUpdate(){
    this.guichetsvr.updateGuichet(this.gchId,this.updateForms.value).subscribe({
      next:(infos)=>{
        alert("Guichet modifié avec succés!!")
        this.route.navigate(['/admin', 'guichets'])
      },
      error:(error)=>{
        alert("Une erreur est survenue lors de la modification de cet utilisateur!!!");
        console.log(error);

      }
        })
  }
  onAbort(){
    this.route.navigate(['/admin', 'guichets'])
  }

}
