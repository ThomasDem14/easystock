import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

export class TableComponent implements OnInit {

  public statusList = [
    "IN", "SOLD", "SHARED",
  ];

  @Input() data: any[];
  @Input() history: any[];

  dataSource: MatTableDataSource<StockObject>;

  filter: string;

  displayedColumns: string[] = ['name', 'quantity', 'status', 'date', 'isEdit'];
  dataSchema = ELEMENT_SCHEMA;

  constructor(public dialog: MatDialog,
    public editDialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<StockObject>(this.data);
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  push(object: StockObject) {
    this.data.push(object);
    this.history.push(object);
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

