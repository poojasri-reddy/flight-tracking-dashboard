import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Flight } from '../../models/flight';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  templateUrl: './flight-list.html',
  styleUrl: './flight-list.css'
})
export class FlightList {

  @Input() flights: Flight[] = [];

  @Input() selectedFlight: Flight | null = null;

  @Output() flightSelected =
    new EventEmitter<Flight>();

  selectFlight(flight: Flight): void {
    this.flightSelected.emit(flight);
  }
}