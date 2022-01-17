import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditContactDialogComponent } from '../edit-contact-dialog/edit-contact-dialog.component';
import { DataObject } from '../edit-dialog/edit-dialog.component';
import { InsertContactDialogComponent } from '../insert-contact-dialog/insert-contact-dialog.component';
import { StockObject } from '../table/table.component';

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

  @Input() data: StockObject[];
  @Input() contacts: ContactObject[];
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<ContactObject>;

  filter: string;

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'isEdit'];
  dataSchema = ELEMENT_SCHEMA;

  constructor(public dialog: MatDialog,
    public editDialog: MatDialog) { 
  }
  
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ContactObject>(this.contacts);
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
}
