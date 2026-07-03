export interface VehicleData {
  id: number | string;
  vin: string;
  odometer: number | string;
  tirePressure: string;
  status: string;
  batteryStatus: string;
  fuelLevel: number | string;
  lat: number | string;
  long: number | string;
}

export interface VehicleDataAPI {
  vehicledata: VehicleData[];
}
