import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BureauServiceService } from '../../../../core/services/bureau-service.service';
import { Bureau } from '../../../../shared/models/Bureau';
import { HeaderComponent } from '../../../../core/header/header/header.component';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';

@Component({
  selector: 'app-bureau',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './bureau.component.html',
  styleUrl: './bureau.component.css'
})
export class BureauComponent implements OnInit {
  constructor(
    private bureauService:BureauServiceService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {}
  brx!:Bureau[];
  ngOnInit() {
  }
  getAllBureaux() {
    this.bureauService.getAllBurx().subscribe(
      {
        next: (infos)=>{
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
