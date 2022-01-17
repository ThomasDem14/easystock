import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InsertDialogComponent } from '../insert-dialog/insert-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

export interface StockObject {
  name: string;
  quantity: number;
  status: string;
  date: string;
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
    {name:'Headphone', quantity:1, status: 'IN', date:"06/01/2022"},
    {name:'Table', quantity:1, status: 'IN', date:"09/01/2022"},
    {name:'Chairs', quantity:4, status: 'SHARED', date:"26/12/2021"},
    {name:'Laser', quantity:2, status: 'SHARED', date:"30/12/2021"},
    {name:'Camera', quantity:1, status: 'SOLD', date:"15/01/2022"},
    {name:'PS4', quantity:1, status: 'IN', date:"03/01/2022"},
    {name:'Ping-pong table', quantity:1, status: 'IN', date:"04/01/2022"},
    {name:'DJ platines', quantity:1, status: 'SOLD', date:"16/01/2022"},
    {name:'Fridge', quantity:1, status: 'IN',date: "16/01/2022"},
    {name:'Sofa', quantity:1, status: 'SHARED', date:"06/01/2022"},
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

