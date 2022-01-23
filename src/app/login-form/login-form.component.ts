import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ContactObject } from '../share-sell/share-sell.component';
import { StockObject } from '../table/table.component';
import CryptoES from 'crypto-es';


export interface CredentialObject {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) { }

  public login: boolean = false;
  public loginInvalid: boolean = false;
  public itemForm: FormGroup;
  public credentialValue: CredentialObject;

  @Input() data: StockObject[];
  @Input() contacts: ContactObject[];
  @Input() history: StockObject[];


  ngOnInit(): void {
    this.itemForm = this._formBuilder.group({
      userControl: new FormControl('', [Validators.required, Validators.email,]),
      passwordControl: new FormControl('', [Validators.required,]),
    });

    let credentials = localStorage.getItem('credentials');
    if (credentials != null) {
      this.credentialValue = JSON.parse(credentials);
      this.login = true;
    } else {
      this.login = false;
    }
  }

  async onSubmit() {
    this.loginInvalid = true;
    if (this.itemForm.valid) {
      const email = this.itemForm.get('userControl')?.value;
      const password = this.itemForm.get('passwordControl')?.value;

      const hash = CryptoES.SHA256(password).toString();

      if (email === "test@gmail.com" && hash === "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92") {
        this.login = true;
        this.loginInvalid = false;
        let data: CredentialObject = {
          'email': email,
          'password': hash
        };
        localStorage.setItem('credentials', JSON.stringify(data));
        this.credentialValue = data;

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
  }

  getUserErrorMessage() {
    if (this.itemForm.get('userControl')?.hasError('required') || this.itemForm.get('userControl')?.hasError('email')) {
      return 'You must enter a valid email';
    }
    return '';
  }
  getPasswordErrorMessage() {
    if (this.itemForm.get('passwordControl')?.hasError('required')) {
      return 'You must enter a password';
    }
    return '';
  }

  disconnect() {
    this.login = false;
    localStorage.removeItem("credentials");
    this.data.length = 0;
    this.contacts.length = 0;
    this.history.length = 0;
  }
}
