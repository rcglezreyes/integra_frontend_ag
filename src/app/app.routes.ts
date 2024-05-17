import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  },
  {
    path: 'users',
    title: 'List Users',
    loadComponent: () => import('./components/list_users/list-users.component').then(c => c.ListUsersComponent)
  },
  {
    path: 'create_user',
    title: 'Create User',
    loadComponent: () => import('./components/create_user/create-user.component').then(c => c.CreateUserComponent)
  },
  {
    path: 'update_user',
    title: 'Update User',
    loadComponent: () => import('./components/update_user/update-user.component').then(c => c.UpdateUserComponent)
  },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
