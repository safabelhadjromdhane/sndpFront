import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  userForm!:FormGroup;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private router:Router,
    private userservice:UserServiceService,
    private fb:FormBuilder) {

  }
  onSignUp() {

  }

}
