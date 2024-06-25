import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BureauServiceService } from '../../../../core/services/bureau-service.service';
import { GuichetServiceService } from '../../../../core/services/guichet-service.service';
import { ProduitServiceService } from '../../../../core/services/produit-service.service';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { Guichet } from '../../../../shared/models/Guichet';
import { Produit } from '../../../../shared/models/Produit';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TicketServiceService } from '../../../../core/services/ticket-service.service';

@Component({
  selector: 'app-bureau-details',
  standalone: true,
  imports: [RouterLink, FooterComponent,
   ReactiveFormsModule, FormsModule
  ],
  templateUrl: './bureau-details.component.html',
  styleUrl: './bureau-details.component.css'
})
export class BureauDetailsComponent implements OnInit {
  reserveForm:FormGroup = this.fb.group({
    codeClient:['', [Validators.required]],
    idGuichet:['', [Validators.required]]
  });

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
  guichetCode!:any;
  produitCode!:any;
  constructor(private bureausrv:BureauServiceService,
    private guichetsvr:GuichetServiceService,
    private produitsrv:ProduitServiceService,
    private active: ActivatedRoute,
    private usersvr:UserServiceService,
    private fb:FormBuilder,
    private ticketsrv:TicketServiceService
  ){

  }
  ngOnInit(): void {
    this.reserveForm = this.fb.group({
      codeClient:['', [Validators.required]],
      idGuichet:['', [Validators.required]],
      codeProd:['', [Validators.required]]
    })
    let currentBuId!:any;
    this.bureauId = this.active.params.subscribe(params =>{
      // console.log(params['id']);
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
          // console.log(this.nbrBureauGuichet)
          for(var i=0;i<this.nbrBureauGuichet;i++){
            const result = this.gchs.filter(({ produit }) => produit != "  ");
            this.partialObjects = result.map(item => {
              // console.log('the concerned ghuichets !',infos['data'])

              return { id: item.produit};
           });


          }
          this.partialObjects.map((id: any)=>{
              const firsId = id;
              for(const x in firsId){
                console.log(`THE ID ${firsId[x]}`)

              }

          })
        }
        else if(this.nbrGuichetParBureau==1){

          const result = this.gchs.filter(({ produit }) => produit != "  ");
          let partialObjects = result.map(item => {
            this.produitCode = item.produit;

            return { id: item.produit};

         });
         this.gchs.forEach((el)=>{
          this.guichetCode = el.id

         })

         this.produitsrv.getProductById(id).subscribe({
            next:(infos)=>{
              this.prods = Object.assign(infos['data']);
              // this.prods.map((prd)=>{
              //   this.prd = prd;
              //         console.log(this.prd)
              // })
            }
          })
        }


      },
      error:(e)=>{
        console.log('I cannot retieve the guichet from this bureau');
        Swal.fire({
          icon:'error',
          title: "Dommage!!",
          text: "Il y a un problème avec le bureau que vous avez choisi",
          footer: "Veuillez réessayer plus tard"
        })
      }

    })

  }
  logout(){
    this.usersvr.logout();
  }
  reserverTicket(){
  if(this.reserveForm.value!= null){
   this.ticketsrv.reserveTicket(this.reserveForm.value).subscribe({
    next:(data)=>{
    },
    error:()=>{
      Swal.fire({
        icon:'error',
        title: "Une erreur est survenue lors du stockage de votre ticket dans la Base de Données!!",
        text: "Veuillez réessayer plus tard",
        timer:2000
      })
    }
   })
  }
  else {
    Swal.fire({
      icon:'error',
      title: "Dommage!!",
      text: "Veuillez remplir tous les champs convenablement!!",
      timer: 2000
    })
    // this.reserveForm.markAllAsTouched();
  }
  //  console.log(this.reserveForm.value)
  }
  ticketReserver(){
    Swal.fire({
      title: 'Ticket réservé avec succès',
      text: 'Votre ticket a été réservé avec succès',
      icon: 'success',
      confirmButtonText: 'OK',
      timer:3000
    })
    // console.log("The value of the ticket", this.reserveForm.value)
  }
}

