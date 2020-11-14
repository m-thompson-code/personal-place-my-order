import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Restaurant } from './restaurant';

export interface ResponseData<T> {
  data: T[];
}

export interface State {
  name: string;
  short: string;
}

export interface City {
  name: string;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  public getRestaurants(): Observable<ResponseData<Restaurant>> {
    return this.httpClient.get<ResponseData<Restaurant>>(`${environment.apiUrl}/restaurants`);
  }

  public getStates(): Observable<ResponseData<State>> {
    return this.httpClient.get<ResponseData<State>>(`${environment.apiUrl}/states`);
  }
  
  public getCities(stateAbbreviation: string): Observable<ResponseData<City>> {
    const params = new HttpParams().set('state', stateAbbreviation);

    return this.httpClient.get<ResponseData<City>>(`${environment.apiUrl}/cities`, {params});
  }
}
