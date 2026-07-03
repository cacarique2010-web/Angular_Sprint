import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { VehicleService } from '../services/vehicle.service';
import { AuthService } from '../services/auth.service';
import { Veiculo } from '../models/veiculo.model';
import { VehicleData } from '../models/vehicle-data.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  // --- Passo 8: busca de modelo de veículo ---
  modelSearchTerm = '';
  modelResults: Veiculo[] = [];
  selectedVehicle: Veiculo | null = null;
  private modelSearch$ = new Subject<string>();

  // --- Passo 11: tabela / busca por VIN ---
  vinSearchTerm = '';
  vehicleDataResults: VehicleData[] = [];
  private vinSearch$ = new Subject<string>();

  private subscriptions = new Subscription();

  constructor(
    private vehicleService: VehicleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // fluxo reativo de busca de modelos (map, filter, debounceTime, distinctUntilChanged)
    const modelSub = this.modelSearch$
      .pipe(
        map(term => term.trim()),
        filter(term => term.length >= 0),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => this.vehicleService.searchVehicles(term))
      )
      .subscribe(vehicles => (this.modelResults = vehicles));

    // fluxo reativo de busca por VIN na tabela
    const vinSub = this.vinSearch$
      .pipe(
        map(term => term.trim()),
        filter(term => term.length >= 0),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => this.vehicleService.searchVehicleData(term))
      )
      .subscribe(data => (this.vehicleDataResults = data));

    this.subscriptions.add(modelSub);
    this.subscriptions.add(vinSub);

    this.modelSearch$.next('');
    this.vinSearch$.next('');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onModelSearchChange(term: string): void {
    this.modelSearch$.next(term);
  }

  onVinSearchChange(term: string): void {
    this.vinSearch$.next(term);
  }

  selectVehicle(vehicle: Veiculo): void {
    this.selectedVehicle = vehicle;
    this.modelSearchTerm = vehicle.vehicle;
    this.modelResults = [];
  }

  getVehicleImage(model: string): string {
    return this.vehicleService.getVehicleImage(model);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
