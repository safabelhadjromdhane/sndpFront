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

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [RouterLink, CustomDatePipePipe, FooterComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent  implements OnInit{
  constructor(private usersrv:UserServiceService,
    private route:Router,
     private ticketsrv:TicketServiceService,
    private guichetsrv:GuichetServiceService,
  private bursrv:BureauServiceService,
  private filesrv:FileServiceService
){

  }
  alltickets:Ticket[]=[];
  userTickets:Ticket[]=[];
  userId!:any;
  user!:any;
  numTickets!:number;
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    this.userId = localStorage.getItem("id")
    this.usersrv.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data.user;
        // console.log('THis is the entire user', this.user['id'])
      }
    })
    // this.getTicket();
    this.getUserTicket(this.userId);
  }

  getUserTicket(id:string){
    // id = this.userId;
   this.ticketsrv.getTicketByClient(id).subscribe({
    next:(res)=>{
      // console.log("jjjjjjj ",res.data)
      this.alltickets = Object.assign(res["data"])
      var x= this.alltickets.filter((el:Ticket)=>{
        return el.codeClient == id;
      })
      // console.log('Se sont les tickets du user', x);
      this.userTickets = Object.assign(x)
      this.numTickets= this.userTickets.length
      // console.log('Le nombre des tickets', this.numTickets);

    }
    , error:()=>{
      alert("Nous ne parvons pas à recupérer vos tickets")
    }
   })
  }
  deleteTicket(idTicket:any){
    this.ticketsrv.getTicketById(idTicket).subscribe({
      next:(res)=>{
        console.log(res)
        // console.log("jjjjjjj ",res.data)
      },
      // error:()=>{
      //   alert("Nous ne parvons pas à supprimer votre ticket")
      // }
    })
    // if(){

    // }
    // else{

    // }

  }
  logout(){
    this.usersrv.logout();
  }

}
