import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StockObject } from '../table/table.component';

const ELEMENT_SCHEMA: { [key: string]: string } = {
  "name": "text",
  "quantity": "number",
  "status": "text",
  "date": "text",
  "isEdit": "isEdit"
};

@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrls: ['./table-history.component.scss']
})
export class TableHistoryComponent implements OnInit {

  @Input() data: any[];
  dataSource: MatTableDataSource<StockObject>;

  filter: string;

  displayedColumns: string[] = ['date', 'name', 'quantity', 'status', 'isEdit'];
  dataSchema = ELEMENT_SCHEMA;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<StockObject>(this.data);
  }

  @ViewChild(MatSort) sort: MatSort;

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



  resetDataSource(data: any) {
    this.dataSource = new MatTableDataSource<StockObject>(data);
    this.dataSource.sort = this.sort;
  }

}
