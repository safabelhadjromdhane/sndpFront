import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../../core/footer/footer/footer.component";
import { Router, RouterLink } from '@angular/router';
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
import { FileServiceService } from '../../../../core/services/file-service.service';
import Swal from 'sweetalert2';
import { File_m } from '../../../../shared/models/File';
import { CustomDatePipePipe } from '../../../../shared/pipes/custom-date-pipe.pipe';

@Component({
    selector: 'app-opboard',
    standalone: true,
    templateUrl: './opboard.component.html',
    styleUrl: './opboard.component.css',
    imports: [FooterComponent, RouterLink, CustomDatePipePipe,TicketBoardComponent,
      FileEnCoursComponent, ReactiveFormsModule, FormsModule
    ]
})
export class OpboardComponent implements OnInit{
  Status:string[]=["demarrer","arreter"]
   constructor(private userService: UserServiceService,
    private gchsrv:GuichetServiceService,
    private brsrv:BureauServiceService,
    private prdsrv:ProduitServiceService,
    private fb:FormBuilder,
    private filesrv:FileServiceService,
    private router:Router
  ) {

  }

  ngOnInit(){
    // this.getUserName()
    this.getFullName();
    this.displayRelativeInfo();
    this.formFile = this.fb.group({
      nom:["", [Validators.required]],
      idUser:['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      // codeproduit : ['', [Validators.required, Validators.minLength(1)]],
      idGuichet: ['', [Validators.required, Validators.minLength(1),]],
      fileDate : ['', [Validators.required]],
      status : ['', [Validators.required]],
    })
    this.displayOpFiles();

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
   filesOp:File_m[]=[]

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
            // console.log(typeof(inf.data['codeProd']))
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
    // console.log(this.formFile.value)

    if(this.formFile.valid){
      // console.log(this.formFile.value)

        this.filesrv.demarrerFile(this.formFile.value).subscribe({
          next:(info)=>{
            // console.log(info.message)
            Swal.fire({
              icon: "success",
              title: "Votre file est crée avec succéss!",
              showConfirmButton: true,
              timer: 1500
            });

          },
          error:(e)=>{
            Swal.fire({
              icon: "warning",
              title: "Une erreur est sruvenue lors de la connexion à la base de données!!!",
              showConfirmButton: true,
              timer: 1500
            });
          }
        },
      )
    }
    else{
      // console.log(this.formFile.value)

      Swal.fire({
            icon: "warning",
            title: "Vous devez vérifier vos données saisies!!!",
            showConfirmButton: true,
            timer: 1500
          });
    }

  }
  sendFile(){
    setTimeout(()=>
      {      console.log("I click send FIle")
      },1600)
    this.router.navigate(['/operateur']);
  }
  displayOpFiles(){
     this.filesrv.getFileByUser(this.opId).subscribe({
      next:(info)=>{
        this.filesOp = Object.assign(info['files'])
       console.log("the files asigned to this user",info.files)
      }
     })
  }
  deleteFile(id:any){
     if(id!=null){
      Swal.fire({
        title: "Êtes-vous sûr de vouloir supprimer cette file ?",
        icon: "warning",
        text: "Vous ne pouvez plus la récuperer!",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
        reverseButtons: true
      }).then((result)=>{
       if(result.isConfirmed){
        this.filesrv.deleteFile(id).subscribe({
          next:(info)=>{
            Swal.fire({
              title: "File supprimée avec succès",
              icon: "success",
              // text: "Vous ne pouvez plus la récuperer!",
              showConfirmButton: false,
              timer:1500
              // confirmButtonText: "Oui",
              // cancelButtonText: "Non",
              // reverseButtons: true
            })
            this.displayOpFiles();

          }
          // this.displayOpFiles();

         })
        //  this.displayOpFiles();

       }
      // this.displayOpFiles();
      })
     }
     else{
      Swal.fire({
        // position: "top-end",
        icon: "error",
        title: "Une erreur lors de la connexion à la base de données!! ",
        showConfirmButton: false,
        timer: 1500
      });

    }
  }
  // details(id:any){
  //   this.filesrv.getFileById(id).subscribe({
  //     next:(details)=>{
  //       console.log(details.file)
  //     }
  //   })

  // }
}
