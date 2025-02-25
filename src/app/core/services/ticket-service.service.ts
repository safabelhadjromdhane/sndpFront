import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../../shared/models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {

  constructor(private http:HttpClient) { }

  baseUrl: string = "http://localhost:4000/tickets";

  // Getting All Tickets
  getAllTickets() {
    return this.http.get<{message:string, tickets:Ticket}>(`${this.baseUrl}/get-tickets`)
  }

  //réserver ticket()
  reserveTicket(ticket:any) {
    return this.http.post<{message:string,ticket:any}>(`${this.baseUrl}/create-ticket`, ticket)
  }

  supprimerTicket(id:any){
    return this.http.delete<{message:string}>(`${this.baseUrl}/delete-ticket/${id}`)
  }

  countTicket(){
    return this.http.get<{message:string, ticketNBR:any}>(`${this.baseUrl}/count`)
  }

  getTicketById(id:any){
    return this.http.get<{message: string, data:Ticket}>(`${this.baseUrl}/find-ticket/${id}`)

  }
  getTicketByClient(codeClient:string){
    return this.http.get<{message: string, data:Ticket }>(`${this.baseUrl}/search-ticket`)

  }
  getTicketByGuichet(guichetId:any){
    return this.http.get<{message: string, data:Ticket }>(`${this.baseUrl}/search-ticket-guichet`)

  }
  countTicketEnAttente(){
    return this.http.get<{message:string, data:any, num:any}>(`${this.baseUrl}/en-attente-count`)
  }
  countTicketEnCours(){
    return this.http.get<{message:string, data:any, num:any}>(`${this.baseUrl}/en-cours-count`)

  }
  updateTicket(id:any, data :any){
    return this.http.put<{message:string, data:any}>(`${this.baseUrl}/update-ticket/${id}`, data)
  }

}
