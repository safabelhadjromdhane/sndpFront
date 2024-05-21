import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../core/header/header/header.component';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../../../core/services/user-service.service';


@Component({
    selector: 'app-dashbaord',
    standalone: true,
    templateUrl: './dashbaord.component.html',
    styleUrl: './dashbaord.component.css',
    imports: [HeaderComponent, FooterComponent, TableComponent, CardComponent, RouterLink]
})
export class DashbaordComponent implements OnInit {
  constructor(private router:Router, private usersvr:UserServiceService){

  }
  isAd!:boolean;
  idRestored!:any;
  ngOnInit(): void {

    console.log(localStorage.getItem("id"))
    this.idRestored=localStorage.getItem("id");
    this.usersvr.getUserById(this.idRestored).subscribe({
      next:(infos)=>{
        if(infos.user.role != "admin"){
            console.log("This is not an Admininistrateur!!")
            this.isAd = false;
        }else{
          this.isAd = true;
          //  localStorage.setItem("userAdmin",v infos.user)
          console.log(this.isAd)

        }
      },
      error:()=>{

      }
    })
  }

  logout(){
    this.usersvr.logout()
  }

}
