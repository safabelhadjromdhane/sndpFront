import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomDatePipePipe } from '../../../../shared/pipes/custom-date-pipe.pipe';
import { FileServiceService } from '../../../../core/services/file-service.service';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { File_m } from '../../../../shared/models/File';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { TicketServiceService } from '../../../../core/services/ticket-service.service';
import { Ticket } from '../../../../shared/models/Ticket';
import { GuichetServiceService } from '../../../../core/services/guichet-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-file-en-cours',
  standalone: true,
  imports: [RouterLink, CustomDatePipePipe, FooterComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './file-en-cours.component.html',
  styleUrl: './file-en-cours.component.css'
})
export class FileEnCoursComponent implements OnInit {
  // files:File_m[]=[]
  currentTime!:Date;
  temps_demarrage!:any;
  updateForm:FormGroup = this.fb.group({
    nom:['',[Validators.required]],
    status:['', [Validators.required]]
  })
  constructor(private fileservice:FileServiceService, private userservice:UserServiceService,
    private router:Router, private ticketsrv:TicketServiceService, private guichetsrv:GuichetServiceService
  , private fb:FormBuilder){

  }
  userId!:any;
  tickets:Ticket[]=[];
  ticke!:any;
  assigneG!:any;
  idGu!:any;
  filtered!:any[];
  idTicket!:any;
  ticketCount!:any;
  ngOnInit(): void {
    this.getIdUser();
  // this.getTickets();
  this.getUserInfo()
  this.updateForm = this.fb.group({
    description:['',[Validators.required]],
    status:['', [Validators.required]]
  })
    // throw new Error('Method not implemented.');
  }
  getIdUser():any{
    const  user:string| null =localStorage.getItem("id");
   if(user == null ){
      user
      return "No thing";
   }
   else{
    this.userId = user;
      return user;
   }
  }
  // getTickets(){
  //   this.ticketsrv.getAllTickets().subscribe({
  //    next:(info)=>{
  //     this.tickets = Object.assign(info.tickets)

  //     //  this.getUserInfo();
  //      // console.log(this.tickets )
  //    }
  //   })
  //  }

  getUserInfo(){
    this.assigneG = this.userId;
    this.guichetsrv.getGuichetByUser(this.assigneG).subscribe({
      next:(data)=>{
        this.idGu = data.guichet.id;
        // console.log(data.guichet)
        this.ticketsrv.getAllTickets().subscribe({
          next:(info)=>{
           this.tickets = Object.assign(info.tickets)
            // console.log(info.tickets)
            this.filtered = this.tickets.filter(
              row=> row.idGuichet ==  this.idGu
            )
             this.ticketCount=this.filtered.length
          }
         })

        }
    })
  }

  logout(){
    this.userservice.logout();
  }
  updateTicket(id:any){
    this.idTicket = id;
    console.log(this.idTicket)
    if(id!=null){
      this.ticketsrv.getTicketById(id).subscribe({
      next:(info)=>{
       console.log(info.data)
       this.ticke = Object.assign(info["data"])
      }
      })
    }
    else{
      Swal.fire({
        title: 'Veuillez selectionner un ticket !',
        icon: 'error',
        showCancelButton: true
      })
    }

  }
  deleteTicket(id:any){
    if(id!==null){
      Swal.fire({
        title: "Êtes-vous sûr de vouloir supprimer cette ticket ?",
        icon: "warning",
        text: "Vous ne pouvez plus récuper ce compte!",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
        reverseButtons: true
      }).then((result)=>{
       if(result.isConfirmed){
        this.ticketsrv.supprimerTicket(id).subscribe({
          next:(info)=>{
            Swal.fire({
              title: "Ticket supprimée avec succès",
              icon: "success",
              // text: "Vous ne pouvez plus la récuperer!",
              showConfirmButton: false,
              timer:1500
              // confirmButtonText: "Oui",
              // cancelButtonText: "Non",
              // reverseButtons: true
            })
            this.getIdUser();

          }
         })
       }
      // this.getAll();
      })
      // this.getAll()

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
  onUpdate(){
   this.updateTicket(this.idTicket);
  //  console.log(this.updateForm.value)
   if(this.updateForm.valid){
       this.ticketsrv.updateTicket(this.idTicket, this.updateForm.value).subscribe({
        next:(info)=>{
          Swal.fire({
            icon : "success",
            title:"La modification de la ticket est affectuée avec succés",
            showConfirmButton : false,
            timer:1500
          })
          this.getUserInfo()
        },
        error: (error)=>{
          Swal.fire({
            icon : "error",
            title:"Une erreur est survenue lors de la modification du bureau",
            showConfirmButton : false,
            timer:1500
          })

       }
       }

      )
   }

  //  this.ticketsrv.updateTicket()
  }
}
