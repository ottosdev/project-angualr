import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { LocalstorageService } from 'src/app/service/localstorage.service';
import { LoginService } from 'src/app/service/login.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { v4 as uuidV4 } from 'uuid';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  hide = true;
  signupForm: FormGroup;
  constructor(
    private service: LoginService,
    private formBuilder: FormBuilder,
    private localService: LocalstorageService,
    private route: Router,
    private snackService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createUser() {
    const newUser: User = {
      id: uuidV4(),
      username: this.signupForm.controls['username'].value,
      password: this.signupForm.controls['password'].value,
      isAdmin: true,
    };

    this.service.signup(newUser).subscribe(
      (res) => {
        this.localService.saveLocalStorage(res);
        this.route.navigate(['/home']);
      },
      (err) => {
        this.snackService.openSnackBar("Can't create a user.", 'close');
      }
    );
  }

  createForm() {
    this.signupForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }
}
