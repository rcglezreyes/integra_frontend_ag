import { Injectable } from '@angular/core';
import { WebRequestService } from '../web_service/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private webService: WebRequestService) { }


  getListUsers() {
    return this.webService.get('users');
  }

  createNewUser(payload: Object) {
    return this.webService.post('create_user', payload);
  }

  updateUser(payload: Object, user_id: number) {
    return this.webService.put('update_user', payload, user_id);
  }

  deleteUser(user_id: number) {
    return this.webService.delete('delete_user', user_id);
  }

}
