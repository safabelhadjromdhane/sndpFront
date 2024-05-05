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
  ngOnInit(): void {

  }

  logout(){
    this.usersvr.logout()
  }

}
