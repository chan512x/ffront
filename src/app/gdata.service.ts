import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChartData {
  aictc: [string, number][];
  emt: [string, number][];
  mf: [string, number][];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://127.0.0.1:5000/graph'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  getChartData(): Observable<ChartData> {
    return this.http.get<ChartData>(this.apiUrl);
  }
}