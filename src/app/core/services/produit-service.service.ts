import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../../shared/models/Produit';

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
    return this.http.get<{message: string, products:Produit}>(`${this.baseUrl}/products`);
  }

  //Creating a Product
  creatingProduct(product:any): Observable<any>{
    return this.http.post<{message : string }>(`${this.baseUrl}/create-product`,product)
  }

  //Updating a Product
  updateProduct(id:any, product:any){
   return this.http.put<{message: string, data:any}>(`${this.baseUrl}/update-product/${id}`,product)
  }

  //Deleting a product
  deleteProduct(id:any){
    return this.http.delete<{message: string, data:any}>(`${this.baseUrl}/delete-product/${id}`)
  }

  //Getting product by Id
  getProductById(id:any){
    return this.http.get<{message: string, data:any}>(`${this.baseUrl}/find-product/${id}`)
  }

  totalProducts(){
    return this.http.get<{message:string, nbr:any}>(`${this.baseUrl}/count`)
  }

}
