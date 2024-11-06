import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit
{
  // #region in/out
  @Input() user!: User;
  @Output() closeComponent = new EventEmitter<void>();
  // #endregion

  isEditMode: boolean = false;
  userForm!: FormGroup;

  constructor() { }

  ngOnInit()
  {
    this.userForm = new FormGroup({
      phone: new FormControl({ value: this.user.phone, disabled: !this.isEditMode }, Validators.required),
      street: new FormControl({ value: this.user.address.street, disabled: !this.isEditMode }),
      city: new FormControl({ value: this.user.address.city, disabled: !this.isEditMode }),
      zipcode: new FormControl({ value: this.user.address.zipcode, disabled: !this.isEditMode }),
      lat: new FormControl({ value: this.user.address.geolocation.lat, disabled: !this.isEditMode }),
      long: new FormControl({ value: this.user.address.geolocation.long, disabled: !this.isEditMode })
    });
  }

  close()
  {
    this.closeComponent.emit();
  }

  toggleEditMode()
  {
    this.isEditMode = !this.isEditMode;
  }
}
