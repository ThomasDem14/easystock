import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface StockObject {
  name: string;
  quantity: number;
  status: string;
}

const ELEMENT_DATA: StockObject[] = [
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

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss']
})
export class TableComponent implements AfterViewInit  {

  displayedColumns: string[] = ['name', 'quantity', 'status'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
}

