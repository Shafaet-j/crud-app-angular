import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  registrationForm: FormGroup = new FormGroup({
    Name: new FormControl(null),
    Email: new FormControl(null),
    Phone: new FormControl(null),
    Age: new FormControl(null),
    Address: new FormControl(null),
    isActive: new FormControl(null),
  });
  isVisible = false;

  constructor() {}

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
      alert('please input');
    } else {
      console.log(this.registrationForm.value);
    }
  }
}
