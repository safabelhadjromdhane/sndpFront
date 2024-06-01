import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BureauServiceService } from '../../../../core/services/bureau-service.service';
import { Bureau } from '../../../../shared/models/Bureau';
import { HeaderComponent } from '../../../../core/header/header/header.component';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { CustomDatePipePipe } from '../../../../shared/pipes/custom-date-pipe.pipe';
import { GuichetServiceService } from '../../../../core/services/guichet-service.service';
@Component({
  selector: 'app-bureau',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, CustomDatePipePipe],
  templateUrl: './bureau.component.html',
  styleUrl: './bureau.component.css'
})
export class BureauComponent implements OnInit {
// delete(arg0: string) {
// throw new Error('Method not implemented.');
// }
  constructor(
    private bureauService:BureauServiceService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private userservice:UserServiceService,
    private gchsrv:GuichetServiceService,
  ) {}
  brx:Bureau[]= [];
  brtoDel!:number;
  brNum!:number;
  gchNumber!:number;
  brCreId!:any;
  dateSt:Date[]=[];
  ngOnInit() {
    this.getAllBureaux();
    this.brNumber()
  }
  getAllBureaux() {
    this.bureauService.getAllBurx().subscribe(
      {
        next: (infos)=>{
          this.brx = Object.assign(infos['bureaux']);

            // this.dateSt= Object.assign(infos["bureaux"]['createdDate'])
            // const dateSt2=  Date.UTC(2024,5,11,38,28,0X0)
        }
      }
    )
  }

  updateBureau(id:any) {
    this.router.navigate(['admin','bureaux','edit-bureau',id])
  }
  deleteBureau(id:any) {
    const idCast = Number.parseInt(id);

    this.bureauService.deleteBureau(idCast).subscribe({
      next: ()=>{
        console.log("Bureau has been deleted successfully!!");
        this.getAllBureaux();
      }
    })
  }
  naviagteTo(){
    this.router.navigate(['admin', 'bureaux','add-bureau'])
  }
  logout(){
    this.userservice.logout();
  }
  brNumber(){
    this.bureauService.totalBureau().subscribe({
      next:(infos)=>{
        this.brNum = infos.nbr;
      },
      error: (e)=>{
        console.log(e)
      }
    })
  }
  detailsBureau(id:any){
    this.gchsrv.getGuichetByBureau(id).subscribe({
      next:(infos)=>{
        // console.log(infos.data)
        this.gchNumber = infos.data.length
        // this.bureauService.getBureauById(id).subscribe({
        //   next:(info)=>{
        //     //  this.brCreId = info.data['user']
        //      console.log(info.data)
        //   }
        // })
        // this.idBureauCreator(id);
      },
      error:(e)=>{
        console.log("Erreurrr!!",e)
      }
    })
  }
  // idBureauCreator(id:any){
  //   this.bureauService.getBureauById(id).subscribe({
  //     next:(info)=>{
  //       console.log(info.data)
  //     },
  //     error:(e)=>{
  //       console.log(e)
  //     }
  //   })
  // }
}


