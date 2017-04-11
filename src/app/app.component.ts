import { Component, OnInit }                  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Member } from './member';
import { maxDateValidator } from './max-date-validator.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  memberForm: FormGroup;

  title = 'Membership Register';
  member: Member;
  memberList: Array<Member>;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.member = new Member();
    this.memberList = new Array<Member>();
    this.buildForm();
  }

  createNewMember(): void {
    this.member = new Member();
    this.buildForm();
  }

  onSubmit() {  
    this.submitted = true;
    let memberToAdd = new Member();
    Object.assign(memberToAdd, this.memberForm.value);
    this.memberList.push(memberToAdd);
  }

  buildForm() : void {
    this.memberForm = this.fb.group({
      'firstName': [this.member.firstName, [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(15)]],
      'lastName': [this.member.lastName, [
        Validators.required,
        Validators.minLength(2), 
        Validators.maxLength(15)
      ]],
      'email': [this.member.email, [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      'dateJoined': [this.member.dateJoined, [
        Validators.required,
        maxDateValidator(new Date())
      ]],
      'isCurrent': [this.member.isCurrent, [
        Validators.required
      ]]
    });

    this.memberForm.valueChanges.subscribe(data => this.onValueChanged(data))

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.memberForm) { return; }
    const form = this.memberForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

   formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'dateJoined': '',
    'isCurrent': ''
  };

  validationMessages = {
    'firstName': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'First Name cannot be more than 15 characters long.'
    },
    'lastName': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 15 characters long.'
    },
    'email':{
      'required': 'Email Address is required.', 
      'pattern': 'Must be a valid Email Address.'
    },
    'dateJoined': {
      'required': 'Date Joined is required.',
      'maxDate':  'Date cannot be in the future.'
    },
    'isCurrent':{
      'required': 'Is Current required.'
    }
  };

}
