import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../../shared/models/Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl: string = "http://localhost:4000/feed";


  // Ajouter Un avis
  addFeedBack(data:any) {
    return this.http.post<{message:string}>(`${this.baseUrl}/create-feedback`,data);
  }

  // Consulter les avis
  getFeedBacks() {
    return this.http.get<{
      message:string,
      data:Feedback}>(`${this.baseUrl}/feedbacks`);
  }

  // Supprimer les avis
   deleteFeedback(id:string){
    return this.http.delete<{message:string}>(`${this.baseUrl}/delete-feedback/${id}`);
   }

  //Modifier un avis
  updateFeedback(id:string,data: any) {
   return this.http.put<{message:string, avis:any}>(`${this.baseUrl}/update-feedback/${id}`, data)
  }

  //Rechercher un avis par IDAvis
  getFeedBackById(id:string) {
    return this.http.get<{message:string, feed:Feedback}>(`${this.baseUrl}/find-feedback/${id}`)
  }

  // Recherche un avis par IdUser
  getFeedbackByUserId(id:string){
    return this.http.get<{message: string, data:Feedback}>(`${this.baseUrl}/findFeedback-userId/${id}`)
  }

  // Rechercher un avis par Useremail
  getFeedBackByUserMail(email:string){
    return this.http.get<{message: string, data: any} >(`${this.baseUrl}/findUser-feedback`)
  }

  totalFeedbacks(){
    return this.http.get<{message:string, nbr:any}>(`${this.baseUrl}/count`)
  }

}
