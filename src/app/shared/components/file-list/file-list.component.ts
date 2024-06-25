import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FileServiceService } from '../../../core/services/file-service.service';
import { FooterComponent } from "../../../core/footer/footer/footer.component";
import { UserServiceService } from '../../../core/services/user-service.service';
import Swal from 'sweetalert2';
import { File_m } from '../../models/File';
@Component({
    selector: 'app-file-list',
    standalone: true,
    templateUrl: './file-list.component.html',
    styleUrl: './file-list.component.css',
    imports: [RouterLink, FooterComponent]
})
export class FileListComponent implements OnInit{
  constructor(private route:Router,
    private fileservice:FileServiceService, private userservice:UserServiceService){

  }
  files:File_m[] = [];
  numFiles!:number;
  fileArrert!:number;
  fileEnCours!:number;
  ngOnInit(): void {
    this.getFiles();
  }
  getFiles(){
    this.fileservice.getAllFiles().subscribe({
      next:(info)=>{
        this.files = Object.assign(info["data"])
        var res=this.files.filter((el)=>{
          return el.status== "arreter"
        })
        this.fileArrert = res.length;
         var result = this.files.filter((al)=>{
          return al.status == "demarrer"
         })
         this.fileEnCours = result.length;
          // console.log(typeof(this.files))
         this.numFiles=this.files.length
      }
    })
  }
  deleteFile(id:any){
    if(id!==null){
      Swal.fire({
        title: "Êtes-vous sûr de vouloir supprimer cette file ?",
        icon: "warning",
        text: "Vous ne pouvez plus la récuper !",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
        reverseButtons: true
      }).then((result)=>{
       if(result.isConfirmed){
        this.fileservice.deleteFile(id).subscribe({
          next:(info)=>{
            Swal.fire({
              title: "Suppression de file effectuée avec succès !",
              icon: "success",
              showConfirmButton: false,
              timer:1500
            })
            this.getFiles()
          }
        })
       }
      })
    }
    else {
      Swal.fire({
        // position: "top-end",
        icon: "error",
        title: "Une erreur lors de la connexion à la base de données!! ",
        showConfirmButton: false,
        timer: 2000
      });
    }

  }
  logout(){
    this.userservice.logout();
  }
  // consulterDetail(id:any){
  //   this.fileservice.getFileById(id).subscribe({
  //   next:(infos)=>{
  //     console.log("detail info", infos.file
  //     )
  //   }
  //   })
  // }

}
