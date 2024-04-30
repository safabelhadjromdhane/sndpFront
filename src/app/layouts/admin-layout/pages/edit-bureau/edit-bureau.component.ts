import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BureauServiceService } from '../../../../core/services/bureau-service.service';

@Component({
  selector: 'app-edit-bureau',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-bureau.component.html',
  styleUrl: './edit-bureau.component.css'
})
export class EditBureauComponent implements OnInit{
  burId!:any;
  updateForms!:FormGroup;
  constructor(private route:Router,
    private bureauservice:BureauServiceService,
  private fb:FormBuilder,private active:ActivatedRoute){

  }
  ngOnInit(): void {
    let burCurrentId!:any;
    this.burId = this.active.params.subscribe(
      params=>{
        console.log(params['burId']);
        burCurrentId = params['burId'];
      }
    );
    this.bureauservice.getBureauById(burCurrentId).subscribe({
      next: (infos)=>{
        console.log("Successfully retrieved user details", infos["data"]);
        this.updateForms = this.fb.group({
          user : [infos['data']['user'], [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+)$')]],
          localisation: [infos['data']['localisation'], [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Z][a-z]+)$')]],
        })
      }
    })
    this.burId = burCurrentId;
  }

  onUpdate(){
    this.bureauservice.updateBureau(this.burId,this.updateForms).subscribe({
      next: ()=>{

      }
    })
  }


}
