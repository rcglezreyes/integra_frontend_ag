import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CustomButtonComponent } from '../custom/custom-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from "@angular/router";
import { ListUsersComponent } from './list-users.component';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;
  let userService: UserService;
  let router: Router;
  let route: ActivatedRoute

  beforeEach(async () => {
    component = new ListUsersComponent(userService, route, router);
    await TestBed.configureTestingModule({
      imports: [
        ListUsersComponent,
        CustomButtonComponent,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show list correctly', () => {
    component.loadListUsers()
    console.log(component.rowsData.length)
    expect(component.rowsData.length).toEqual(0);
  });
});
