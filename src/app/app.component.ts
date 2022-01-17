import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'easystock';
  isShowing: boolean = true;

  constructor() {}

  toggleSideNav() {
    this.isShowing = !this.isShowing;
  }
}
