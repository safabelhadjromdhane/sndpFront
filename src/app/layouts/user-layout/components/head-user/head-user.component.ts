import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../../../core/services/user-service.service';

@Component({
  selector: 'app-head-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './head-user.component.html',
  styleUrl: './head-user.component.css'
})
export class HeadUserComponent implements OnInit {

  constructor(private router: Router, private userService: UserServiceService) {

  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();

  }

}
