import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  public itemForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.itemForm = this._formBuilder.group({
      quantityControl: new FormControl('', [Validators.required, Validators.min(1)]),
      nameControl: new FormControl('', [Validators.required,]),
      statusControl: new FormControl('', [Validators.required,]),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onInsert(): void {
    var title = this.itemForm.get('titleCtrl')?.value;
    var amount = this.itemForm.get('amountCtrl')?.value;
    console.log(amount + ' times ' + title);
    this.dialogRef.close();
  }


  getErrorMessage() {
    if (this.itemForm.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.itemForm.hasError('min')) {
      return 'The quantity must be at least 1';
    }
    return '';
  }

}
