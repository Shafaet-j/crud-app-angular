import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User } from 'src/app/interface/user';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  registrationForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    isActive: new FormControl(null),
  });
  isVisible = false;
  id = '';
  users: User[] = [];

  constructor(
    private userService: UserService,
    private notification: NzNotificationService
  ) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.onSubmit();
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.registrationForm.reset();
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.notification.create(
        'warning',
        'Data Invalid',
        'Please complete the required fields'
      );
    } else {
      if (this.id) {
        let finalData = {
          ...this.registrationForm.value,
          ...{ _id: this.id },
        };
        // this.edit(finalData);
      } else {
        this.addData(this.registrationForm.value);
      }
    }
  }

  getAllUser() {
    this.userService.getAll().subscribe((res) => {
      this.users = res.data;
    });
  }

  addData(data: User) {
    this.userService.add(data).subscribe(
      (res) => {
        console.log(res);
        this.notification.create('success', 'User added', res.message);
        // this.getAllUser();
        this.registrationForm.reset();
      },
      (err) => {
        this.notification.create('error', 'Failed', err.message);
        this.registrationForm.reset();
      }
    );
  }
}
