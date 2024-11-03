import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruncatePipe } from '../core/pipes/truncate.pipe';
import { MyFontawesomeModule } from './fontawesome/fontawesome.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    MyFontawesomeModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [TruncatePipe],
  exports: [FontAwesomeModule, HttpClientModule, FormsModule, MaterialModule, MyFontawesomeModule, TruncatePipe],
})
export class SharedModule { }
