import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { StockObject } from '../table/table.component';
import { Moment } from 'moment';

@Component({
  selector: 'app-share-sell',
  templateUrl: './share-sell.component.html',
  styleUrls: ['./share-sell.component.scss']
})
export class ShareSellComponent implements OnInit {

  public itemForm: FormGroup;
  @Input() data: StockObject[];

  step: number = 0;
  max: number = 0;

  public statusList = [
    "Sell", "Share",
  ];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.itemForm = this._formBuilder.group({
      titleCtrl: ["", [Validators.required]],
      amountCtrl: ["", [Validators.required]],
      statusCtrl: ["", [Validators.required]],
      dateCtrl: ["", [Validators.required]],
    });

    this.itemForm.get('titleCtrl')?.valueChanges.subscribe((value: StockObject) => {
      this.step = 1;
      this.max = value.quantity;
    });

    this.itemForm.get('statusCtrl')?.valueChanges.subscribe(() => {
      this.step = 2;
    });

    this.itemForm.get('amountCtrl')?.valueChanges.subscribe(() => {
      this.step = 3;
    });
  }

  onReset() {
    this.itemForm.reset();
    this.step = 0;
  }

  onSubmit() {
    let title: StockObject = this.itemForm.get('titleCtrl')?.value;
    let amount: number = this.itemForm.get('amountCtrl')?.value;
    let status: string = this.itemForm.get('statusCtrl')?.value;
    let date: Moment = this.itemForm.get('dateCtrl')?.value;
    
    this.data.push({name:title.name, quantity:amount, status:status, date:date.format("DD/MM/YYYY")});
    this.onReset();
  }
}
