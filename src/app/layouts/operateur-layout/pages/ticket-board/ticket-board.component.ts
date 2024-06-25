import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TicketServiceService } from '../../../../core/services/ticket-service.service';
import { UserServiceService } from '../../../../core/services/user-service.service';

@Component({
  selector: 'app-ticket-board',
  standalone: true,
  imports: [RouterLink, ],
  templateUrl: './ticket-board.component.html',
  styleUrl: './ticket-board.component.css'
})
export class TicketBoardComponent implements OnInit {

  constructor(private active:ActivatedRoute, private router:Router,
    private ticketsrv:TicketServiceService, private usersrv:UserServiceService
  ){

  }
  boardId !:any;
  ngOnInit(): void {
    this.active.params.subscribe((params)=>{
      this.boardId=params['id'];
      console.log(this.boardId)
    })
    // throw new Error('Method not implemented.');
  }

  getAllTickets(){

  }

}
