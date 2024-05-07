import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BureauServiceService } from '../../../../core/services/bureau-service.service';
import { UserServiceService } from '../../../../core/services/user-service.service';

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
  private fb:FormBuilder,private active:ActivatedRoute,
private usersvr:UserServiceService){

  }
  ngOnInit(): void {
    let burCurrentId!:number;
    this.burId = this.active.params.subscribe(
      params=>{
        console.log(params['id']);
        burCurrentId = params['id'];
      }
    );
    this.bureauservice.getBureauById(burCurrentId).subscribe({
      next: (infos)=>{
        console.log("Successfully retrieved user details", infos["data"]);
        this.updateForms = this.fb.group({
          user : [infos['data']['user'], [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
          localisation: [infos['data']['localisation'], [Validators.required]],
        })

      },
      error:(e)=>{
        console.log("Impossible de récupérer le bureau")
        // alert("On ne parviens pas à recuperer les informations!!!",)
      }
    })
    this.burId = burCurrentId;
  }

  onUpdate(){
    this.bureauservice.updateBureau(this.burId,this.updateForms).subscribe({
      next: (infos)=>{
        console.log("bureau à modifié", infos.bureau)
        alert('Le bureau a été modifié avec succès');
        this.route.navigate(['/admin','bureaux'])
      },
      error: (error)=>{
        alert("Une erreur est survenue lors de la modification de ce bureau!!!");

        console.log('ERRRROOOR', error)
}    })
  }
  logout(){
    this.usersvr.logout()
  }
  onAbort(){
    this.route.navigate(['/admin','bureaux'])
  }
}
