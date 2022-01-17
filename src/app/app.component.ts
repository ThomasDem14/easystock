import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  homeColor: string = "#3d9f42";
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
        this.homeColor = "#3d9f42";
        this.historyColor = "#43557b";
        this.profileColor = "#43557b";
        this.shareColor = "#43557b";
        break;
      case 'history':
        this.historyColor = "#3d9f42";
        this.homeColor = "#43557b";
        this.profileColor = "#43557b";
        this.shareColor = "#43557b";
        break;
      case 'share':
        this.shareColor = "#3d9f42";
        this.historyColor = "#43557b";
        this.profileColor = "#43557b";
        this.homeColor = "#43557b";
        break;
      case 'profile':
        this.profileColor = "#3d9f42";
        this.historyColor = "#43557b";
        this.homeColor = "#43557b";
        this.shareColor = "#43557b";
        break;
    }
  }
}
