import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpRequestInterceptorMock } from '../HttpRequestInterceptorMock';
import { TimezonesService } from '../timezones.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpRequestInterceptorMock,
          multi: true
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await component.ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have timezones list created', () => {
    expect(component.timezones.length).toEqual(24);
    expect(component.timezones[component.timezones.length-1].gmt_offset).toEqual(12);
    expect(component.timezones[0].gmt_offset).toEqual(-11);
  });

  it('should have tokyo in timezones saved list', async () => {
    expect(component.savedTimezones.length).toEqual(2);
    expect(component.savedTimezones[0].name).toEqual('Tokyo')
  });

  it(`should have i'm here in timezones saved list`, async () => {
    expect(component.savedTimezones.length).toEqual(2);
    expect(component.savedTimezones[1].name).toEqual(`I'm here`)
  });

  it(`should return diferent colors for even and odd numbers`, async () => {
    expect(component.getTimezoneColor(0)).toEqual("#0000ff21");
    expect(component.getTimezoneColor(1)).toEqual("#ffffff00");
  });

  it(`should return correct timezone offset for Tokyo`, async () => {
    expect(component.getTimezoneOffset(20)).toEqual(9);
  });

  it(`should return correct timezone for tokyo based on offset`, async () => {
    expect(component.getSavedTimezone(9)[0].gmt_offset).toEqual(9);
  });

  it(`tokyo card information must be place on +9 timezone vertical line`, async () => {
    fixture.detectChanges()
    let timezone9 = fixture.debugElement.nativeElement.querySelector('#timezone-9')
    expect(timezone9.getElementsByClassName('card-body')[0].innerText.trim()).toEqual("Tokyo")
  });

  it(`must have at least two timezone card information`, async () => {
    fixture.detectChanges()
    let timezone9 = fixture.debugElement.nativeElement.querySelector('.container-fluid')
    expect(timezone9.getElementsByClassName('card-body').length).toEqual(2)
  });
});
