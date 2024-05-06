import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BureauServiceService } from '../../../../core/services/bureau-service.service';
import { GuichetServiceService } from '../../../../core/services/guichet-service.service';
import { ProduitServiceService } from '../../../../core/services/produit-service.service';
import { UserServiceService } from '../../../../core/services/user-service.service';

@Component({
  selector: 'app-bureau-details',
  standalone: true,
  imports: [RouterLink

  ],
  templateUrl: './bureau-details.component.html',
  styleUrl: './bureau-details.component.css'
})
export class BureauDetailsComponent implements OnInit {

  bureauId!:any;
  constructor(private bureausrv:BureauServiceService,
    private guichet:GuichetServiceService,
    private produitsrv:ProduitServiceService,
    private active: ActivatedRoute,
    private usersvr:UserServiceService
  ){

  }
  ngOnInit(): void {
    let currentBuId!:any;
    this.bureauId = this.active.params.subscribe(params =>{
      console.log(params['id']);
      currentBuId = params['id'];
      }
    )
    this.bureauId = currentBuId;
  }
  searchBurById(id:any){
    id = this.bureauId;
  }
  logout(){
    this.usersvr.logout();
  }
}
