import { Component, Input } from '@angular/core';

import { Flight } from '../../models/flight';

@Component({
  selector: 'app-flight-details',
  standalone: true,
  templateUrl: './flight-details.html',
  styleUrl: './flight-details.css'
})
export class FlightDetails {

  @Input() flight: Flight | null = null;

}