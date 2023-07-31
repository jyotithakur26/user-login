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
