import { TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { TitleStrategyManagerService } from './core/services/title-manager/title-strategy-manager.service';
import { FeaturesModule } from './features/features.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/header/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, SharedModule, AppRoutingModule, BrowserAnimationsModule, FeaturesModule],
  providers: [TitleCasePipe,
    {
      provide: TitleStrategy, useClass: TitleStrategyManagerService
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
