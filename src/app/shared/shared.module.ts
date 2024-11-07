import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruncatePipe } from '../core/pipes/truncate.pipe';
import { confirmDialogTemplateComponent } from './confirm-dialog-template.component';
import { MyFontawesomeModule } from './fontawesome/fontawesome.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    MyFontawesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [TruncatePipe, confirmDialogTemplateComponent],
  exports: [FontAwesomeModule, HttpClientModule, FormsModule, ReactiveFormsModule, MaterialModule, MyFontawesomeModule, TruncatePipe],
})
export class SharedModule { }
