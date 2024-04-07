import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitServiceService {

  constructor(
    private http:HttpClient
  ) { }

  baseUrl: string = "http://localhost:4000/prods";

  //Getting all poducts
  getAllProducts(){
    return this.http.get<{data:any}>(`${this.baseUrl}/products`);
  }

  //Creating a Product
  creatingProduct(product:any): Observable<any>{
    return this.http.post<{message : string }>(`${this.baseUrl}/create-product`,product)
  }

  //Updating a Product
  updateProduct(id:any, product:any){

  }

  //Deleting a product

  //Getting product by Id



}
