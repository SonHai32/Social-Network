import { CovidDataHistorical, Case } from './../models/covid.model';
import { map } from 'rxjs/operators';
import { CovidData } from '../../covid-feature/models/covid.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CovidPredictionService {
  constructor(private http: HttpClient) {}

  getPrediction(data: number[]){

  }
}
