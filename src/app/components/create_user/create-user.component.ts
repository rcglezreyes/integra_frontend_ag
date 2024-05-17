import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators, FormsModule, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import {merge} from 'rxjs';
import { UserService } from '../../service/user.service';
import { WebRequestService } from '../../web_service/web-request.service';

@Component({
  selector: 'app-create-user',
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
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {

  NewUserForm!: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = '';

  user: any;

  newOne: any;

  data: any;

  constructor(public formBuilder: FormBuilder, private userService: UserService, private router: Router) {

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());


  }

  ngOnInit() {
    this.NewUserForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      first_name: ['', [Validators.required]],
      last_name: ['', Validators.required],
      email: this.email,
      user_status: ['', Validators.required],
      department: ['']
    });
  }

  onSubmit() {
    if (this.NewUserForm.valid) {
      const formData = this.NewUserForm.value;
      this.createNewUser(formData);
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

  createNewUser(payload: Object): void {

      this.userService.createNewUser(payload).subscribe({
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
