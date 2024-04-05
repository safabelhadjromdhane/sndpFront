import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cl-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cl-profile.component.html',
  styleUrl: './cl-profile.component.css'
})
export class ClProfileComponent implements OnInit{
   constructor( private location:Location) {

   }
  ngOnInit(){
  }
  goBack() {
    setTimeout(function(){
      //code goes here
   }, 500);
      this.location.back();
  }

}
