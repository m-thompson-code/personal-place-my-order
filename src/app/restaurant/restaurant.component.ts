import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Restaurant } from './restaurant';
import { City, ResponseData, RestaurantService, State } from './restaurant.service';

export interface Data<T> {
  value: T[];
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit, OnDestroy {
  // public form?: FormGroup;
  public form!: FormGroup; // Going to use this syntax to avoid having to update the specs to check for undefined

  public restaurants: Data<Restaurant> = { value: [], isPending: false };

  public states: Data<State> = { value: [], isPending: false };
  // public states = {
  //   isPending: false,
  //   value: [{name: "Illinois", short: "IL"}, {name: "Wisconsin", short: "WI"}]
  // };

  public cities: Data<City> = { value: [], isPending: false };
  //   isPending: false,
  //   value: [{name: "Springfield"},{name: "Madison"}]
  // }

  private _sub?: Subscription;
  private _sub2?: Subscription;
  private _sub3?: Subscription;
  private _sub4?: Subscription;
  private _sub5?: Subscription;

  constructor(private restaurantService: RestaurantService, 
    private fb: FormBuilder
  ) {
    
  }

  ngOnInit(): void {
    this.createForm();

    this.getStates();
  }

  createForm() {
    this.form = this.fb.group({
      state: {value: '', disabled: true},
      city: {value: '', disabled: true},
    });

    this.onChanges();
  }

  onChanges(): void {
    const state__formState = this.form.get('state');

    if (!state__formState) {
      throw new Error("Unexpected missing state form_state");
    }

    const stateChanges = state__formState.valueChanges.subscribe(val => {
      console.log('state', val);

      this.cities.isPending = true;
      this.cities.value = [];

      this.form.get('city')?.patchValue('');

      if (val) {
        this.getCities(val);
      } else {
        this.cities = { value: [], isPending: false };
      }
    });

    this._sub2 = stateChanges;

    const city__formState = this.form.get('city');

    if (!city__formState) {
      throw new Error("Unexpected missing city form_state");
    }

    const cityChanges = city__formState.valueChanges.subscribe(val => {
      console.log('city', val);

      if (val) {
        this.getRestaurants();
      } else {
        this.restaurants = { value: [], isPending: false };
      }
    });

    this._sub3 = cityChanges;
  }

  getStates() {
    this._sub4?.unsubscribe();

    this._sub4 = this.restaurantService.getStates().subscribe((res: ResponseData<State>) => {
      this.form.get('state')?.enable();

      this.states.value = res.data;
      this.states.isPending = false;
    });
  }

  getCities(stateAbbrivation: string) {
    this._sub5?.unsubscribe();

    this._sub5 = this.restaurantService.getCities(stateAbbrivation).subscribe((res: ResponseData<City>) => {
      this.form.get('city')?.enable();

      this.cities.value = res.data;
      this.cities.isPending = false;
    });
  }

  getRestaurants() {
    this.restaurants.isPending = true;
    this.restaurants.value = [];

    this._sub?.unsubscribe();

    this._sub = this.restaurantService.getRestaurants().subscribe((res: ResponseData<Restaurant>) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
    this._sub2?.unsubscribe();
    this._sub3?.unsubscribe();
    this._sub4?.unsubscribe();
    this._sub5?.unsubscribe();
  }
}
