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
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getAllTicketPerDay()
  }
  getAllTicketPerDay(){
    this.today = new Date();
    this.ticketservice.getAllTickets().subscribe({
      next:(data)=>{
        console.log(data.tickets)
        // if(data.tickets.dateTicket.getDay() == this.today.getDay()){
        //   this.numTickets = this.tickets.length
        // }
        this.tickets = Object.assign(data["tickets"])
        this.tickets.forEach((el)=>{
          let i =0;
          if( el["status"] == "en attente"){
              i++;
              console.log(el["status"])
          }

          console.log(i)
        })
        // this.numTickets = this.tickets.length

        // console.log(data.tickets)
      }
    })
  }
  logout(){
    this.userservice.logout();
  }

}
