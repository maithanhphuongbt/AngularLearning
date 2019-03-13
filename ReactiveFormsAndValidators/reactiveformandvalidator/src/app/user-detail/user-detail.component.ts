// FormControl: điều khiển 1 trường input và validate
// FormGroup: Chứa nhiều form control
// FormBuilder:
// Validator:
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { states } from '../data-model';
import { emailValidator } from './../../shared/CustomValidators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  states = states;
  userFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.userFormGroup = this.formBuilder.group({
      name: ['Phuong', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, emailValidator()]],
      addresses: this.formBuilder.group({
        street: ['', [Validators.required]],
        city: '',
        state: this.states[0]
      })
    });
  }
  ngOnInit() {
  }

}
