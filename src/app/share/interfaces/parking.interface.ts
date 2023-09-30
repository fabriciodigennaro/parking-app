export interface ParkingRequest {
    plate: string;
    city_id: string;
    parking_zone_id: string;
    expiration: string;
    email: string;
}

export interface ParkingResponse  {
    id: string;
    plate: string;
    city_id: string;
    parking_zone_id: string;
    expiration: string;
    email: string;
    }