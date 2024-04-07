import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CustomPipePipe } from '../../../../shared/pipes/custom-pipe.pipe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-track-operat',
  standalone: true,
  imports: [CustomPipePipe],
  templateUrl: './track-operat.component.html',
  styleUrl: './track-operat.component.css'
})
export class TrackOperatComponent implements OnInit {


  constructor(private router: Router,

  ) {

  }
  @Input() connexion!:Date;
  @Output() countChanged = new EventEmitter<Date>();
 //Test
  connectedTime!: Date ;



  ngOnInit() {
    console.log("Connect Time à 15:06: " + this.connectedTime);
  }

}
