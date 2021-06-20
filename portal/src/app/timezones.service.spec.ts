import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TimezonesService } from './timezones.service';

describe('TimezonesService', () => {
  let service: TimezonesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpClientTestingModule]
    });
    service = TestBed.inject(TimezonesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tokyo information', () => {
    let expectedTimezone = {name:"Tokyo", gmt_offset:9}

    service.getSavedTimezones('tokyo').subscribe((resp) => {
      expect(resp.name).toEqual("Tokyo");
    });

    const req = httpMock.expectOne('/timezone/tokyo');
    req.flush(expectedTimezone);

    httpMock.verify(); 
  })

  it('should return tokyo information case insensitive', () => {
    let expectedTimezone = {name:"Tokyo", gmt_offset:9}

    service.getSavedTimezones('tOkYO').subscribe((resp) => {
      expect(resp.name).toEqual("Tokyo");
    });

    const req = httpMock.expectOne('/timezone/tOkYO');
    req.flush(expectedTimezone);

    httpMock.verify(); 
  })

  it('should not return invalid city', () => {
    let expectedTimezone = null;

    service.getSavedTimezones('SaoPaulo').subscribe((resp) => {
      expect(resp).toBe(null);
    });

    const req = httpMock.expectOne('/timezone/SaoPaulo');
    req.flush(expectedTimezone);

    httpMock.verify(); 
  })
  
});
