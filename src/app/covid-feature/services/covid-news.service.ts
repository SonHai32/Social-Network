import { map } from 'rxjs/operators';
import { CovidNews } from './../models/covid-news.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CovidNewsService {
  constructor(private http: HttpClient) {}

  getNews() {
    return this.http
      .get<any>(
        'https://gw.vnexpress.net/ar/get_rule_2?category_id=1004765&limit=20&page=1&data_select=title,share_url,thumbnail_url,lead,publish_time'
      )
      .pipe(
        map((res: any) => res.data['1004765'].data as any[]),
        map((res) =>
          res.map((val) => {
            return {
              ...val,
              publish_time: new Date(val.publish_time * 1000),
            } as CovidNews;
          })
        )
      );
  }
}
