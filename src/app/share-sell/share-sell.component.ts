import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-sell',
  templateUrl: './share-sell.component.html',
  styleUrls: ['./share-sell.component.scss']
})
export class ShareSellComponent implements OnInit {

  public itemForm: FormGroup;
  @Input() data: any[];

  constructor(private _formBuilder: FormBuilder) { }
  

  ngOnInit(): void {
    this.itemForm = this._formBuilder.group({
      titleCtrl: ["", [Validators.required]],
      amountCtrl: ["", [Validators.required, Validators.min(1)]],
      statusCtrl: ["", [Validators.required]],
      dateCtrl: ["", [Validators.required]],
    });
  }
}
