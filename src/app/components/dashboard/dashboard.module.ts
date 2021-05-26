import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {AppDashboardComponent} from './app-dashboard/app-dashboard.component';
import {FormsModule} from '@angular/forms';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartistModule} from 'ng-chartist';
import {ChartsModule} from 'ng2-charts';
import {CountToModule} from 'angular-count-to';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [AppDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    ChartistModule,
    ChartsModule,
    CountToModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    SharedModule,
    NgxDatatableModule,
    MatIconModule,
    MatListModule
  ]
})

export class DashboardModule { }
