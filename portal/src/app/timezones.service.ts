import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { TimezoneInfo } from './home/timezone-info';

/**
 * Controls the requests to the Timezone Service 
 */
@Injectable({
  providedIn: 'root'
})
export class TimezonesService {

  constructor(private http: HttpClient) { }

  /**
   * Request the city timezone information from the service
   * @param city the name of the city, must be the same in the service, case insensitive
   * @returns the observable for the request, a null observable will be sent if
   *          no city was found with the given name or if the service returns anything
   *          different from 200 ok
   */
  getSavedTimezones(city: string) {
    return this.http.get<TimezoneInfo>("/timezone/" + city)
      .pipe(catchError(_ => {
        return of(null)
      }))
  }
}
