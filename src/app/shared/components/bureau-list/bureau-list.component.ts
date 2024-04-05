import { Component, OnInit } from '@angular/core';
import { BureauServiceService } from '../../../core/services/bureau-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bureau } from '../../models/Bureau';

@Component({
  selector: 'app-bureau-list',
  standalone: true,
  imports: [],
  templateUrl: './bureau-list.component.html',
  styleUrl: './bureau-list.component.css',
})
export class BureauListComponent implements OnInit {
  constructor(
    private bureauService: BureauServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  // Decalaring varibales
  brx: Bureau[] = [];
  isClicked:boolean = false;

  // Implementing ngOnTnit()
  ngOnInit() {
    this.getAllBureaux();
  }


  // Injecting bureau Service to get all bureaux in the database
  getAllBureaux() {
    this.bureauService.getAllBurx().subscribe({
      next: (infos) => {
        // this.brx = infos.bureaux;
        this.brx = Object.assign(infos['bureaux']);
        console.log('These are your burx', this.brx);
      },
    });
  }

  // Implementing the navigateToMore Button of bureau
  navigateToMore(id:number) {
   console.log("ID of bureau : " + id);
   this.isClicked = true;
  }
}
