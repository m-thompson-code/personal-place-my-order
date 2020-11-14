import { Component, OnInit } from '@angular/core';
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
export class RestaurantComponent implements OnInit {
  public restaurants: Data = { value: [], isPending: false };

  private _sub?: Subscription;
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurants.isPending = true;

    this.restaurantService.getRestaurants().subscribe(responseData => {
      this.restaurants = {
        value: responseData.data,
        isPending: false,
      };
    });
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }
}
