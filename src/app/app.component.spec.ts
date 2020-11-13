import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ImageUrlPipe } from './image-url.pipe';
import { RestaurantComponent } from './restaurant/restaurant.component';

describe('AppComponent', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule,
        AppRoutingModule,
      ],
      declarations: [
        AppComponent, HomeComponent, RestaurantComponent, ImageUrlPipe
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'personal-place-my-order'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('personal-place-my-order');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    // expect(compiled.querySelector('.content span').textContent).toContain('personal-place-my-order app is running!');
    expect(compiled.querySelector('h1').textContent).toContain('Place My Order App: Coming Soon!');
  });

  it('should render the HomeComponent with router navigates to "/" path', () => {
    const compiled = fixture.debugElement.nativeElement;
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('');
      expect(compiled.querySelector('pmo-home')).not.toBe(null);
    });
  });

  it('should render the RestaurantsComponent with router navigates to "/restaurants" path', () => {
    const compiled = fixture.debugElement.nativeElement;
    router.navigate(['restaurants']).then(() => {
      expect(location.path()).toBe('/restaurants');
      expect(compiled.querySelector('pmo-restaurant')).not.toBe(null);
    });
  });
});
