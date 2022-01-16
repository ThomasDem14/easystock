import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Moment } from 'moment';
import { InsertDialogComponent } from '../insert-dialog/insert-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import * as moment from 'moment';

export interface StockObject {
  name: string;
  quantity: number;
  status: string;
  date: Moment;
}

const ELEMENT_SCHEMA: { [key: string]: string } = {
  "name": "text",
  "quantity": "number",
  "status": "text",
  "date": "text",
  "isEdit": "isEdit"
};

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss']
})

export class TableComponent implements AfterViewInit  {

  public statusList = [
    "IN", "SOLD", "SHARED",
  ];

  data: StockObject[] = [
    {name:'Headphone', quantity:1, status: 'IN', date:moment("06/01/2022", "DD/MM/YYYY")},
    {name:'Table', quantity:1, status: 'IN', date:moment("09/01/2022", "DD/MM/YYYY")},
    {name:'Chairs', quantity:4, status: 'SHARED', date:moment("26/12/2021", "DD/MM/YYYY")},
    {name:'Laser', quantity:2, status: 'SHARED', date:moment("30/12/2021", "DD/MM/YYYY")},
    {name:'Camera', quantity:1, status: 'SOLD', date:moment("15/01/2022", "DD/MM/YYYY")},
    {name:'PS4', quantity:1, status: 'IN', date:moment("03/01/2022", "DD/MM/YYYY")},
    {name:'Ping-pong table', quantity:1, status: 'IN', date:moment("04/01/2022", "DD/MM/YYYY")},
    {name:'DJ platines', quantity:1, status: 'SOLD', date:moment("16/01/2022", "DD/MM/YYYY")},
    {name:'Fridge', quantity:1, status: 'IN', date:moment("16/01/2022", "DD/MM/YYYY")},
    {name:'Sofa', quantity:1, status: 'SHARED', date:moment("06/01/2022", "DD/MM/YYYY")},
  ];
  dataSource = new MatTableDataSource<StockObject>(this.data);
  filter: string;

  displayedColumns: string[] = ['name', 'quantity', 'status', 'date', 'isEdit'];
  dataSchema = ELEMENT_SCHEMA;

  constructor(public dialog: MatDialog,
    public editDialog: MatDialog) { }

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

  openEditDialog(element: StockObject): void {
    const dialogRef = this.editDialog.open(EditDialogComponent, {
      width: 'auto',
      data: {
        statusList: this.statusList,
        element: element,
      },
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

