import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FlightBooking {
  FLIGHT_ID: string;
  DEPT_TIME: string;
  DEPT_DATE: string;
  FRO: string;
  TOOOO: string;
  TYPE: string;
  DURATION: string;
  ARRIV_TIME: string;
  ARRIV_DATE: string;
  AIRLINE: string;
  BAG: string;
  AI_PRICE: string;
  EMT_PRICE: string;
  MF_PRICE: string;
  PRICE: string;
  PPRICE: string;
  BEST: string;
  FLEX: string;
  TSTAMP: Date;
  CANCELLABLE:string;
  UPCOMING:string;
  BID:string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://127.0.0.1:5000/fbook'; // Your API endpoint
  private apiUrl1 = 'http://127.0.0.1:5000/cancel'; // Your API endpoint

  constructor(private http: HttpClient) { }

  // Get all flight bookings for the logged-in user
  getUserFlightBookings(): Observable<FlightBooking[]> {
    const token = localStorage.getItem('token'); // Get token from storage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Attach token
    });
    const body={}
    return this.http.post<FlightBooking[]>(this.apiUrl,body ,{headers});
    // The JWT token should be automatically added by an HTTP interceptor
  }
  handleCancel(bid:string): Observable<any> {
    const token = localStorage.getItem('token'); // Get token from storage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Attach token
    });
    const body={bid}
    return this.http.post<any[]>(this.apiUrl1,body ,{headers})
    // The JWT token should be automatically added by an HTTP interceptor
  }
}