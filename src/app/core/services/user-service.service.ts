import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../shared/models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private http:HttpClient,

  ) { }
  baseUrl= "http://localhost:4000/auth";
  isUserLoggedIn: boolean = false;

  //get all users
  getAllUsers()
  {
    return this.http.get<{
      // message: string,
       data:User
      //  users:User
      } >(`${this.baseUrl}/users`);
  }


  // SignUp Service
  signup(user:User):Observable <any>{
    return this.http.post<{message : string, token : string}>(`${this.baseUrl}/signup`,user);
   }


   //Login Service
   login(user: any) {
    this.isUserLoggedIn = true;
    return this.http.post<{message : string, user: any, token:string}>(`${this.baseUrl}/login`, user);
   }

    // Getting single User
    getUserById(id: string) {
      // const token = this.getToken();
      // const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

      return this.http.get<{ message: string, user: User }>(`${this.baseUrl}/find/${id}`
      // {headers: header}
      );
    }
     //Editing a User
     editUser(id: string,data:any){
      const token = this.getToken();
      // console.log("gettinf the token from userservive", token);
      const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

      return this.http.put<{message : string, user:any}>(`${this.baseUrl}/update/${id}`, data,
      // {headers:header}
      );
    }
      //DELETING A USER
      deleteUser(id: string) {
        const token = this.getToken();
        const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

        return this.http.delete<{ message: string }>(`${this.baseUrl}/delete/${id}`,
        // { headers: header}
        );
      }

      // counting Users
      countUsers(){
        const token = this.getToken();
        const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

        return this.http.get<{message:string, nbUsers: number}>(`${this.baseUrl}/count`,
        // {headers:header}
        );
      }

      //logout
      logout() {
        this.isUserLoggedIn = false;
        localStorage.removeItem("acess_token");
        localStorage.clear();
      }

      getToken(){
        return localStorage.getItem('access_token');
      }

      // getting all clients
      getAllClients() {
        return this.http.get<{message: string, data:User} >(`${this.baseUrl}/clients`)
      }

      //getting all operateurs
      getAllOps() {
        return this.http.get<{message: string, data:User} >(`${this.baseUrl}/operateurs`)
      }
      getAllAdmins() {
        return this.http.get<{message: string, data:User} >(`${this.baseUrl}/admins`)

      }

      //forgot password

      resetPassword(){

      }

}


