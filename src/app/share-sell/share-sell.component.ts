import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StockObject } from '../table/table.component';
import { Moment } from 'moment';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditContactDialogComponent } from '../edit-contact-dialog/edit-contact-dialog.component';
import { InsertContactDialogComponent } from '../insert-contact-dialog/insert-contact-dialog.component';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { Console } from 'console';

const ELEMENT_SCHEMA: { [key: string]: string } = {
  "firstName": "text",
  "lastName": "text",
  "email": "text",
  "phone": "text",
  "isEdit": "isEdit"
};

export interface ContactObject {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-share-sell',
  templateUrl: './share-sell.component.html',
  styleUrls: ['./share-sell.component.scss']
})

export class ShareSellComponent implements OnInit {
  dataSource: MatTableDataSource<ContactObject>;

  filter: string;

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'isEdit'];
  dataSchema = ELEMENT_SCHEMA;

  public itemForm: FormGroup;
  filteredOptions: Observable<StockObject[]>;
  
  @Input() data: StockObject[];
  @Input() contacts: ContactObject[];
  @Input() history: any[];
  @ViewChild(MatSort) sort: MatSort;

  step: number = 0;
  max: number = 0;

  public statusList = [
    "Sell", "Share",
  ];

  constructor(private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public editDialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ContactObject>(this.contacts);

    this.itemForm = this._formBuilder.group({
      titleCtrl: ["", [Validators.required]],
      amountCtrl: ["", [Validators.required]],
      statusCtrl: ["", [Validators.required]],
      dateCtrl: ["", [Validators.required]],
    });

    this.itemForm.get('titleCtrl')?.valueChanges.subscribe((value: string) => {
      this.step = 1;

      // Retrieve quantity from string value
      var regExp = /\(([^)]+)\)/;
      var matches = regExp.exec(value);
      this.max = parseInt(matches ? matches[1] : "0");
    });

    this.itemForm.get('statusCtrl')?.valueChanges.subscribe(() => {
      this.step = 2;
    });

    this.itemForm.get('amountCtrl')?.valueChanges.subscribe(() => {
      this.step = 3;
    });

    this.filteredOptions = this.itemForm.get('titleCtrl')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        if(this._filter(value) == undefined) {
          return this.data;
        } else {
          return this._filter(value);
        }
      }),
    );
  }

  onReset() {
    this.itemForm.reset();
    this.step = 0;
  }

  onSubmit() {
    let title: StockObject = this.itemForm.get('titleCtrl')?.value;
    console.log(title);
    let amount: number = this.itemForm.get('amountCtrl')?.value;
    let status: string = this.itemForm.get('statusCtrl')?.value;
    let date: Moment = this.itemForm.get('dateCtrl')?.value;
    
    this.history.push({name:title.name, quantity:amount, status:status, date:date.format("DD/MM/YYYY")});
    this.onReset();
  }
  
  filterChanged(filterValue: string) {
    if (filterValue == "") {
      this.resetDataSource(this.contacts);
      return;
    }

    filterValue = filterValue.toLowerCase();
    let display = this.contacts.filter(s => {
      return (s.firstName && s.firstName.toLowerCase().includes(filterValue)) || (s.lastName && s.lastName.toLowerCase().includes(filterValue))
      || (s.email && s.email.toLowerCase().includes(filterValue));
    });
    this.resetDataSource(display);
  }

  resetDataSource(data: any) {
    this.dataSource = new MatTableDataSource<ContactObject>(data);
    this.dataSource.sort = this.sort;
  }

  push(object: ContactObject) {
    this.contacts.push(object);
    this.resetDataSource(this.contacts);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InsertContactDialogComponent, {
      width: 'auto',
      data: this,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openEditDialog(element: ContactObject): void {
    const dialogRef = this.editDialog.open(EditContactDialogComponent, {
      width: 'auto',
      data: element
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  private _filter(value: string): StockObject[] {
    const filterValue = value.toLowerCase();
    return (this.data.filter(element => element.name.toLowerCase().includes(filterValue)));
  }
}
