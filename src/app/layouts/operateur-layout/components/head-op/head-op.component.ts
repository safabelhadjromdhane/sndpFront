import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserServiceService } from '../../../../core/services/user-service.service';

@Component({
  selector: 'app-head-op',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './head-op.component.html',
  styleUrl: './head-op.component.css'
})
export class HeadOpComponent implements OnInit {

  constructor(private userservice:UserServiceService) {

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  @Input() opNom !:string;
  logout(){
    this.userservice.logout();
  }

}
