import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-head-op',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './head-op.component.html',
  styleUrl: './head-op.component.css'
})
export class HeadOpComponent {
  @Input() opNom !:string;

}
