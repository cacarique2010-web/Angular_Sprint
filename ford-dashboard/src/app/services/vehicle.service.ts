import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Veiculo, VeiculosAPI } from '../models/veiculo.model';
import { VehicleData, VehicleDataAPI } from '../models/vehicle-data.model';

// mapeia o nome do modelo para a imagem correspondente em assets/vehicles
const VEHICLE_IMAGES: Record<string, string> = {
  Ranger: 'assets/vehicles/ranger.png',
  Mustang: 'assets/vehicles/mustang.png',
  Territory: 'assets/vehicles/territory.png',
  'Bronco Sport': 'assets/vehicles/bronco-sport.png'
};

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private readonly apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getVehicleImage(model: string): string {
    return VEHICLE_IMAGES[model] ?? 'assets/ford-logo.png';
  }

  getVehicles(): Observable<Veiculo[]> {
    return this.http
      .get<VeiculosAPI>(`${this.apiUrl}/vehicles`)
      .pipe(
        map(res => res.vehicles ?? []),
        catchError(() => of([]))
      );
  }

  searchVehicles(term: string): Observable<Veiculo[]> {
    const query = term ? `?vehicle=${term}` : '';
    return this.http
      .get<VeiculosAPI>(`${this.apiUrl}/vehicles${query}`)
      .pipe(
        map(res => res.vehicles ?? []),
        catchError(() => of([]))
      );
  }

  searchVehicleData(vin: string): Observable<VehicleData[]> {
    const query = vin ? `?vin=${vin}` : '';
    return this.http
      .get<VehicleDataAPI>(`${this.apiUrl}/vehicledata${query}`)
      .pipe(
        map(res => res.vehicledata ?? []),
        catchError(() => of([]))
      );
  }
}
