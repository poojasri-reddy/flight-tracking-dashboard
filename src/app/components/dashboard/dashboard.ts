import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { Flight } from '../../models/flight';
import { FlightService } from '../../services/flight';
import { FlightDetails } from '../flight-details/flight-details';
import { FlightList } from '../flight-list/flight-list';
import { FlightMap } from '../flight-map/flight-map';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FlightMap,
    FlightDetails,
    FlightList
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private readonly flightService = inject(FlightService);

  flights: Flight[] = [];
  filteredFlights: Flight[] = [];

  selectedFlight: Flight | null = null;

  isDarkMode = false;

  totalFlights = 0;
  activeFlights = 0;
  delayedFlights = 0;
  arrivedFlights = 0;

  filterForm = new FormGroup({
    callsign: new FormControl(''),
    status: new FormControl(''),
    origin: new FormControl(''),
    destination: new FormControl('')
  });

  ngOnInit(): void {
    this.loadFlights();

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  private loadFlights(): void {
    this.flightService.getFlights().subscribe({
      next: (flights) => {
        this.flights = flights;
        this.filteredFlights = flights;
        this.updateKpis();
      },

      error: (error) => {
        console.error('Unable to load flights', error);
      }
    });
  }

  private applyFilters(): void {
    const {
      callsign,
      status,
      origin,
      destination
    } = this.filterForm.value;

    const searchText =
      callsign?.trim().toLowerCase() ?? '';

    this.filteredFlights = this.flights.filter((flight) => {

      const matchesCallsign =
        !searchText ||
        flight.callsign.toLowerCase().includes(searchText);

      const matchesStatus =
        !status ||
        flight.status === status;

      const matchesOrigin =
        !origin ||
        flight.origin === origin;

      const matchesDestination =
        !destination ||
        flight.destination === destination;

      return (
        matchesCallsign &&
        matchesStatus &&
        matchesOrigin &&
        matchesDestination
      );
    });

    if (
      this.selectedFlight &&
      !this.filteredFlights.some(
        flight => flight.id === this.selectedFlight?.id
      )
    ) {
      this.selectedFlight = null;
    }
  }

  selectFlight(flight: Flight): void {
    this.selectedFlight = flight;
  }

  resetFilters(): void {
    this.filterForm.reset({
      callsign: '',
      status: '',
      origin: '',
      destination: ''
    });
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  private updateKpis(): void {
    this.totalFlights = this.flights.length;

    this.activeFlights = this.flights.filter(
      flight => flight.status === 'Active'
    ).length;

    this.delayedFlights = this.flights.filter(
      flight => flight.status === 'Delayed'
    ).length;

    this.arrivedFlights = this.flights.filter(
      flight => flight.status === 'Arrived'
    ).length;
  }
}