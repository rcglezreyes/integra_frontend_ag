import { Component, OnInit, Input } from '@angular/core';
import { AgGridModule, AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../service/user.service';
import { WebRequestService } from '../../web_service/web-request.service';
import { RouterLink } from '@angular/router';
import { CustomButtonComponent } from '../custom/custom-button.component';

// ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Row Data Interface

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    AgGridModule,
    AgGridAngular,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    CustomButtonComponent
  ],
  providers: [
    UserService,
    WebRequestService
  ],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent implements OnInit{

  @Input() iUser!: IUser

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  lists: IUser[] = [];

  themeClass = 'ag-theme-balham';

  // Row Data: The data to be displayed.
  rowData: any[] = [];

  // Column Definitions: Defines & controls grid columns.
  colDefs: any[] = [
    { headerName: 'Index', field: '', valueGetter: "node.rowIndex + 1"},
    { headerName: 'User ID', field: 'user_id', hide: true},
    { headerName: 'User Name', field: 'user_name'},
    { headerName: 'First Name', field: 'first_name'},
    { headerName: 'Last Name', field: 'last_name'},
    { headerName: 'Email', field: 'email'},
    { headerName: 'Status', field: 'user_status'},
    { headerName: 'Department', field: 'department'},
    { field: "operations", cellRenderer: CustomButtonComponent, flex: 1, cellRendererParams: {
      myProp: (params: any) => {
        return params.data;
      }
    }}
  ];

  defaultColDef: ColDef = {
    flex: 1,
  }

  listUsers: any;

  getAll: any;

  loadListUsers(): void {
    this.getAll = this.userService.getListUsers().subscribe(
      data => {
        this.rowData = data
      }
    );
  }

  ngOnInit() {
    this.loadListUsers()
  }

  showNewUser() {
    this.router.navigate(['create_user'], { skipLocationChange: true, replaceUrl: true})
  }
}
