import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bureau } from '../../shared/models/Bureau';

@Injectable({
  providedIn: 'root'
})
export class BureauServiceService {

  constructor(
    private http:HttpClient
  ) { }
  baseUrl: string = "http://localhost:4000/brx";

  //Displaying all bureaux
  getAllBurx(){
    return this.http.get<{message : string, bureaux: Bureau}>(`${this.baseUrl}/bureaux`)
  }

  //Creating a new Bureau
  createBureau(bureau: any){
    return this.http.post<{message : string}>(`${this.baseUrl}/create-bureau`,bureau)
  }


  //Updating a Bureau
  updateBureau(id: any, data:any) {
    return this.http.put<{message : string, bureau:any}>(`${this.baseUrl}/update-bureau/${id}`, data);
  }


  //Deleting a Bureau
  deleteBureau(id: number) {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/delete-bureau/${id}`);
  }


  //Getting a Bureau By ID
  getBureauById(id:number) {
    return this.http.get<{ message: string, data: Bureau }>(`${this.baseUrl}/find/${id}`);
  }

  //count Bureau
  totalBureau(){
    return this.http.get<{message:string, nbr:any}>(`${this.baseUrl}/count`)
  }
}
