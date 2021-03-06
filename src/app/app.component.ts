import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ContactObject } from './share-sell/share-sell.component';
import { StockObject } from './table/table.component';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  data: StockObject[] = [
  ];

  history: StockObject[] = [
  ];

  contacts: ContactObject[] = [
  ];

  homeColor: string = "#00bf71";
  historyColor: string = "#43557b";
  profileColor: string = "#43557b";
  shareColor: string = "#43557b";

  title = 'easystock';
  isShowing: boolean = true;

  content: string = 'home';
  constructor() {}
  ngOnInit(): void {
    let credentials = localStorage.getItem('credentials');
    if(credentials != null) {
      this.data.push(...[
        { name: 'Headphone', quantity: 1, status: 'In stock', date: moment("30/12/2021", "DD/MM/YYYY") },
        { name: 'Table', quantity: 1, status: 'In stock', date: moment("06/01/2022", "DD/MM/YYYY") },
        { name: 'Chairs', quantity: 4, status: 'Shared', date: moment("08/01/2022", "DD/MM/YYYY") },
        { name: 'Phone', quantity: 2, status: 'In stock', date: moment("19/01/2022", "DD/MM/YYYY") },
      ]);

      this.history.push(...[
        { name: 'Headphone', quantity: 1, status: 'In stock', date: moment("30/12/2021", "DD/MM/YYYY") },
        { name: 'Table', quantity: 1, status: 'In stock', date: moment("06/01/2022", "DD/MM/YYYY") },
        { name: 'Chairs', quantity: 4, status: 'In stock', date: moment("06/01/2022", "DD/MM/YYYY") },
        { name: 'Chairs', quantity: 4, status: 'Shared to Guillaume Lodrini', date: moment("08/01/2022", "DD/MM/YYYY") },
        { name: 'Phone', quantity: 2, status: 'In stock', date: moment("06/01/2022", "DD/MM/YYYY") },
        { name: 'Phone', quantity: 2, status: 'Shared to Thomas Demoulin', date: moment("09/01/2022", "DD/MM/YYYY") },
        { name: 'Phone', quantity: 2, status: 'In stock', date: moment("19/01/2022", "DD/MM/YYYY") },
        { name: 'Computer', quantity: 1, status: 'In stock', date: moment("10/01/2022", "DD/MM/YYYY") },
        { name: 'Computer', quantity: 1, status: 'Sold to Vincent Labarre', date: moment("13/01/2022", "DD/MM/YYYY") },
      ]);

      this.contacts.push(...[
        { firstName: 'John', lastName: 'Smith', email: 'john@email.com', phone: '+33496854047' },
        { firstName: 'Francois', lastName: 'Thompson', email: 'francois@email.com', phone: '+33496875341' },
        { firstName: 'Tom', lastName: 'Dupont', email: 'tom@email.com', phone: '+33451258475' },
        { firstName: 'Romain', lastName: 'Tartanpiau', email: 'romain@email.com', phone: '+33493541873' },
        { firstName: 'Alexandre', lastName: 'Legrand', email: 'alex@email.com', phone: '+33427865123' },
        { firstName: 'Guillaume', lastName: 'Lodrini', email: 'guillaume@email.com', phone: '+33487521478' },
        { firstName: 'Thomas', lastName: 'Demoulin', email: 'thomas@email.com', phone: '+33432789652' },
        { firstName: 'Vincent', lastName: 'Labarre', email: 'vincent@email.com', phone: '+33496321585' },
        { firstName: 'Carl', lastName: 'ito', email: 'carl@email.com', phone: '+33496852174' },
        { firstName: 'Alexis', lastName: 'Sanchez', email: 'alexis@email.com', phone: '+33452141452' },
      ]);
    }
  }

  toggleSideNav() {
    this.isShowing = !this.isShowing;
  }

  onMenuItemClick(item: string) {
    this.content = item;
    switch (item) {
      case 'home':
        this.homeColor = "#00bf71";
        this.historyColor = "#43557b";
        this.profileColor = "#43557b";
        this.shareColor = "#43557b";
        break;
      case 'history':
        this.historyColor = "#00bf71";
        this.homeColor = "#43557b";
        this.profileColor = "#43557b";
        this.shareColor = "#43557b";
        break;
      case 'share':
        this.shareColor = "#00bf71";
        this.historyColor = "#43557b";
        this.profileColor = "#43557b";
        this.homeColor = "#43557b";
        break;
      case 'profile':
        this.profileColor = "#00bf71";
        this.historyColor = "#43557b";
        this.homeColor = "#43557b";
        this.shareColor = "#43557b";
        break;
    }
  }
}
