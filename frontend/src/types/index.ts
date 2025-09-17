// frontend/src/types/index.ts
export interface User {
  id: number;
  email: string;
}

export interface Location {
  id: number;
  city: string;
  alerts: Record<string, any>;  // e.g., { rain: boolean, temp_threshold: number }
}

export interface WeatherData {
  temp: number;
  feels_like: number;
  description: string;
  humidity?: number;
  wind_speed?: number;
}

export interface UserCreate {
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export {};  // FIXED: Makes it a module under isolatedModules (TS strict mode in CRA)