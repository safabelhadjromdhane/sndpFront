import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../../core/footer/footer/footer.component";
import { HeadOpComponent } from "../head-op/head-op.component";

@Component({
    selector: 'app-opboard',
    standalone: true,
    templateUrl: './opboard.component.html',
    styleUrl: './opboard.component.css',
    imports: [FooterComponent, HeadOpComponent]
})
export class OpboardComponent implements OnInit{

  ngOnInit(){
  }

  constructor() {

  }

}
