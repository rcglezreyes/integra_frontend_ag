import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { UserService } from '../../service/user.service';
import { WebRequestService } from '../../web_service/web-request.service';

@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [
    MatButtonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  providers: [
    UserService,
    WebRequestService
  ],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.css'
})
export class DialogDeleteComponent implements OnInit{
  userName: string = '';
  userId: number = 0;
  user: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    @Inject(DOCUMENT) private document: Document
) {}

  ngOnInit(): void {
    this.userName = this.data['user_name'];
    this.userId = this.data['user_id'];
  }

  deleteUser(): void {
    this.userService.deleteUser(this.userId).subscribe(
      data => {
        this.user = data;
        this.document.location.reload();
      }
    );

  }
}

