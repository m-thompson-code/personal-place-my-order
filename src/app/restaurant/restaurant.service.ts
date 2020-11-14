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

  public getRestaurants(state?: string, city?: string): Observable<ResponseData<Restaurant>> {
    let params = new HttpParams();
    
    if (state) {
      params = params.set('filter[address.state]', state);
    }

    if (city) {
      params = params.set('filter[address.city]', city);
    }

    return this.httpClient.get<ResponseData<Restaurant>>(`${environment.apiUrl}/restaurants`, {params});
  }

  public getStates(): Observable<ResponseData<State>> {
    return this.httpClient.get<ResponseData<State>>(`${environment.apiUrl}/states`);
  }
  
  public getCities(stateAbbreviation: string): Observable<ResponseData<City>> {
    const params = new HttpParams().set('state', stateAbbreviation);

    return this.httpClient.get<ResponseData<City>>(`${environment.apiUrl}/cities`, {params});
  }
}
