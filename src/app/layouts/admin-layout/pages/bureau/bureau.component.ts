import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BureauServiceService } from '../../../../core/services/bureau-service.service';
import { Bureau } from '../../../../shared/models/Bureau';
import { HeaderComponent } from '../../../../core/header/header/header.component';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { UserServiceService } from '../../../../core/services/user-service.service';

@Component({
  selector: 'app-bureau',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
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
    private userservice:UserServiceService
  ) {}
  brx:Bureau[]= [];
  brtoDel!:number;
  brNum!:number;
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

          this.dateSt= Object.assign(infos["bureaux"]['createdDate'])
          const dateSt2=  Date.UTC(2024,5,11,38,28,0X0)
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

}


