import { Component, OnInit , Output,EventEmitter} from '@angular/core';
import { FooterComponent } from "../../../../core/footer/footer/footer.component";
import { HeadOpComponent } from "../head-op/head-op.component";
import { TrackOperatComponent } from '../track-operat/track-operat.component';
import { RouterLink } from '@angular/router';
import { CustomPipePipe } from "../../../../shared/pipes/custom-pipe.pipe";
import { UserServiceService } from '../../../../core/services/user-service.service';
import { TicketBoardComponent } from '../../pages/ticket-board/ticket-board.component';
import { FileEnCoursComponent } from '../../pages/file-en-cours/file-en-cours.component';
// import { FileListComponent } from '../../../../shared/components/file-list/file-list.component';
// import { TicketListComponent } from '../../../../shared/components/ticket-list/ticket-list.component';

@Component({
    selector: 'app-opboard',
    standalone: true,
    templateUrl: './opboard.component.html',
    styleUrl: './opboard.component.css',
    imports: [FooterComponent, HeadOpComponent,
      TrackOperatComponent, RouterLink,
      CustomPipePipe,TicketBoardComponent,FileEnCoursComponent]
})
export class OpboardComponent implements OnInit{
  // @Output() test: string = "this is a test";
   connectedTime =  new Date() ;

  ngOnInit(){
    // this.getUserName()
    this.getFullName();

  }
   dateN = new Date();
   userName!:string;
  constructor(private userService: UserServiceService) {

  }

  getFullName():any {
    const userId:string|null = localStorage.getItem('id');;
    if(userId == null){
      userId
      return null;
    }
    else {
      this.userService.getUserById(userId).subscribe({
        next: (info)=> {
         const nom:any = info.user.nom;
         const prenom :any= info.user.prenom;
         this.userName = prenom +" "+ nom ;
        }
      })
    }
  }
  logout(){
    this.userService.logout()
  }

}
