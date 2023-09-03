export interface ParkingZonesResponse {
    parking_zones: Zone[],
}

export interface Zone {
id: number,
name: string,
}