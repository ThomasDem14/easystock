import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsertDialogComponent } from './insert-dialog/insert-dialog.component';
import { MaterialModule } from './material/material.module';
import { TableComponent } from './table/table.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ShareSellComponent } from './share-sell/share-sell.component';
import { EditContactDialogComponent } from './edit-contact-dialog/edit-contact-dialog.component';
import { InsertContactDialogComponent } from './insert-contact-dialog/insert-contact-dialog.component';
import { TableHistoryComponent } from './table-history/table-history.component';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@NgModule({
  
  declarations: [
    AppComponent,
    InsertDialogComponent,
    TableComponent,
    EditDialogComponent,
    ShareSellComponent,
    EditContactDialogComponent,
    InsertContactDialogComponent,
    TableHistoryComponent,
    RemoveDialogComponent,
    LoginFormComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
