import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../core/footer/footer/footer.component";
import { RouterLink } from '@angular/router';
import { TicketServiceService } from '../../../core/services/ticket-service.service';
import { Ticket } from '../../models/Ticket';
import { UserServiceService } from '../../../core/services/user-service.service';
import { CustomDatePipePipe } from '../../pipes/custom-date-pipe.pipe';
@Component({
    selector: 'app-ticket-list',
    standalone: true,
    templateUrl: './ticket-list.component.html',
    styleUrl: './ticket-list.component.css',
    imports: [FooterComponent, RouterLink, CustomDatePipePipe]
})
export class TicketListComponent implements OnInit {

  constructor(private ticketservice:TicketServiceService, private userservice:UserServiceService){

  }
  today!:Date;
  tickets:Ticket [] =[]
  numTickets!:number;
  numTicketsEnCours!:number;
  idClient!:any;
  idFile!:any;
  client:Ticket[] = [];

  ngOnInit(): void {
    this.getAllTicketPerDay();
    this.countTicketEnAttente();
    this.countTicketEnCours();
  }
  getAllTicketPerDay(){
    this.ticketservice.getAllTickets().subscribe({
      next:(data)=>{

        this.tickets = Object.assign(data["tickets"])
          var res  =this.tickets.filter((el)=>{
            return el.file
          })
          this.idFile = res;
      }
    })
  }
  countTicketEnAttente(){
      this.ticketservice.countTicketEnAttente().subscribe({
        next:(info)=>{
          this.numTickets = info['data'][1];
        }
      })
  }
  countTicketEnCours(){
    this.ticketservice.countTicketEnCours().subscribe({
      next:(info)=>{
        this.numTicketsEnCours = info['data'][1];
      }
    })
  }
  logout(){
    this.userservice.logout();
  }
  details(id:any){
   this.ticketservice.getTicketById(id).subscribe({
    next:(info)=>{
     this.client = Object.assign(info["data"]);
     var res = this.client.map(el => el.codeClient);
     this.idClient =res;
    //  console.log("Result ",res)
     var op = this.client.map(op => op.idFile)
    //  console.log(" Information ",op)
     this.idFile = op;
    }
   })
  }

}
