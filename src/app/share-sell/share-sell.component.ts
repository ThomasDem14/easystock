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
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';

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
  filteredOptionsContact: Observable<ContactObject[]>;
  
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
      contactCtrl: ["", [Validators.required]],
    });

    this.itemForm.get('titleCtrl')?.valueChanges.subscribe((value: string) => {
      this.step = 1;

      // Retrieve quantity from string value
      var regExp = /\(([^)]+)\)/;
      var matches = regExp.exec(value);
      this.max = parseInt(matches ? matches[1] : "1");
    });

    this.itemForm.get('statusCtrl')?.valueChanges.subscribe(() => {
      this.step = 2;
    });

    
    this.itemForm.get('contactCtrl')?.valueChanges.subscribe(() => {
      this.step = 3;
    });

    this.itemForm.get('amountCtrl')?.valueChanges.subscribe(() => {
      this.step = 4;
    });

    this.filteredOptions = this.itemForm.get('titleCtrl')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (this._filter(value) == undefined) {
          return this.data;
        } else {
          return this._filter(value);
        }
      }),
    );

    this.filteredOptionsContact = this.itemForm.get('contactCtrl')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        if(this._filterContact(value) == undefined) {
          return this.contacts;
        } else {
          return this._filterContact(value);
        }
      }),
    );
  }

  onReset() {
    this.itemForm.setValue({
      titleCtrl: "",
      amountCtrl: "",
      statusCtrl: "",
      contactCtrl: "",
      dateCtrl: null,
    });
    this.step = 0;
  }

  onSubmit() {
    let title: string = this.itemForm.get('titleCtrl')?.value;
    let amount: number = this.itemForm.get('amountCtrl')?.value;
    let status: string = this.itemForm.get('statusCtrl')?.value;
    let contact: string = this.itemForm.get('contactCtrl')?.value;
    let date: Moment = this.itemForm.get('dateCtrl')?.value;

    let regExp = /(.*) \([0-9]+\)/;
    var formatTitle = regExp.exec(title)![1];
    let formatStatus = status === "Sell" ? "Sold to " + contact : "Shared to " + contact;

    let newObject: StockObject = { name: formatTitle, quantity: amount, status: formatStatus, date: date };

    if (status === "Sell") {
      const index = this.data.findIndex(el => el.name === newObject.name)
      if (index > -1) {
        this.data.splice(index, 1);
      }
    } else {
      const index = this.data.findIndex(el => el.name === newObject.name)
      if (index > -1) {
        this.data[index].status = "Shared";
      }
    }
    this.history.push(newObject);
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

  private _filterContact(value: string): ContactObject[] {
    const filterValue = value.toLowerCase();
    return (this.contacts.filter(element => ((element.firstName.toLowerCase().includes(filterValue)) || (element.lastName.toLowerCase().includes(filterValue)))));
  }

  removeRow(element: ContactObject) {
    this.dialog.open(RemoveDialogComponent).afterClosed().subscribe(confirm => {
      if (confirm) {
        const index = this.contacts.findIndex(el => el === element)
        if (index > -1) {
          this.contacts.splice(index, 1);
        }
        this.resetDataSource(this.contacts);
      }
    });
  }
}
