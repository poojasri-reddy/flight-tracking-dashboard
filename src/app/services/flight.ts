import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Flight } from '../models/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private readonly http = inject(HttpClient);

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>('flights.json');
  }
}