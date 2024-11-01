import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeModule } from '../home/home.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [CommonModule, SharedModule, HomeModule],
  declarations: [DashboardComponent],
})
export class FeaturesModule { }
