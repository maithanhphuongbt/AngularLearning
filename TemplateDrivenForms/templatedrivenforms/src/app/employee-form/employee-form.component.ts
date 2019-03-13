import {Component, OnInit} from '@angular/core';
import {Employee} from './../employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  submitted = false;
  jobCategories = ['Technology', 'Social', 'Sciences', 'Doctor'];
  newEmployee = new Employee(
    1,
    'Phuong',
    new Date('March 12, 2019 09:00:00'),
    this.jobCategories[0]
  );

  onSubmit() {
    this.submitted = true;
  }

  // Math.floor(Date.now()): get time stamp có milisecond
  addNewEmployee() {
    this.newEmployee = new Employee(
      Math.floor(Date.now()),
      '',
      new Date(),
      '',
      ''
    );
  }

  constructor() {}

  ngOnInit() {}
}
