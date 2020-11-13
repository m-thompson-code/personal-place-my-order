import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RestaurantComponent } from './restaurant.component';
import { ImageUrlPipe } from '../image-url.pipe';

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantComponent, ImageUrlPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render title in a h2 tag', () => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Restaurants');
  });

  it('should not show any restaurants markup if no restaurants', () => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.restaurant')).toBe(null);
  });

  it('should have two .restaurant divs',  <any>fakeAsync((): void => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    tick(501);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let restaurantDivs = compiled.getElementsByClassName('restaurant');
    let hoursDivs = compiled.getElementsByClassName('hours-price');
    expect(restaurantDivs.length).toEqual(2);
    expect(hoursDivs.length).toEqual(2);
  }));

  it('should display restaurant information',  <any>fakeAsync((): void => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    tick(501);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.restaurant h3').textContent).toContain('Poutine Palace');
  }));
});