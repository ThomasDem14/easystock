import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-sell',
  templateUrl: './share-sell.component.html',
  styleUrls: ['./share-sell.component.scss']
})
export class ShareSellComponent implements OnInit {

  @Input() data: any[];

  constructor() { 
  }

  ngOnInit(): void {
  }

}
