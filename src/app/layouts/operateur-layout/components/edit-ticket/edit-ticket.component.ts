import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { TicketServiceService } from '../../../../core/services/ticket-service.service';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';

@Component({
  selector: 'app-edit-ticket',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule,FooterComponent],
  templateUrl: './edit-ticket.component.html',
  styleUrl: './edit-ticket.component.css'
})
export class EditTicketComponent implements OnInit{
  constructor(private router: Router, private usersrv:UserServiceService,
    private ticksrv: TicketServiceService, private fb:FormBuilder, private active:ActivatedRoute
  ){

  }
  ticketId:any;
  editForm:FormGroup = this.fb.group({
    ticketId: [''],
    status :['', [Validators.required]]
  })
  ngOnInit(): void {
    let ticketCurrentId!:number;
    this.ticketId = this.active.params.subscribe(
      params =>{
        ticketCurrentId = params['id'];
      }
    )
    this.ticksrv.getTicketById(ticketCurrentId).subscribe({
      next:(info)=> {
        console.log("Successfully retrieved user details", info["data"]);

      }
    })
        // throw new Error('Method not implemented.');
  }
  logout(){
    this.usersrv.logout();
  }

  onAbort(){
    this.router.navigate(['operateur'])

  }
  onUpdate(){
    console.log(this.editForm.value);
    // if(this.editForm.valid){
    //   this.ticksrv.updateFile(this.fileId, this.editForm.value).subscribe({
    //     next:(info)=>{
    //         console.log("File updated successfully");
    //         Swal.fire({
    //           icon : "success",
    //           title:"La modification de la file est affectuée avec succés",
    //           showConfirmButton : false,
    //           timer:1500
    //         })
    //         this.router.navigate(['operateur'])
    //     },
    //     error: (error)=>{
    //       Swal.fire({
    //         icon : "error",
    //         title:"Une erreur est survenue lors de la modification du bureau",
    //         showConfirmButton : false,
    //         timer:1500
    //       })
    //       }
    //   })
    // }

    }
}
