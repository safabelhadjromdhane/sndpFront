import { Component, OnInit } from '@angular/core';
import { CustomDatePipePipe } from '../../../../shared/pipes/custom-date-pipe.pipe';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { TicketServiceService } from '../../../../core/services/ticket-service.service';
import { Ticket } from '../../../../shared/models/Ticket';
import { GuichetServiceService } from '../../../../core/services/guichet-service.service';
import { BureauServiceService } from '../../../../core/services/bureau-service.service';
import { FileServiceService } from '../../../../core/services/file-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [RouterLink, CustomDatePipePipe, FooterComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent  implements OnInit{
  constructor(private usersrv:UserServiceService,
    private route:Router,private ticketsrv:TicketServiceService,
    private guichetsrv:GuichetServiceService,private bursrv:BureauServiceService,
  private filesrv:FileServiceService
){

  }
  alltickets:Ticket[]=[];
  userTickets:Ticket[]=[];
  userId!:any;
  user!:any;
  numTickets!:number;
  idFile!:any;
  idTicket!:any;
  tab!:Ticket[];
  ngOnInit(): void {

    this.userId = localStorage.getItem("id")
    this.usersrv.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data.user;
      }
    })
    this.getUserTicket(this.userId);
    this.isDisabled();
  }

  getUserTicket(id:string){
   this.ticketsrv.getTicketByClient(id).subscribe({
    next:(res)=>{

      this.alltickets = Object.assign(res["data"])
      var x= this.alltickets.filter((el:Ticket)=>{
        return el.codeClient == id;
      })
      this.userTickets = Object.assign(x);
      var resu  = this.userTickets.filter((el)=>{
        return el.idFile
      })
      this.idFile = resu
      this.numTickets= this.userTickets.length;
    }
   })
  }
  deleteTicket(id:any){
    this.idTicket = id;
    this.ticketsrv.getTicketById(id).subscribe({
      next:(res)=>{
        this.tab = Object.assign(res.data)
         for(var i=0; i<this.tab.length;i++){
          if(this.tab[i].status == "en attente"){
            Swal.fire({
              title: "Êtes-vous sûr de vouloir de supprimer ce ticket ?",
              icon: "warning",
              text: "Vous ne pouvez plus le récuper !!!",
              showCancelButton: true,
              confirmButtonText: "Oui",
              cancelButtonText: "Non",
              reverseButtons: true
            }).then((result)=>{
             if(result.isConfirmed){
              this.ticketsrv.supprimerTicket(this.idTicket).subscribe({
                next:(info)=>{

                }
               })

             }
             this.getUserTicket(this.userId);

            //  this.getUserTicket(this.userId);
            })
          }
          else if(this.tab[i].status == "en cours") {
            Swal.fire({
              icon: "warning",
              title: "Vous ne pouvez pas supprimer ce ticket, car il est en cours de traitement!!!",
              showConfirmButton: true,
              timer: 3500
            });
          }
         }

      },
      error:()=>{
        Swal.fire({
          icon: "error",
          title: "Nous ne parvons pas à supprimer votre ticket",
          showConfirmButton: false,
          timer: 1500
        });
       }
    })

  }
  logout(){
    this.usersrv.logout();
  }
  isDisabled(): boolean {
    const res = this.userTickets.some(ticket => ticket.status == 'en cours')
    return res;
  }

}
