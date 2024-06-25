import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgot-pasword',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-pasword.component.html',
  styleUrl: './forgot-pasword.component.css'
})
export class ForgotPaswordComponent implements OnInit {

  useForms!:FormGroup;
  constructor(private route:Router, private usersvr:UserServiceService,
    private fb:FormBuilder, private active:ActivatedRoute
  ) { }
   userId!:any;
  ngOnInit(): void {
   this.userId = this.active.snapshot.paramMap.get('id')
    // throw new Error('Method not implemented.');
  }

  onUpdate(){

  }


}
