import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomDatePipePipe } from '../../../../shared/pipes/custom-date-pipe.pipe';

@Component({
  selector: 'app-file-en-cours',
  standalone: true,
  imports: [RouterLink, CustomDatePipePipe],
  templateUrl: './file-en-cours.component.html',
  styleUrl: './file-en-cours.component.css'
})
export class FileEnCoursComponent implements OnInit {
  currentTime!:Date;
  temps_demarrage!:any;
  constructor(){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  startFile(){
    this.currentTime = new Date();
    this.temps_demarrage = this.currentTime.getHours() + ':'+ this.currentTime.getMinutes();

    console.log(this.temps_demarrage)

  }
}
