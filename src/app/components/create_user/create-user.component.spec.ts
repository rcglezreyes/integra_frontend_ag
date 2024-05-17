import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormControl, Validators, FormsModule, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateUserComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error  username required', () => {

    component.NewUserForm = component.formBuilder.group({
      user_name: ['', Validators.required],
      first_name: ['Testing', [Validators.required]],
      last_name: ['Testing', Validators.required],
      email: ['hello@test.com', [Validators.required, Validators.email]],
      user_status: ['I', Validators.required],
      department: ['Depa', Validators.required]
    });

    let formData = component.NewUserForm.value;

    component.createNewUser(formData)

    console.log(component.data)

    expect(component.data).toBeUndefined()

  });

});
