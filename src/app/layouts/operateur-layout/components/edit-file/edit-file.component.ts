import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { FileServiceService } from '../../../../core/services/file-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-file',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, FooterComponent],
  templateUrl: './edit-file.component.html',
  styleUrl: './edit-file.component.css'
})
export class EditFileComponent implements OnInit {
  constructor(private router:Router, private active:ActivatedRoute,
    private fb:FormBuilder, private usersrv:UserServiceService,
    private filesrv:FileServiceService
  ){

  }
  fileId!:any;
  editForm:FormGroup = this.fb.group({
    status:['', [Validators.required]]
  })
  ngOnInit(): void {
     let fileCurrentId!:number;
     this.fileId = this.active.params.subscribe(
      params =>{
        fileCurrentId = params['id'];
      }
     )
     this.filesrv.getFileById(fileCurrentId).subscribe({
      next:(info)=>{
        // console.log(fileCurrentId)
        console.log("Successfully retrieved user details", info["file"]);
        this.editForm= this.fb.group({
          status:[info["file"]['status'], [Validators.required]]
        })
      }
     })
     this.fileId = fileCurrentId;

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
  if(this.editForm.valid){
    this.filesrv.updateFile(this.fileId, this.editForm.value).subscribe({
      next:(info)=>{
          console.log("File updated successfully");
          Swal.fire({
            icon : "success",
            title:"La modification de la file est affectuée avec succés",
            showConfirmButton : false,
            timer:1500
          })
          this.router.navigate(['operateur'])
      },
      error: (error)=>{
        Swal.fire({
          icon : "error",
          title:"Une erreur est survenue lors de la modification du bureau",
          showConfirmButton : false,
          timer:1500
        })
        }
    })
  }

  }

}
