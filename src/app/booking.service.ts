import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private api = 'http://127.0.0.1:5000/book';

  constructor(private http: HttpClient) {}

  book(selFlight:any, aprice:number): Observable<any[]> {
    const token = localStorage.getItem('token'); // Get token from storage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Attach token
    });

    const body = { selFlight,aprice};

    return this.http.post<any[]>(this.api, body, { headers });
  }
}
