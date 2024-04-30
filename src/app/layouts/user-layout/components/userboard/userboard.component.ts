import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { HeadUserComponent } from "../head-user/head-user.component";
import { UserServiceService } from '../../../../core/services/user-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BureauListComponent } from "../../../../shared/components/bureau-list/bureau-list.component";
import { UserFeedbackComponent } from '../user-feedback/user-feedback.component';
import { ListProdsComponent } from '../../pages/list-prods/list-prods.component';
// import { ProduitListComponent } from '../../../../shared/components/produit-list/produit-list.component';

@Component({
    selector: 'app-userboard',
    standalone: true,
    templateUrl: './userboard.component.html',
    styleUrl: './userboard.component.css',
    imports: [FooterComponent, HeadUserComponent, BureauListComponent, UserFeedbackComponent,RouterLink, ListProdsComponent]
})
export class UserboardComponent implements OnInit {

  constructor(private userService:UserServiceService,
    private router:Router,
    private activatedRouter : ActivatedRoute
    ){}
   idUser:any;
   userName:any;
    ngOnInit() {
      this.getClientId();

    }


  getClientId():any{
    if(localStorage.getItem('id')== null) {
      return null;
    }
    else {
      this.idUser = localStorage.getItem('id');
       this.userService.getUserById(this.idUser).subscribe(
        {
          next: (info)=>{
             this.userName = info.user.prenom + " "+ info.user.nom;
             console.log("This is the user name ", this.userName);
          }
        }
       )
    }
  }


}
