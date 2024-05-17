import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators, FormsModule, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { RouterLink, Router, ActivatedRoute, Params } from '@angular/router';
import {merge} from 'rxjs';
import { UserService } from '../../service/user.service';
import { WebRequestService } from '../../web_service/web-request.service';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    RouterLink
  ],
  providers: [
    UserService,
    WebRequestService
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {

  UpdateUserForm!: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = '';

  userToUpdate = {} as IUser;

  newOne: any;

  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());


  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.userToUpdate.userId = params['user_id'];
      this.userToUpdate.userName = params['user_name'];
      this.userToUpdate.firstName = params['first_name'];
      this.userToUpdate.lastName = params['last_name'];
      this.userToUpdate.email = params['email'];
      this.userToUpdate.userStatus = params['user_status'];
      this.userToUpdate.department = params['department'];
    });

    this.email.setValue(this.userToUpdate.email)

    this.UpdateUserForm = this.formBuilder.group({
      user_name: [this.userToUpdate.userName, Validators.required],
      first_name: [this.userToUpdate.firstName, [Validators.required]],
      last_name: [this.userToUpdate.lastName, Validators.required],
      email: this.email,
      user_status: [this.userToUpdate.userStatus, Validators.required],
      department: [this.userToUpdate.department]
    });

  }

  onSubmit() {
    if (this.UpdateUserForm.valid) {
      const formData = this.UpdateUserForm.value;
      console.log(formData);
      this.updateUser(formData, this.userToUpdate.userId);
    }
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  private updateUser(payload: Object, user_id: number): void {
    this.newOne = this.userService.updateUser(payload, user_id).subscribe({
      next: data => {
          this.data = data;
          this.router.navigateByUrl('users')
      },
      error: error => {
          this.data = error.message;
          alert(error.message)
      }
  })
  }

}
