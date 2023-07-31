# Project Name :
User Management System

## Design choices:
I used Angular it is a javascript framework to create User management system. Because it gives the reactive form facility to create form field with validations, we can also create and customise the validations in the fuctions. I have created the component to create form. This component exists .ts, html and style files.
For style I install Bootstrap in angular. I used the Bootstrap classes to style the form fields, table structure and buttons.
Backend and things dependent on backend are out of scope. I am sharing the frontend part as I discussed.

## File structure
I have placed my form code in `app component`, it has three files
* `app.component.ts` -  It has the typescript code.
* `app.component.html` - It contains the html code.
* `app.component.ts` - It consists style.
* `app componet` is imported under the `app.module.ts` file, because it the root of the project.

## Output Screenshot

### a. Create a new user account:
* Added user details in the form before click on the Create Account button.
<img width="488" alt="image" src="https://github.com/jyotithakur26/user-login/assets/140992312/aa6fe00b-9d5f-4f19-a861-5b67108f3d89">

* After clicked on the Create Account button
<img width="469" alt="image" src="https://github.com/jyotithakur26/user-login/assets/140992312/5ac26cc5-46b8-49d7-a5f8-9db7eba5f8d3">



### e. Update user details:
<img width="478" alt="image" src="https://github.com/jyotithakur26/user-login/assets/140992312/03de8ec3-3994-4801-a2d6-d8f97dc5e9bf">


### f. Delete a user:
* There are three user accounts before deleting.
<img width="479" alt="image" src="https://github.com/jyotithakur26/user-login/assets/140992312/453ccb91-1a66-4be7-a618-c117ded64ca1">

* Two user accounts left after deleted one account.
<img width="481" alt="image" src="https://github.com/jyotithakur26/user-login/assets/140992312/90cdff67-7a4f-4cff-86a2-968dc37a113e">


### Errors when user filled wrong field
<img width="482" alt="image" src="https://github.com/jyotithakur26/user-login/assets/140992312/5e65cb2b-8803-4ebb-8edb-bf3a25eb1cc1">

### After Submit the form, the value is displaying in table
<img width="467" alt="image" src="https://github.com/jyotithakur26/user-login/assets/140992312/b251a797-7453-4251-9855-f3f1cdb2688d">


## Typescript code

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  listObject: any = [];
  editFlag: boolean = false;
  todayDate: Date = new Date();
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      Username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      createdDate: ['', Validators.required],
      updatedDate: ['', Validators.required],
    });
  }
  get f() {
    return this.form.controls;
  }

  editForm(user) {
    this.editFlag = true;
    this.form.patchValue(user);
  }
  onSubmit(data) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    if (!this.editFlag) {
      this.listObject.push(this.form.value);
      this.loading = false;
      this.editFlag = false;
      this.submitted = false;
      this.form.reset();
    } else {
      this.listObject = this.listObject.filter(
        (item) => item.email !== this.form.value.email
      );
      this.listObject.push(this.form.value);
      this.loading = false;
      this.editFlag = false;
      this.submitted = false;
    }
  }
  deleteUser(emailId) {
    this.listObject = this.listObject.filter((item) => item.email !== emailId);
  }
}

```



## Html code

```ts
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <!-- user form start -->
      <form [formGroup]="form" (ngSubmit)="onSubmit(form)">
        <div class="form-row">
          <div class="form-group col-5">
            <label>Username</label>
            <input
              type="text"
              formControlName="Username"
              class="form-control"
              [ngClass]="{ 'is-invalid': submitted && f.Username.errors }"
            />
            <div
              *ngIf="submitted && f.Username.errors"
              class="invalid-feedback"
            >
              <div *ngIf="f.Username.errors.required">Username is required</div>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-7">
            <label>Email</label>
            <input
              type="text"
              formControlName="email"
              class="form-control"
              [ngClass]="{ 'is-invalid': submitted && f.email.errors }"
            />
            <div *ngIf="submitted && f.email.errors" class="invalid-feedback">
              <div *ngIf="f.email.errors.required">Email is required</div>
              <div *ngIf="f.email.errors.email">
                Email must be a valid email address
              </div>
            </div>
          </div>
          <div class="form-group col">
            <label>Role</label>
            <select
              formControlName="role"
              class="form-control"
              [ngClass]="{ 'is-invalid': submitted && f.role.errors }"
            >
              <option value=""></option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <div *ngIf="submitted && f.role.errors" class="invalid-feedback">
              <div *ngIf="f.role.errors.required">Role is required</div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-5">
              <label>Created Date</label>
              <input
                type="date"
                formControlName="createdDate"
                class="form-control"
                [ngClass]="{ 'is-invalid': submitted && f.createdDate.errors }"
              />
              <div
                *ngIf="submitted && f.createdDate.errors"
                class="invalid-feedback"
              >
                <div *ngIf="f.createdDate.errors.required">
                  Created Date is required
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-5">
              <label>Updated Date</label>
              <input
                type="date"
                formControlName="updatedDate"
                class="form-control"
                [ngClass]="{ 'is-invalid': submitted && f.updatedDate.errors }"
              />
              <div
                *ngIf="submitted && f.updatedDate.errors"
                class="invalid-feedback"
              >
                <div *ngIf="f.updatedDate.errors.required">
                  Updated Date is required
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <button [disabled]="loading" class="btn btn-primary">
            <span
              *ngIf="loading"
              class="spinner-border spinner-border-sm mr-1"
            ></span>
            Create Account
          </button>
          
          <button class="btn btn-primary mr-l">
            <span
              class="spinner-border spinner-border-sm mr-1"
            ></span>
            Get User by ID
          </button>
          <button class="btn btn-primary">
            <span
              class="spinner-border spinner-border-sm mr-1"
            ></span>
            Get user by Username
          </button>
          <button class="btn btn-primary">
            <span
              class="spinner-border spinner-border-sm mr-1"
            ></span>
            Get all Users
          </button>
        </div>
      </form>

      <!-- Form date store in table -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th style="width: 5%">ID</th>
            <th style="width: 20%">Username</th>
            <th style="width: 20%">Email</th>
            <th style="width: 10%">Role</th>
            <th style="width: 20%">Created Date</th>
            <th style="width: 20%">Updated Date</th>
            <th style="width: 10%"></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of listObject; let i = index">
            <td>{{ i + 1 }}</td>
            <td>{{ user.Username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ todayDate | date : "medium" }}</td>
            <td>{{ todayDate | date : "medium" }}</td>
            <td style="white-space: nowrap">
              <a (click)="editForm(user)" class="btn btn-sm btn-primary mr-1"
                >Edit</a
              >
              <button
                (click)="deleteUser(user.email)"
                class="btn btn-sm btn-danger btn-delete-user m-l"
                [disabled]="user.isDeleting"
              >
                <span
                  *ngIf="user.isDeleting"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span *ngIf="!user.isDeleting">Delete</span>
              </button>
            </td>
          </tr>
          <tr *ngIf="listObject.length === 0">
            <td colspan="7" class="text-center">No record found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- <h1 *ngIf="!editFlag">Add User</h1>
<h1 *ngIf="editFlag">Edit User</h1> -->

```



## Style

```ts
.container {
  margin-top: 30px;
}

input.ng-invalid.ng-touched {
  border: 1px solid red;
}

.demo-table {
  width: 100%;
}

.btn-primary {
  margin: 10px 10px 10px 0;
}
.mat-mdc-row .mat-mdc-cell {
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;
  cursor: pointer;
}


.mat-mdc-row:hover .mat-mdc-cell {
  border-color: currentColor;
}

.demo-row-is-clicked {
  font-weight: bold;
}

table {
  border: 1px solid grey;
  margin-top: 20px;
}


```


