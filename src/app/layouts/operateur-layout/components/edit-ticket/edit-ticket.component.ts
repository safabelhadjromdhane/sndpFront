import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { TicketServiceService } from '../../../../core/services/ticket-service.service';

@Component({
  selector: 'app-edit-ticket',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-ticket.component.html',
  styleUrl: './edit-ticket.component.css'
})
export class EditTicketComponent implements OnInit{
  constructor(private router: Router, private usersrv:UserServiceService, 
    private ticksrv: TicketServiceService
  ){

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

}
