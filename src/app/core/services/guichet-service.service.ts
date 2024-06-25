import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guichet } from '../../shared/models/Guichet';

@Injectable({
  providedIn: 'root'
})
export class GuichetServiceService {

  constructor(
    private http:HttpClient
  ) { }
  baseUrl: string = "http://localhost:4000/gchts";

  // Getting all guichets
  getAllGuichets(){
    return this.http.get<{message:string ,guichetx:Guichet} >(`${this.baseUrl}/guichets`)
  }

  // Getting guichetById
  getGuichetById( id:number){
    return this.http.get<{message:string,data:any} >(`${this.baseUrl}/find-guichet/${id}`)
  }

  //Creating guichet
   createNewGuichet(guichet:any){
    return this.http.post<{message : string}>(`${this.baseUrl}/create-guichet`,guichet)
   }

  //Deleting guichet
  deleteGuichet(id:number){
    return this.http.delete<{ message: string }>(`${this.baseUrl}/delete-guichet/${id}`);

  }

  //Updating guichet
  updateGuichet(id: any, data:any){
    return this.http.put<{message : string, guichet:any}>(`${this.baseUrl}/update-guichet/${id}`, data);

  }

  getGuichetsByBurId(bureau:string){
    return this.http.get<{message:string, data:Guichet}>(`${this.baseUrl}/find-gchtsByBuId`)
  }

  getGuichetByProductId(produit:string){
    return this.http.get<{message: string, data:Guichet}>(`${this.baseUrl}/find-gchByPro`);

  }

  //total Guichets
  totalGuichets(){
    return this.http.get<{message:string, nbr:any}>(`${this.baseUrl}/count`)
  }

  //getGuichetByUserId

  getGuichetByUser(user:any){
    return this.http.get<{message: string, guichet:any}>(`${this.baseUrl}/find-gchUser/${user}`)
  }

  //GetGuichetByBureau

  getGuichetByBureau(bureau:any){
    return this.http.get<{message:string, data:any}>(`${this.baseUrl}/find-gchtsByBureau/${bureau}`)
  }


}
