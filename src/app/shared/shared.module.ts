import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MatButtonModule,
    MaterialModule,
  ],
  declarations: [],
  exports: [MaterialModule, FontAwesomeModule, HttpClientModule, FormsModule],
})
export class SharedModule {}
