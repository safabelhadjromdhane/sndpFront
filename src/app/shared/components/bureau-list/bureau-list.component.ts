import { Component, OnInit } from '@angular/core';
import { BureauServiceService } from '../../../core/services/bureau-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bureau } from '../../models/Bureau';

@Component({
  selector: 'app-bureau-list',
  standalone: true,
  imports: [],
  templateUrl: './bureau-list.component.html',
  styleUrl: './bureau-list.component.css'
})
export class BureauListComponent implements OnInit{
  constructor(
    private bureauService:BureauServiceService,
    private router:Router,
    private activatedRiute:ActivatedRoute
  ) {}
   brx:Bureau[]= [];
  ngOnInit() {
    this.getAllBureaux();
  }

  getAllBureaux() {
    this.bureauService.getAllBurx().subscribe(
      {
        next: (infos)=>{
          // this.brx = infos.bureaux;
          this.brx = Object.assign(infos['bureaux'])
          console.log("These are your burx", this.brx);

        }
      }
    )
  }
  addBureau() {

  }
  updateBureau() {

  }
  deleteBureau() {

  }

}
