# Project Name :
User Management System

## Design choices:
I used Angular it is a javascript framework to create User management system. Because it gives the reactive form facility to create form field with validations, we can also create and customise the validations in the fuctions. I have created the component to create form. This component exists .ts, html and style files.

For style I install Bootstrap in angular. I used the Bootstrap classes to style the form fields, table structure and buttons

## File structure
I have placed my form code in `app component`, it has three files
* `app.component.ts` -  It has the typescript code.
* `app.component.html` - It contains the html code.
* `app.component.ts` - It consists style.
* `app componet` is imported under the app.module.ts file
  


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
            Add
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
                class="btn btn-sm btn-danger btn-delete-user"
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



