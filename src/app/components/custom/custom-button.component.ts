import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular'; // Angular Data Grid Component
import { ICellRendererParams  } from 'ag-grid-community'; // Column Definition Type Interface
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { DialogDeleteComponent } from '../dialog/dialog-delete.component';


@Component({
  standalone: true,
  templateUrl: './custom-button.component.html',
  imports: [
    MatButtonModule,
    MatIconModule,
    DialogDeleteComponent
  ],
})
export class CustomButtonComponent implements ICellRendererAngularComp {

  constructor(public dialog: MatDialog, private router: Router) {}

  data: any;

  agInit(params: ICellRendererParams): void {
    this.data = params.data;
  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  showUpdateUser() {
    this.router.navigate(['update_user'], { queryParams: this.data, skipLocationChange: true, replaceUrl: true})
  }

  openDialogDelete(): void {
    this.dialog.open(DialogDeleteComponent, {
      data : this.data
    });
  }
}
