import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import * as L from 'leaflet';

import { Flight } from '../../models/flight';

@Component({
  selector: 'app-flight-map',
  standalone: true,
  templateUrl: './flight-map.html',
  styleUrl: './flight-map.css'
})
export class FlightMap implements AfterViewInit, OnChanges {

  @Input() flights: Flight[] = [];

  @Input() selectedFlight: Flight | null = null;

  @Output() flightSelected =
    new EventEmitter<Flight>();

  @ViewChild('mapContainer')
  private mapContainer!: ElementRef<HTMLDivElement>;

  private map!: L.Map;

  private markersLayer = L.layerGroup();

  private routeLine?: L.Polyline;


  ngAfterViewInit(): void {
    this.initializeMap();
  }


  ngOnChanges(changes: SimpleChanges): void {

    if (changes['flights'] && this.map) {
      this.displayFlights();
    }

    if (changes['selectedFlight'] && this.map) {
      this.displaySelectedFlight();
    }
  }


  private initializeMap(): void {

    this.map = L.map(
      this.mapContainer.nativeElement
    ).setView(
      [20.5937, 78.9629],
      5
    );


    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; OpenStreetMap contributors'
      }
    ).addTo(this.map);


    this.markersLayer.addTo(this.map);

    this.displayFlights();


    if (this.selectedFlight) {
      this.displaySelectedFlight();
    }
  }


  private displayFlights(): void {

    this.markersLayer.clearLayers();


    this.flights.forEach((flight) => {

      /*
       * CSS-based marker.
       * No PNG/JPG image is required.
       */

      const flightIcon = L.divIcon({

        className: 'flight-marker',

        html: `
          <div class="flight-marker-icon">
            ✈
          </div>
        `,

        iconSize: [36, 36],

        iconAnchor: [18, 18],

        popupAnchor: [0, -18]

      });


      const marker = L.marker(

        [
          flight.currentPosition.lat,
          flight.currentPosition.lng
        ],

        {
          icon: flightIcon
        }

      );


      const popupContent = `
        <div class="flight-popup">

          <strong>
            ${flight.flightNumber}
          </strong>

          <br>

          Callsign:
          ${flight.callsign}

          <br>

          Route:
          ${flight.origin}
          →
          ${flight.destination}

          <br>

          Status:
          ${flight.status}

        </div>
      `;


      marker.bindPopup(popupContent);


      marker.on('click', () => {

        this.flightSelected.emit(flight);

      });


      marker.addTo(
        this.markersLayer
      );

    });
  }


  private displaySelectedFlight(): void {

    if (!this.selectedFlight) {

      this.clearRoute();

      return;
    }


    const flight =
      this.selectedFlight;


    const origin:
      L.LatLngExpression = [

        flight.originPosition.lat,
        flight.originPosition.lng

      ];


    const destination:
      L.LatLngExpression = [

        flight.destinationPosition.lat,
        flight.destinationPosition.lng

      ];


    const currentPosition:
      L.LatLngExpression = [

        flight.currentPosition.lat,
        flight.currentPosition.lng

      ];


    this.clearRoute();


    this.routeLine =
      L.polyline(
        [
          origin,
          currentPosition,
          destination
        ],
        {
          weight: 4,
          dashArray: '8, 8'
        }
      ).addTo(this.map);


    const routeBounds =
      L.latLngBounds([
        origin,
        currentPosition,
        destination
      ]);


    this.map.fitBounds(
      routeBounds,
      {
        padding: [50, 50]
      }
    );
  }


  private clearRoute(): void {

    if (this.routeLine) {

      this.map.removeLayer(
        this.routeLine
      );

      this.routeLine = undefined;
    }
  }
}