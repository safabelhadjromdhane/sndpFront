import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TicketServiceService } from '../../../../core/services/ticket-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-ticket',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.css'
})
export class AddTicketComponent implements OnInit{
  constructor(private ticketsrv:TicketServiceService,
     private fb:FormBuilder){

  }
  reserverForm!:FormGroup;
  reserveForm:FormGroup = this.fb.group({
    codeClient:['', [Validators.required]],
    idGuichet:['', [Validators.required]]
  });
  ngOnInit(): void {
    this.reserveForm = this.fb.group({
      codeClient:['', [Validators.required]],
      idGuichet:['', [Validators.required]]
    })
    // throw new Error('Method not implemented.');
  }
  reserverTicket(){
    console.log(this.reserveForm.value)
   }
   ticketReserver(){
     Swal.fire({
       title: 'Ticket réservé avec succès',
       text: 'Votre ticket a été réservé avec succès',
       icon: 'success',
       confirmButtonText: 'OK',
     })
     console.log("The value of the ticket", this.reserveForm.value)
   }
}
