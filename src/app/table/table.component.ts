import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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

  displayedColumns: string[] = ['name', 'quantity', 'status', 'isEdit'];
  dataSource = new MatTableDataSource(data);
  dataSchema = ELEMENT_SCHEMA;

  constructor() {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
}

