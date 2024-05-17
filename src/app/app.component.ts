import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListUsersComponent } from './components/list_users/list-users.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateUserComponent } from './components/create_user/create-user.component';
import { UpdateUserComponent } from './components/update_user/update-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    ListUsersComponent,
    CreateUserComponent,
    UpdateUserComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'users';
}
