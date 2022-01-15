import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-insert-dialog',
  templateUrl: './insert-dialog.component.html',
  styleUrls: ['./insert-dialog.component.scss']
})
export class InsertDialogComponent implements OnInit {

  public itemForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<InsertDialogComponent>,
    private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.itemForm = this._formBuilder.group({
      titleCtrl: ["", [Validators.required]],
      amountCtrl: ["", [Validators.required]],
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
}
