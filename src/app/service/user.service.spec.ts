import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { WebRequestService } from '../web_service/web-request.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[
        UserService,
        WebRequestService
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created the service', () => {
    expect(service).toBeTruthy();
  });
});
