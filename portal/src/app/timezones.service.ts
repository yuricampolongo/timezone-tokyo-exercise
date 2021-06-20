import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { TimezoneInfo } from './home/timezone-info';

@Injectable({
  providedIn: 'root'
})
export class TimezonesService {

  constructor(private http: HttpClient) { }

  getSavedTimezones(city: string): Observable<TimezoneInfo> {
    return this.http.get<TimezoneInfo>("/timezone/" + city)
      .pipe(catchError(_ => {
        return of(null)
      }))
  }
}
