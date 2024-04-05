import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../core/services/user-service.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  nbrAd!:number;
  nbrOp!:number;
  nbrCl!:number;
  ngOnInit(){
  this.nbrAdmin();
  this.nbrOperat();
  this.nbrClient();
  }
  constructor(private userService:UserServiceService) {

  }
  nbrAdmin(){
   this.userService.getAllAdmins().subscribe({
    next :(info)=>{
      this.nbrAd = Object.keys(info.data).length;
     console.log("nbrAdmin : "+this.nbrAd);
     return this.nbrAd;
    }
   })
  }
  nbrOperat(){
    this.userService.getAllOps().subscribe({
      next :(info)=>{
        this.nbrOp = Object.keys(info.data).length;
       console.log("nbroperateurs : "+this.nbrOp);
       return this.nbrOp;

      }
     })

  }
  nbrClient() {
    this.userService.getAllClients().subscribe({
      next :(info)=>{
        this.nbrCl = Object.keys(info.data).length;
       console.log("nbroperateurs : "+this.nbrCl);
       return this.nbrCl;
      }
    })
  }


}
