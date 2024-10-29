import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [],
  exports: [FontAwesomeModule, HttpClientModule, FormsModule, MaterialModule],
})
export class SharedModule { }
