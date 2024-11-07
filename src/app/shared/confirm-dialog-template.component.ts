import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-template',
  template: `<h1 mat-dialog-title>Leaving {{data.caller}}</h1>
    <div mat-dialog-content> Confirm ?</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close [mat-dialog-close]="false" cdkFocusInitial>Stay</button>
      <button mat-button mat-dialog-close [mat-dialog-close]="true">Leave</button>
</div>`
})

export class confirmDialogTemplateComponent implements OnInit
{
  //private dialogRef = inject(MatDialogRef<confirmDialogTemplateComponent>);
  data: ConfirmDialogData = inject(MAT_DIALOG_DATA);

  constructor() { }
  ngOnInit()
  {
  }
}
export interface ConfirmDialogData
{
  caller: string;
}