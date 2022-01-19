import { Component } from '@angular/core';
import * as moment from 'moment';
import { ContactObject } from './share-sell/share-sell.component';
import { StockObject } from './table/table.component';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  notifications = [
    { id: 1, message: 'This is the first notification' },
    { id: 2, message: 'This is the second notification' },
  ];

  data: StockObject[] = [
    {name:'Headphone', quantity:1, status: 'IN', date:moment("30/12/2021", "DD/MM/YYYY")},
    {name:'Table', quantity:1, status: 'IN', date:moment("06/01/2022", "DD/MM/YYYY")},
    {name:'Chairs', quantity:4, status: 'SHARED', date:moment("08/01/2022", "DD/MM/YYYY")},
    {name:'Phone', quantity:2, status: 'IN', date:moment("19/01/2022", "DD/MM/YYYY")},
  ];

  history: StockObject[] = [
    {name:'Headphone', quantity:1, status: 'IN', date:moment("30/12/2021", "DD/MM/YYYY")},
    {name:'Table', quantity:1, status: 'IN', date:moment("06/01/2022", "DD/MM/YYYY")},
    {name:'Chairs', quantity:4, status: 'IN', date:moment("06/01/2022", "DD/MM/YYYY")},
    {name:'Chairs', quantity:4, status: 'SHARED', date:moment("08/01/2022", "DD/MM/YYYY")},
    {name:'Phone', quantity:2, status: 'IN', date:moment("06/01/2022", "DD/MM/YYYY")},
    {name:'Phone', quantity:2, status: 'SHARED', date:moment("09/01/2022", "DD/MM/YYYY")},
    {name:'Phone', quantity:2, status: 'IN', date:moment("19/01/2022", "DD/MM/YYYY")},
    {name:'Computer', quantity:1, status: 'IN', date:moment("10/01/2022", "DD/MM/YYYY")},
    {name:'Computer', quantity:1, status: 'SOLD', date:moment("13/01/2022", "DD/MM/YYYY")},
  ];

  contacts: ContactObject[] = [
    {firstName:'John', lastName:'Smith', email:'john@email.com', phone:'+33496854047'},
    {firstName:'Francois', lastName:'Thompson', email:'francois@email.com', phone:'+33496875341'},
    {firstName:'Tom', lastName:'Dupont', email:'tom@email.com', phone:'+33451258475'},
    {firstName:'Romain', lastName:'Tartanpiau', email:'romain@email.com', phone:'+33493541873'},
    {firstName:'Alexandre', lastName:'Legrand', email:'alex@email.com', phone:'+33427865123'},
    {firstName:'Guillaume', lastName:'Lodrini', email:'guillaume@email.com', phone:'+33487521478'},
    {firstName:'Thomas', lastName:'Demoulin', email:'thomas@email.com', phone:'+33432789652'},
    {firstName:'Vincent', lastName:'Labarre', email:'vincent@email.com', phone:'+33496321585'},
    {firstName:'Carl', lastName:'ito', email:'carl@email.com', phone:'+33496852174'},
    {firstName:'Alexis', lastName:'Sanchez', email:'alexis@email.com', phone:'+33452141452'},
  ];

  homeColor: string = "#00bf71";
  historyColor: string = "#43557b";
  profileColor: string = "#43557b";
  shareColor: string = "#43557b";

  title = 'easystock';
  isShowing: boolean = true;

  content: string = 'home';
  constructor() {}

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
