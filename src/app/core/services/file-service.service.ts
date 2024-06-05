import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private http: HttpClient
  ) { }
  baseUrl = "http://localhost:4000/file"

  getAllFiles(){
    return this.http.get<{message: string, data:any}>(`${this.baseUrl}/get-files`)
  }
  demarrerFile(file:any){
    return this.http.post<{message:string, data:any}>(`${this.baseUrl}/creer`, file)
  }

  deleteFile(id:any){
    return this.http.delete<{message:string}>(`${this.baseUrl}/delete-file/${id}`)
  }

  updateFile(id:any, infos:any){
    return this.http.put<{message:string, data:any}>(`${this.baseUrl}/update-file/${id}`, infos)
  }

  getFileByGuichet(){
  }
}
