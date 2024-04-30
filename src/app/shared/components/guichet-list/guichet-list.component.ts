import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../../core/footer/footer/footer.component";
import { Guichet } from '../../models/File';
import { GuichetServiceService } from '../../../core/services/guichet-service.service';

@Component({
    selector: 'app-guichet-list',
    standalone: true,
    templateUrl: './guichet-list.component.html',
    styleUrl: './guichet-list.component.css',
    imports: [RouterLink, FooterComponent]
})
export class GuichetListComponent implements OnInit {

  constructor(private guichetservice:GuichetServiceService){

  }
  gchts:Guichet[]=[];

  ngOnInit(): void {
    this.guichetservice.getAllGuichets().subscribe(
      {
        next:(infos)=>{
          console.log(infos.data)
          // this.gchts = Object.assign(infos["data"])
        },
        error: ()=>{

        }
      }
    )
  }

  deleteGuichet(){

  }
  updateGuichet(){

  }

}
