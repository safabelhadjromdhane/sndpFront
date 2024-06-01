import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BureauServiceService } from '../../../../core/services/bureau-service.service';
import { GuichetServiceService } from '../../../../core/services/guichet-service.service';
import { ProduitServiceService } from '../../../../core/services/produit-service.service';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { Guichet } from '../../../../shared/models/Guichet';
import { Produit } from '../../../../shared/models/Produit';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';

@Component({
  selector: 'app-bureau-details',
  standalone: true,
  imports: [RouterLink, FooterComponent

  ],
  templateUrl: './bureau-details.component.html',
  styleUrl: './bureau-details.component.css'
})
export class BureauDetailsComponent implements OnInit {

  bureauId!:any;
  nbrGuichetParBureau!:any;
  gchs:Guichet[]= [];
  gchProds!:any[];
  prods:Produit[]=[];
  prd!:Produit;
  prods2:Produit[]=[];
  nbrBureauGuichet!:number;
  partialObjects!:any;
  nomBureau!:any;
  constructor(private bureausrv:BureauServiceService,
    private guichetsvr:GuichetServiceService,
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
    this.searchBurById(this.bureauId);
    this.bureausrv.getBureauById(this.bureauId).subscribe({
      next:(info)=>{
        this.nomBureau = info.data.localisation;
      }
    })
  }
  searchBurById(id:any){
    id = this.bureauId;
    this.guichetsvr.getGuichetByBureau(id).subscribe({
      next:(infos)=>{
        this.nbrGuichetParBureau = (infos['data']).length;
        this.gchs= Object.assign(infos['data']);
        if(this.nbrGuichetParBureau> 1){
          this.nbrBureauGuichet = this.nbrGuichetParBureau;
          console.log(this.nbrBureauGuichet)
          for(var i=0;i<this.nbrBureauGuichet;i++){
            const result = this.gchs.filter(({ produit }) => produit != "  ");
            this.partialObjects = result.map(item => {
              // console.log('the concerned ghuichets !',infos['data'])

              return { id: item.produit};
           });
          //  console.log("ID Prod Project From boucle ",partialObjects)


          }
          this.partialObjects.map((id: any)=>{
              const firsId = id;
              for(const x in firsId){
                console.log(`THE ID ${firsId[x]}`)
                // this.produitsrv.getProductById(`${firsId[x]}`).subscribe({
                //   next:(infos)=>{
                //     console.log("Infos for product n1", infos.data)
                //   }
                // })
              }

          })
        }
        else if(this.nbrGuichetParBureau==1){

          const result = this.gchs.filter(({ produit }) => produit != "  ");
          // console.log("RESULT", result)
          let partialObjects = result.map(item => {
            console.log(item.produit);
            console.log('the concerned ghuichets !',infos['data'])

            return { id: item.produit};

         });
        //  console.log("ID Prod Project",partialObjects)
         this.produitsrv.getProductById(id).subscribe({
            next:(infos)=>{
              // console.log("Infos for product 1", infos.data)
              this.prods = Object.assign(infos.data);
              this.prods.map((prd:Produit)=>{
                this.prd = prd;
                      console.log(this.prd)
              })
            }
          })
        }


      },
      error:(e)=>{
        console.log('I cannot retieve the guichet from this bureau');
        window.alert("Impossible de récupérer les données de ce bureau!!");
      }

    })

  }
  logout(){
    this.usersvr.logout();
  }
}
