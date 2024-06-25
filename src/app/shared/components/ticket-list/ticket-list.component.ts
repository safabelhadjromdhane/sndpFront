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

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getAllTicketPerDay();
    this.countTicketEnAttente();
    this.countTicketEnCours();
  }
  getAllTicketPerDay(){
    this.today = new Date();
    this.ticketservice.getAllTickets().subscribe({
      next:(data)=>{

        this.tickets = Object.assign(data["tickets"])
          var res  =this.tickets.filter((el)=>{
            return el.file
          })
          this.idFile = res;
          console.log('idfile', this.idFile)
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
    this.idClient =info['data'].codeClient;
     console.log(info["data"])


    }
   })
  }

}
