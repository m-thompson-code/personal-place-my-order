import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Restaurant } from './restaurant';
import { ResponseData, RestaurantService } from './restaurant.service';

export interface Data {
  value: Restaurant[];
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

  public restaurants: Data = { value: [], isPending: false };

  public states = {
    isPending: false,
    value: [{name: "Illinois", short: "IL"}, {name: "Wisconsin", short: "WI"}]
  };

  public cities = {
    isPending: false,
    value: [{name: "Springfield"},{name: "Madison"}]
  }

  private _sub?: Subscription;
  private _sub2?: Subscription;
  constructor(private restaurantService: RestaurantService, 
    private fb: FormBuilder
  ) {
    
  }

  ngOnInit(): void {
    this.createForm();

    this._sub2 = this.form.valueChanges.subscribe((val) => {
      console.log(val);
    });

    this.restaurants.isPending = true;

    this.restaurantService.getRestaurants().subscribe((res: ResponseData) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });

    // this.states.isPending = true;

    // this.restaurantService.getStates().subscribe((res: ResponseData) => {
    //   this.states.value = res.data;
    //   this.states.isPending = false;
    // });
    
    // this.cities.isPending = true;

    // this.restaurantService.getCities().subscribe((res: ResponseData) => {
    //   this.cities.value = res.data;
    //   this.cities.isPending = false;
    // });
  }

  createForm() {
    this.form = this.fb.group({
      state: {value: '', disabled: false},
      city: {value: '', disabled: false},
    });
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
    this._sub2?.unsubscribe();
  }
}
