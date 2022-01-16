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

