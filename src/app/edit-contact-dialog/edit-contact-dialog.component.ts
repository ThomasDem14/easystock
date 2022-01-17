import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ContactObject } from '../share-sell/share-sell.component';

@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.scss']
})
export class EditContactDialogComponent implements OnInit {
  
  public itemForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public contactObject: ContactObject,
  ) { }

  ngOnInit(): void {
    this.itemForm = this._formBuilder.group({
      firstNameControl: new FormControl(this.contactObject.firstName, [Validators.required,]),
      lastNameControl: new FormControl(this.contactObject.lastName, [Validators.required,]),
      emailControl: new FormControl(this.contactObject.email, [Validators.required, Validators.email,]),
      phoneControl: new FormControl(this.contactObject.phone, [Validators.required,]),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onInsert(): void {
    this.contactObject.firstName = this.itemForm.get('firstNameControl')?.value;
    this.contactObject.lastName = this.itemForm.get('lastNameControl')?.value;
    this.contactObject.email = this.itemForm.get('emailControl')?.value;
    this.contactObject.phone = this.itemForm.get('phoneControl')?.value;
    this.dialogRef.close();
  }


  getFirstNameErrorMessage() {
    if (this.itemForm.get('firstNameControl')?.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }
  getLastNameErrorMessage() {
    if (this.itemForm.get('lastNameControl')?.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }
  getEmailErrorMessage() {
    if (this.itemForm.get('emailControl')?.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.itemForm.get('emailControl')?.hasError('email')) {
      return 'This is not a valid email address';
    }
    return '';
  }
  getPhoneErrorMessage() {
    if (this.itemForm.get('phoneControl')?.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

}
