import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders} from '@angular/common/http'

import {from, Observable} from 'rxjs'

@Injectable({

  providedIn: 'root'

})

export class GetresService {

  private api = 'http://127.0.0.1:5000/fetch';

  constructor(private http: HttpClient) {}

  getRes(from: string, to: string, date: string): Observable<any[]> {
    const token = localStorage.getItem('token'); // Get token from storage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Attach token
    });

    const body = { from, to, date };

    return this.http.post<any[]>(this.api, body, { headers });
  }

}
