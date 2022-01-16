import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-insert-dialog',
  templateUrl: './insert-dialog.component.html',
  styleUrls: ['./insert-dialog.component.scss']
})
export class InsertDialogComponent implements OnInit {

  public itemForm: FormGroup;

  public statusList = [
    "IN", "SOLD", "SHARED",
  ];

  constructor(
    public dialogRef: MatDialogRef<InsertDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public tableComponent: TableComponent,
  ) {}

  ngOnInit(): void {
    this.itemForm = this._formBuilder.group({
      titleCtrl: ["", [Validators.required]],
      amountCtrl: ["", [Validators.required, Validators.min(1)]],
      statusCtrl: ["", [Validators.required]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onInsert(): void {
    let title: string = this.itemForm.get('titleCtrl')?.value;
    let amount: number = this.itemForm.get('amountCtrl')?.value;
    let status: string = this.itemForm.get('statusCtrl')?.value;
    
    this.tableComponent.push({name:title, quantity:amount, status:status});

    this.dialogRef.close();
  }
}
