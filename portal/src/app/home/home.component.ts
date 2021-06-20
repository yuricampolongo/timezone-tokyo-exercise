import { Component, OnInit } from '@angular/core';
import { TimezonesService } from '../timezones.service';
import { TimezoneInfo } from './timezone-info';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  timezones: TimezoneInfo[] = [];
  savedTimezones: TimezoneInfo[] = [];

  //update times
  source = interval(1000);
  subscription!: Subscription;

  constructor(private timezoneService: TimezonesService) { }

  async ngOnInit() {
    let currentOffset = -11;
    for (let i = 0; i < 24; i++) {
      let timezoneInfo = { gmt_offset: currentOffset++, name: "" }
      this.timezones.push(timezoneInfo);
    }
    await this.getSavedTimezones();
    this.updateTimes();
  }

  async getSavedTimezones() {
    let cities = [{ name: "tokyo", cardTopPosition: '43%'}]
    for (let city of cities) {
      let resp = await this.timezoneService.getSavedTimezones(city.name).toPromise();
      if (resp) {
        resp.cardTopPosition = city.cardTopPosition;
        this.savedTimezones.push(resp)
      }
    }
    let myTimezone = {
      currentTime: new Date(),
      cardTopPosition: '50%',
      name: "I'm here",
      gmt_offset: (new Date().getTimezoneOffset() / 60) * -1
    }
    this.savedTimezones.push(myTimezone)
  }

  getTimezoneColor(index: number) {
    if (index % 2 == 0) {
      return "#0000ff21"
    } else {
      return "#ffffff00"
    }
  }

  getTimezoneOffset(index: number) {
    return this.timezones[index].gmt_offset;
  }

  getSavedTimezone(offset: number) {
    let found = this.savedTimezones.filter(x => {
      return x.gmt_offset == offset
    });
    return found;
  }

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
