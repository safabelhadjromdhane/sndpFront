import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { HeadUserComponent } from "../head-user/head-user.component";
import { UserServiceService } from '../../../../core/services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BureauListComponent } from "../../../../shared/components/bureau-list/bureau-list.component";

@Component({
    selector: 'app-userboard',
    standalone: true,
    templateUrl: './userboard.component.html',
    styleUrl: './userboard.component.css',
    imports: [FooterComponent, HeadUserComponent, BureauListComponent]
})
export class UserboardComponent implements OnInit {

  constructor(private userService:UserServiceService,
    private router:Router,
    private activatedRouter : ActivatedRoute
    ){}
   idUser!:string;
  ngOnInit() {
   var idToDisplay = this.activatedRouter.snapshot.paramMap.get('id')
  }

}
