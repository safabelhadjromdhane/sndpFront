import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../../core/footer/footer/footer.component";
import { RouterLink } from '@angular/router';
import { CustomPipePipe } from "../../../../shared/pipes/custom-pipe.pipe";
import { UserServiceService } from '../../../../core/services/user-service.service';
import { TicketBoardComponent } from '../../pages/ticket-board/ticket-board.component';
import { FileEnCoursComponent } from '../../pages/file-en-cours/file-en-cours.component';
import { Guichet } from '../../../../shared/models/Guichet';
import { GuichetServiceService } from '../../../../core/services/guichet-service.service';
import { BureauServiceService } from '../../../../core/services/bureau-service.service';
import { ProduitServiceService } from '../../../../core/services/produit-service.service';
import { Produit } from '../../../../shared/models/Produit';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
    selector: 'app-opboard',
    standalone: true,
    templateUrl: './opboard.component.html',
    styleUrl: './opboard.component.css',
    imports: [FooterComponent, RouterLink, CustomPipePipe,TicketBoardComponent,
      FileEnCoursComponent, ReactiveFormsModule, FormsModule
    ]
})
export class OpboardComponent implements OnInit{
  Status:string[]=["demarrer","arreter"]
   constructor(private userService: UserServiceService,
    private gchsrv:GuichetServiceService,
    private brsrv:BureauServiceService,
    private prdsrv:ProduitServiceService,
    private fb:FormBuilder
  ) {

  }

  ngOnInit(){
    // this.getUserName()
    this.getFullName();
    this.displayRelativeInfo();
    this.formFile = this.fb.group({
      identifiantop:['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      codeproduit : ['', [Validators.required, Validators.minLength(1)]],
      idguichet: ['', [Validators.required, Validators.minLength(1),]],
      datefile : ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      status : ['', [Validators.required]],
    })

  }
   userName!:string;
   opId!:any;
   gchOp:Guichet[]=[];
   opProd!:any;
   opBr!:any;
   nomBureau!:any;
   idBureau!:any;
   nomProduit!:any;
   idProduit!:any;
   codeProdui!:any;
   idGuichet!:any;
   userProduct:Produit[]=[];
   formFile!:FormGroup;

  getFullName():any {
    const userId:string|null = localStorage.getItem('id');;
    if(userId == null){
      userId
      return null;
    }
    else {
      this.userService.getUserById(userId).subscribe({
        next: (info)=> {
         const nom:any = info.user.nom;
         const prenom :any= info.user.prenom;
         this.userName = prenom +" "+ nom ;
        }
      })
    }
    this.opId = userId;
  }
  logout(){
    this.userService.logout()
  }
  displayRelativeInfo(){
    this.gchsrv.getGuichetByUser(this.opId).subscribe({
      next:(infos) =>
        {
        //  console.log(this.opId)
        // console.log("THIS USER'S RELATIVE GUICHET",infos.guichet)
        this.gchOp = Object.assign(infos['guichet']);
        this.idBureau = infos.guichet.bureau;
        this.idProduit = infos.guichet.produit;
        this.idGuichet = infos.guichet.id
        this.prdsrv.getProductById(this.idProduit).subscribe({
          next:(inf)=>{
            this.nomProduit = inf.data.libProd;
            console.log(typeof(inf.data['codeProd']))
            this.userProduct = Object.assign(inf['data'])
          }
        })
        this.brsrv.getBureauById(this.idBureau).subscribe({
          next:(info)=>{
            this.nomBureau = info.data.localisation;
          }
        })

      },
      error:(err)=>{
        console.error("Errur est survenue!!!!", err)
      }
    })
  }
  demarrer(){
   console.log(this.formFile.value)
  }
}
