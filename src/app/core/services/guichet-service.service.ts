import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.get<{data:any} >(`${this.baseUrl}/guichets`)
  }

  // Getting guichetById
  getGuichetById( id:number){
    return this.http.get<{message:String,data:any} >(`${this.baseUrl}/find-guichet/${id}`)
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
  updateGuichet(id: number, data:any){
    return this.http.put<{message : string, guichet:any}>(`${this.baseUrl}/update-guichet/${id}`, data);

  }




}
