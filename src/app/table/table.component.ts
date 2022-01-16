import {FormControl, Validators, FormGroup} from '@angular/forms';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { InsertDialogComponent } from '../insert-dialog/insert-dialog.component';

export interface StockObject {
  name: string;
  quantity: number;
  status: string;
}

var data: StockObject[] = [
  {name:'Headphone', quantity:1, status: 'IN'},
  {name:'Table', quantity:1, status: 'IN'},
  {name:'Chairs', quantity:4, status: 'SHARED'},
  {name:'Laser', quantity:2, status: 'SHARED'},
  {name:'Camera', quantity:1, status: 'SOLD'},
  {name:'PS4', quantity:1, status: 'IN'},
  {name:'Ping-pong table', quantity:1, status: 'IN'},
  {name:'DJ platines', quantity:1, status: 'SOLD'},
  {name:'Fridge', quantity:1, status: 'IN'},
  {name:'Sofa', quantity:1, status: 'SHARED'},
];

const ELEMENT_SCHEMA: { [key: string]: string } = {
  "name": "text",
  "quantity": "number",
  "status": "text",
  "isEdit": "isEdit"
};


@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss']
})
export class TableComponent implements AfterViewInit  {

  public itemForm: FormGroup;
  data = [
      {"name":"Headphone", "quantity":1, "status": "IN"},
      {"name":"Table", "quantity":1, "status": "IN"},
      {"name":"Chairs", "quantity":4, "status": "SHARED"},
      {"name":"Laser", "quantity":2, "status": "SHARED"},
      {"name":"Camera", "quantity":1, "status": "SOLD"},
      {"name":"PS4", "quantity":1, "status": "IN"},
      {"name":"Ping-pong table", "quantity":1, "status": "IN"},
      {"name":"DJ platines", "quantity":1, "status": "SOLD"},
      {"name":"Fridge", "quantity":1, "status": "IN"},
      {"name":"Sofa", "quantity":1, "status": "SHARED"}
  ];
  dataSource = new MatTableDataSource<StockObject>(this.data);
  filter: string;

  displayedColumns: string[] = ['name', 'quantity', 'status', 'isEdit'];
  dataSchema = ELEMENT_SCHEMA;

  constructor(public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  quantityControl = new FormControl('', [Validators.required, Validators.min(1)]);
  nameControl = new FormControl('', [Validators.required,])
  statusControl = new FormControl('', [Validators.required,])
  

  getQuantityErrorMessage() {
    if (this.quantityControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.quantityControl.hasError('min')) {
      return 'The quantity must be at least 1';
    }
    return '';
  }
  getNameErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }
  getStatusErrorMessage() {
    if (this.statusControl.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }
  
  push(object: StockObject) {
    this.data.push(object);
    this.resetDataSource(this.data);
  }

  resetDataSource(data: any) {
    this.dataSource = new MatTableDataSource<StockObject>(data);
    this.dataSource.sort = this.sort;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InsertDialogComponent, {
      width: 'auto',
      data: this,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  filterChanged(filterValue: string) {
    if (filterValue == "") {
      this.resetDataSource(this.data);
      return;
    }

    filterValue = filterValue.toLowerCase();
    let display = this.data.filter(s => {
      return s.name && s.name.toLowerCase().includes(filterValue);
    });
    this.resetDataSource(display);
  }
}

