import { Component, OnInit , Output,EventEmitter} from '@angular/core';
import { FooterComponent } from "../../../../core/footer/footer/footer.component";
import { HeadOpComponent } from "../head-op/head-op.component";
import { TrackOperatComponent } from '../track-operat/track-operat.component';
import { RouterLink } from '@angular/router';
import { CustomPipePipe } from "../../../../shared/pipes/custom-pipe.pipe";
import { UserServiceService } from '../../../../core/services/user-service.service';
import { TicketBoardComponent } from '../../pages/ticket-board/ticket-board.component';
import { FileEnCoursComponent } from '../../pages/file-en-cours/file-en-cours.component';
import { Guichet } from '../../../../shared/models/Guichet';
import { GuichetServiceService } from '../../../../core/services/guichet-service.service';
import { BureauServiceService } from '../../../../core/services/bureau-service.service';
import { ProduitServiceService } from '../../../../core/services/produit-service.service';
// import { FileListComponent } from '../../../../shared/components/file-list/file-list.component';
// import { TicketListComponent } from '../../../../shared/components/ticket-list/ticket-list.component';

@Component({
    selector: 'app-opboard',
    standalone: true,
    templateUrl: './opboard.component.html',
    styleUrl: './opboard.component.css',
    imports: [FooterComponent, HeadOpComponent,
      TrackOperatComponent, RouterLink,
      CustomPipePipe,TicketBoardComponent,FileEnCoursComponent]
})
export class OpboardComponent implements OnInit{
  // @Output() test: string = "this is a test";
   connectedTime =  new Date() ;

  ngOnInit(){
    // this.getUserName()
    this.getFullName();
    this.displayRelativeInfo();

  }
   dateN = new Date();
   userName!:string;
   opId!:any;
   gchOp:Guichet[]=[];
   opProd!:any;
   opBr!:any;
   partialObjects!:any;
   nomBureau!:any;
   idBureau!:any;
   nomProduit!:any;
   idProduit!:any;
   currentTime!:Date;
   temps_demarrage!:any;
  constructor(private userService: UserServiceService,
    private gchsrv:GuichetServiceService,
    private brsrv:BureauServiceService,
    private prdsrv:ProduitServiceService
  ) {

  }

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

        console.log("THIS USER'S RELATIVE GUICHET",infos.guichet)
        this.gchOp = Object.assign(infos['guichet']);
        // console.log(infos.guichet.bureau)
        this.idBureau = infos.guichet.bureau;
        this.idProduit = infos.guichet.produit;
        // console.log(this.idProduit)
        // console.log(this.idBureau)
        this.brsrv.getBureauById(this.idBureau).subscribe({
          next:(info)=>{
            this.nomBureau = info.data.localisation;
          }
        })
        this.prdsrv.getProductById(this.idProduit).subscribe({
          next:(inf)=>{
            this.nomProduit = inf.data.libProd;
            // console.log(this.nomProduit)
          }
        })
              //   const result = this.gchOp.filter(({ produit }) => produit != "  ");
      //   this.partialObjects = result.map(item => {
      //     return { id: item.produit, };
      //  });


      },
      error:(err)=>{
        console.error("Errur est survenue!!!!", err)
      }
    })
  }
  startFile(){
    this.currentTime = new Date();
    this.temps_demarrage = this.currentTime.getHours() + ':'+ this.currentTime.getMinutes();

    console.log(this.temps_demarrage)
  }
}
