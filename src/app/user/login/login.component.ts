import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { LoginService } from '../../service/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalstorageService } from '../../service/localstorage.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/service/snackbar.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  constructor(
    private service: LoginService,
    private formBuilder: FormBuilder,
    private localService: LocalstorageService,
    private route: Router,
    private snackService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.createForm(new User());
  }

  login() {
    const userForm = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,
    };

    this.service.signin().subscribe(
      (res) => {
        const user = res.find(
          (user) =>
            user.username === userForm.username &&
            user.password === userForm.password
        );
        if (user) {
          this.localService.saveLocalStorage(user);
          this.route.navigate(['/dashboard']);
        } else {
          this.snackService.openSnackBar("User doesn't match", 'close');
        }
      },
      (err) => {
        this.snackService.openSnackBar(
          'Error, please contact the support',
          'close'
        );
      }
    );
  }

  createForm(user: User) {
    this.loginForm = this.formBuilder.group({
      username: [user.username, Validators.required],
      password: [user.password, Validators.required],
    });
  }
}
