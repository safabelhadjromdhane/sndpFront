import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserServiceService } from '../../../core/services/user-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  rows:User[] = [];
  deleConfirmation:boolean =false;
  idUser!:string;
  ngOnInit(){
   this.getAll();
  }
  constructor(private userservice: UserServiceService,
    private router:Router) {

  }
  getAll() {
    this.userservice.getAllUsers()
    .subscribe(
      {
        next: (donnes)=>{
          console.log("Data ",donnes['data'])
          this.rows = Object.assign(donnes['data'])
       },
       error: (e)=> {
        console.log("I can't find the data message to display users "+e);
       }
      }
    )
  }
  deleteUser(id:any) {
    if(this.deleConfirmation = true){
      console.log("This is the id of the user to be deleted", id)
      this.idUser = id;
      this.userservice.deleteUser(id).subscribe(
        {
          next : (data)=>{
            console.log("Here data after delete", data.message);
            this.getAll();
          },
          error : (err)=>{
            console.log('Error while deleting this user'+ err);

          }
        }
      )
    }
    else {
      alert('Please confirm first');
    }
  }
  updateUser(id:any){
   console.log("This is the id of the user to be updated", id)
  }
  deleteConfirmed(){
    this.deleConfirmation = true;
    this.deleteUser(this.idUser);
  }
  denayDelete(deleDenay:any) {
    deleDenay = true;
    //this
    console.log('I cliked the cancel button', deleDenay.value);
  }
  addUser() {
    this.router.navigate(['register']);

  }

}
