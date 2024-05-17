import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ListUsersComponent } from '../list_users/list-users.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomButtonComponent } from './custom-button.component';

describe('ListUsersComponent', () => {
  let component: CustomButtonComponent;
  let fixture: ComponentFixture<CustomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomButtonComponent,
        ListUsersComponent,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
