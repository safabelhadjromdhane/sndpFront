import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../../core/footer/footer/footer.component";
import { GuichetServiceService } from '../../../core/services/guichet-service.service';
import { User } from '../../models/User';
import { UserServiceService } from '../../../core/services/user-service.service';
import { Guichet } from '../../models/Guichet';


@Component({
    selector: 'app-guichet-list',
    standalone: true,
    templateUrl: './guichet-list.component.html',
    styleUrl: './guichet-list.component.css',
    imports: [RouterLink, FooterComponent]
})
export class GuichetListComponent implements OnInit {

  constructor(private guichetservice:GuichetServiceService,
    private usersrv:UserServiceService
  ){

  }
  gchts:Guichet[]=[];

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.guichetservice.getAllGuichets().subscribe(
      {
        next:(infos)=>{
          console.log(infos['message'])
          this.gchts = Object.assign(infos['guichetx']);
          console.log(this.gchts)

          // this.gchts = Object.assign(infos['data'])
        },
        error: (error)=>{
          console.log("Error est survenu", error);
        }
      }
    )
  }
  deleteGuichet(){

  }
  updateGuichet(){

  }
  logout(){
    this.usersrv.logout();
  }

}
