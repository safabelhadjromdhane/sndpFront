import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../../core/footer/footer/footer.component";
import { GuichetServiceService } from '../../../core/services/guichet-service.service';
import { User } from '../../models/User';
import { UserServiceService } from '../../../core/services/user-service.service';
import { Guichet } from '../../models/Guichet';
import { CustomDatePipePipe } from '../../pipes/custom-date-pipe.pipe';


@Component({
    selector: 'app-guichet-list',
    standalone: true,
    templateUrl: './guichet-list.component.html',
    styleUrl: './guichet-list.component.css',
    imports: [RouterLink, FooterComponent, CustomDatePipePipe]
})
export class GuichetListComponent implements OnInit {

  constructor(private guichetservice:GuichetServiceService,
    private usersrv:UserServiceService
  ){

  }
  gchts:Guichet[]=[];
  gchNum!:number;

  ngOnInit(): void {
    this.getAll();
    this.totalGs();
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
  deleteGuichet(id:any){
  if(window.confirm("Êtes-vous sûr de vouloir supprimer ce guichet?")){
    this.guichetservice.deleteGuichet(id).subscribe({
      next:(info)=>{
        alert(info.message)
        window.location.reload()
        // this.getAll();
       },
        error: (e)=>{
          console.log(e);
          alert("Nous n'avons pas parvenue à supprimer ce guichet!!")
        }
    })
  }
  }
  updateGuichet(){

  }
  logout(){
    this.usersrv.logout();
  }
  totalGs(){
    this.guichetservice.totalGuichets().subscribe({
      next:(infos)=>{
        this.gchNum = infos.nbr;
      },
      error:(e)=>{
        console.log("Erreur est survenue!!",e)
      }

    })
  }

}
