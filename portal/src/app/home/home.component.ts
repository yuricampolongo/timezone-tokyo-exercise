import { Component, OnInit } from '@angular/core';
import { TimezonesService } from '../timezones.service';
import { TimezoneInfo } from './timezone-info';
import { interval, Subscription } from 'rxjs';

/**
 * The main component that shows the map and all available timezones
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // keeps a list with all the 24 timezones, this list is always the same
  // and is only used to create the DOM components
  timezones: TimezoneInfo[] = [];
  // All saved timezones that are returned by the service, we also add the 
  // timezone based on user current browser timezone 
  savedTimezones: TimezoneInfo[] = [];

  // update cities times each second
  source = interval(1000);
  subscription!: Subscription;

  constructor(private timezoneService: TimezonesService) { }

  /**
   * Initialize the list of the 24 timezones and also requests
   * the timezones from the service that will be showed on screen
   */
  async ngOnInit() {
    // Creates the timezone list here, we begin at -11 and we finish on +12
    let currentOffset = -11;
    for (let i = 0; i < 24; i++) {
      let timezoneInfo = { gmt_offset: currentOffset++, name: "" }
      this.timezones.push(timezoneInfo);
    }
    // request all timezones from the service that will be showed on screen
    await this.getSavedTimezones();
    // starts the timer to update all timezones each second
    this.updateTimes();
  }

  /**
   * Requests from the service the timezones that will be show to the user
   * To add a new timezone, just add a new item on the cities list variable
   * At the end, we add the timezone from the user's browser
   */
  async getSavedTimezones() {
    // We create here the list of all the cities that will have the timezones exibited on screen
    let cities = [{ name: "tokyo", cardTopPosition: '43%'}]
    for (let city of cities) {
      let resp = await this.timezoneService.getSavedTimezones(city.name).toPromise();
      if (resp) {
        resp.cardTopPosition = city.cardTopPosition;
        this.savedTimezones.push(resp)
      }
    }
    // Here we create the browser's current timezone.
    let myTimezone = {
      currentTime: new Date(),
      cardTopPosition: '50%',
      name: "I'm here",
      gmt_offset: (new Date().getTimezoneOffset() / 60) * -1
    }
    this.savedTimezones.push(myTimezone)
  }

  /**
   * For even index, we return a light blue color
   * For odd numbers, we return a total transparent background color
   * 
   * We use this method to create the vertical strips for each timezone
   * in the map of the world
   * 
   * We begin the list of timezones as 0 index being -11
   * and 23 index being +12
   * @param index the number for the current timezone
   * @returns the color that must be exibited for this timezone
   */
  getTimezoneColor(index: number) {
    if (index % 2 == 0) {
      return "#0000ff21" // light blue with high alpha
    } else {
      return "#ffffff00" // total transparent background
    }
  }

  /**
   * Returns the timezone offset for the specified timezone
   * 
   * We begin the list of timezones as 0 index being -11
   * and 23 index being +12
   * @param index 
   * @returns 
   */
  getTimezoneOffset(index: number) {
    return this.timezones[index].gmt_offset;
  }

  /**
   * Get all the timezones that was returned from the server
   * for that current offset.
   * This method is used to create all the timezone cards that
   * are rendered on screen
   * @param offset GMT offset
   * @returns the list of all the timezones returned by the service
   *          for the specified offset
   */
  getSavedTimezone(offset: number) {
    let found = this.savedTimezones.filter(x => {
      return x.gmt_offset == offset
    });
    return found;
  }

  /**
   * Timer that is executed each second to update all the cities current time
   */
  updateTimes() {
    this.subscription = this.source.subscribe(_ => {
      this.savedTimezones.forEach(city => {
        let currentTime = new Date()
        let timeGmt0 = new Date(Date.now() + currentTime.getTimezoneOffset() * 60000)
        let timeInCity = new Date(timeGmt0.getTime() + city.gmt_offset * 60 * 60000)
        city.currentTime = timeInCity;
      })
    });
  }
}
