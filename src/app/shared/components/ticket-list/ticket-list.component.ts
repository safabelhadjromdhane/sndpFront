import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../core/footer/footer/footer.component";
import { RouterLink } from '@angular/router';
import { TicketServiceService } from '../../../core/services/ticket-service.service';
import { Ticket } from '../../models/Ticket';

@Component({
    selector: 'app-ticket-list',
    standalone: true,
    templateUrl: './ticket-list.component.html',
    styleUrl: './ticket-list.component.css',
    imports: [FooterComponent, RouterLink ]
})
export class TicketListComponent implements OnInit {

  constructor(private ticketservice:TicketServiceService){

  }
  tickets:Ticket [] =[]
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

  }

}
