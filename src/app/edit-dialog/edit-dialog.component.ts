import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StockObject, TableComponent } from '../table/table.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DataObject {
  statusList: string[];
  element: StockObject;
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: 'edit-dialog.component.html',
  styleUrls: ['edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  public itemForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dataObject: DataObject,
  ) { }

  ngOnInit(): void {
    this.itemForm = this._formBuilder.group({
      quantityControl: new FormControl(this.dataObject.element.quantity, [Validators.required, Validators.min(1)]),
      nameControl: new FormControl(this.dataObject.element.name, [Validators.required,]),
      statusControl: new FormControl(this.dataObject.element.status, [Validators.required,]),
      dateControl: new FormControl(this.dataObject.element.date, [Validators.required,]),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onInsert(): void {
    this.dataObject.element.name = this.itemForm.get('nameControl')?.value;
    this.dataObject.element.quantity = this.itemForm.get('quantityControl')?.value;
    this.dataObject.element.status = this.itemForm.get('statusControl')?.value;
    this.dataObject.element.date = this.itemForm.get('dateControl')?.value;
    this.dialogRef.close();
  }


  getQuantityErrorMessage() {
    if (this.itemForm.get('quantityControl')?.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.itemForm.get('quantityControl')?.hasError('min')) {
      return 'The quantity must be at least 1';
    }
    return '';
  }
  getNameErrorMessage() {
    if (this.itemForm.get('nameControl')?.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }
  getStatusErrorMessage() {
    if (this.itemForm.get('statusControl')?.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }
  getDateErrorMessage() {
    if (this.itemForm.get('dateControl')?.hasError('required')) {
      return 'You must enter a date';
    }
    return '';
  }

}
