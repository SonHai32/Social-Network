import { CovidNews } from './../../models/covid-news.model';
import { CovidNewsService } from './../../services/covid-news.service';
import { CovidData, CovidDataHistorical } from './../../models/covid.model';
import { Observable, Subscription } from 'rxjs';
import {
  Component,
  OnInit,
} from '@angular/core';
import { CovidService } from '../../services/covid.service';
import {
  fadeInDownOnEnterAnimation,
  fadeInUpOnEnterAnimation,
} from 'angular-animations';
import { EChartsOption } from 'echarts';
@Component({
  selector: 'covid-feature-home',
  templateUrl: './home-covid.component.html',
  styleUrls: ['./home-covid.component.scss'],
  animations: [
    fadeInDownOnEnterAnimation({ anchor: 'fadeInDown' }),
    fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' }),
  ],
})
export class HomeCovidComponent implements OnInit {
  currentCovidData!: Observable<CovidData>;
  currentDate!: number;
  subscription: Subscription = new Subscription();
  historicalCovidData!: CovidDataHistorical;
  covidCurrentDataOption: 'VN' | 'WORLD' = 'VN';
  covidNewsData!: Observable<CovidNews[]>;

  options: EChartsOption = {};
  constructor(private covidService: CovidService, private covidNewsService: CovidNewsService) {}

  ngOnInit(): void {
    this.covidNewsData =  this.covidNewsService.getNews()
    this.getCurrentCovidData();
    this.currentDate = Date.now();
    this.subscription.add(
      this.covidService
        .getHistoricalData()
        .subscribe((val: CovidDataHistorical) => {
          if (val) {
            this.historicalCovidData = val;
            this.initialChartOption();
          }
        })
    );
  }

  toggleCurrentCovidData(key: 'VN' | 'WORLD') {
    this.covidCurrentDataOption = key;
    this.getCurrentCovidData();
  }

  getCurrentCovidData() {
    if (this.covidCurrentDataOption === 'VN') {
      this.currentCovidData = this.covidService.getCurrentDataVN();
    } else {
      this.currentCovidData = this.covidService.getCurrentDataWorld();
    }
  }

  initialChartOption() {
    if (this.historicalCovidData) {
      this.options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: ['Trường hợp', 'Đã khỏi bệnh', 'Tử vong'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [...this.historicalCovidData.cases.map((val) => val.x)],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: 'Tử vong',
            type: 'line',
            stack: 'counts',
            data: [...this.historicalCovidData.deaths.map((val) => val.y)],
            color: '#000000',
            areaStyle: { color: '#000000' },
          },

          {
            name: 'Đã khỏi bệnh',
            type: 'line',
            stack: 'counts',
            data: [...this.historicalCovidData.recovered.map((val) => val.y)],
            color: '#a0d911',
            areaStyle: { color: '#a0d911' },
          },
          {
            name: 'Trường hợp',
            type: 'line',
            stack: 'counts',
            data: [...this.historicalCovidData.cases.map((val) => val.y)],
            label: {
              position: 'top',
              show: true,
            },
            color: '#f5222d',
            areaStyle: { color: '#f5222d' },
          },
        ],
      };
    }
  }
}
