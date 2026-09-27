export type FlightStatus =
  | 'Active'
  | 'Delayed'
  | 'Arrived'
  | 'Scheduled';

export interface FlightPosition {
  lat: number;
  lng: number;
}

export interface Flight {
  id: number;
  flightNumber: string;
  callsign: string;
  aircraftType: string;

  origin: string;
  originName: string;

  destination: string;
  destinationName: string;

  status: FlightStatus;

  departureTime: string;
  arrivalTime: string;

  currentPosition: FlightPosition;
  originPosition: FlightPosition;
  destinationPosition: FlightPosition;
}