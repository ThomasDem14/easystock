import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShareSellComponent } from '../share-sell/share-sell.component';

@Component({
  selector: 'app-insert-contact-dialog',
  templateUrl: './insert-contact-dialog.component.html',
  styleUrls: ['./insert-contact-dialog.component.scss']
})
export class InsertContactDialogComponent implements OnInit {

  public itemForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<InsertContactDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public shareComponent: ShareSellComponent,
  ) {}


  ngOnInit(): void {
    this.itemForm = this._formBuilder.group({
      firstNameControl: new FormControl('', [Validators.required,]),
      lastNameControl: new FormControl('', [Validators.required,]),
      emailControl: new FormControl('', [Validators.required, Validators.email,]),
      phoneControl: new FormControl('', [Validators.required,]),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onInsert(): void {
    let firstName: string = this.itemForm.get('firstNameControl')?.value;
    let lastName: string = this.itemForm.get('lastNameControl')?.value;
    let email: string = this.itemForm.get('emailControl')?.value;
    let phone: string = this.itemForm.get('phoneControl')?.value;

    this.shareComponent.push({firstName: firstName, lastName: lastName, email: email, phone: phone});

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
