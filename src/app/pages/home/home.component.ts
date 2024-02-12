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
  selectedValue: string = '';
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
  ) {
    this.getAll();

    // const filter = { isActive: false };
    // this.getallWithfiltered(filter);
  }

  filterSelect(selected: string): void {
    console.log('Selected value:', selected);
    if (selected === 'all') {
      this.getAll();
    }
    let filter = { isActive: selected };
    this.getallWithfiltered(filter);
  }

  showModal(): void {
    this.isVisible = true;
    this.id = '';
  }
  editshowModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.getSingle();
  }

  getSingle() {
    this.userService.getSingle(this.id).subscribe(
      (res) => {
        console.log(res);
        this.registrationForm.patchValue(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
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
        this.edit(finalData);
      } else {
        this.addData(this.registrationForm.value);
      }
    }
  }

  getAll() {
    this.userService.getAllUser().subscribe((res) => {
      this.users = res.data;
      console.log(this.users);
    });
  }

  getallWithfiltered(data: any) {
    this.userService.getAllwithFilter(data).subscribe((res) => {
      this.users = res.data;
      console.log(this.users);
    });
  }

  addData(data: User) {
    this.userService.add(data).subscribe(
      (res) => {
        console.log(res);
        this.notification.create('success', 'User added', res.message);
        this.getAll();

        this.registrationForm.reset();
      },
      (err) => {
        this.notification.create('error', 'Failed', err.message);
        this.registrationForm.reset();
      }
    );
  }
  delete(id: any) {
    this.userService.delete(id).subscribe(
      (res) => {
        this.notification.create('success', 'Sucessfully Deleted', res.message);
        this.getAll();
      },
      (err) => {
        this.notification.create('Error', 'Failed', err.message);
      }
    );
  }
  edit(data: User) {
    this.userService.edit(data).subscribe(
      (res) => {
        this.notification.create(
          'success',
          'successfully updated',
          res.message
        );
        this.getAll();

        this.registrationForm.reset();
      },
      (err) => {
        this.notification.create('error', 'Failed', err.message);
        this.registrationForm.reset();
      }
    );
  }
}
