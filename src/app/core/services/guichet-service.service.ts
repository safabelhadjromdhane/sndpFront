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

}
