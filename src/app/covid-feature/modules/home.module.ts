import { NzImageModule } from 'ng-zorro-antd/image';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { HomeCovidComponent } from './../components/home-covid/home-covid.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTimelineItemComponent } from 'ng-zorro-antd/timeline';


@NgModule({
  declarations: [HomeCovidComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzTypographyModule,
    NzStatisticModule,
    NzBadgeModule,
    NzIconModule,
    NzStepsModule,
    NzButtonModule,
    NzModalModule,
    NzTimelineModule,
    NzImageModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
  ],
})
export class HomeCovidModule {}
