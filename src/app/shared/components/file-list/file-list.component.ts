import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FileServiceService } from '../../../core/services/file-service.service';
import { FooterComponent } from "../../../core/footer/footer/footer.component";
import { UserServiceService } from '../../../core/services/user-service.service';

@Component({
    selector: 'app-file-list',
    standalone: true,
    templateUrl: './file-list.component.html',
    styleUrl: './file-list.component.css',
    imports: [RouterLink, FooterComponent]
})
export class FileListComponent implements OnInit{
  constructor(private route:Router,
    private fileservice:FileServiceService, private userservice:UserServiceService){

  }
  ngOnInit(): void {
  }
  logout(){
    this.userservice.logout();
  }

}
