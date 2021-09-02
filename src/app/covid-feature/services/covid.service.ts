import { CovidDataHistorical, Case } from './../models/covid.model';
import { map } from 'rxjs/operators';
import { CovidData } from '../../covid-feature/models/covid.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CovidService {
  constructor(private http: HttpClient) {}

  getCurrentDataVN(): Observable<CovidData> {
    return this.http.get<CovidData>(
      'https://disease.sh/v3/covid-19/countries/vn'
    );
  }

  getCurrentDataWorld() {
    return this.http.get<CovidData>('https://disease.sh/v3/covid-19/all');
  }

  getHistoricalData(): Observable<CovidDataHistorical> {
    return this.http
      .get<any>('https://api.zingnews.vn/public/v2/corona/getChart')
      .pipe(map((res) => res['data']['vn'] as CovidDataHistorical));
  }
}
