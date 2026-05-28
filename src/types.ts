/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Country {
  code: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
  countryCode: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Review {
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  rating: number;
  description: string;
  address: string;
  city: string;
  countryCode: string;
  coordinates: Coordinates;
  images: string[];
  amenities: string[];
  minPrice: number;
  category?: 'luxury' | 'budget' | 'trending' | 'special_offer' | 'most_booked';
  reviews?: Review[];
}

export interface RateQuery {
  hotelIds: string[];
  startDate: string;
  endDate: string;
  adults: number;
  children: number[];
  currency: string;
  guestNationality: string;
}

export interface CancellationPolicy {
  type: 'free_cancellation' | 'refundable' | 'non_refundable';
  deadline?: string;
  penaltyFee?: number;
}

export interface Rate {
  id: string;
  roomType: string;
  boardType: string;
  cancellationPolicy: CancellationPolicy;
  price: number;
  currency: string;
  available: boolean;
  rateId: string; // LiteAPI specific rate identifier
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelStars: number;
  hotelImage: string;
  hotelAddress: string;
  rateId: string;
  roomType: string;
  boardType: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  currency: string;
  status: 'confirmed' | 'cancelled';
  guestDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  createdAt: string;
}

export interface ApiLog {
  id: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'DELETE';
  timestamp: string;
  durationMs: number;
  statusCode: number;
  payload?: string;
  response?: string;
}
