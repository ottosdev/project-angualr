import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  showFiller = true;
  isLoggin: boolean = false;
  name: string = '';
  constructor(
    private service: LoginService,
    private route: Router,
  ) {}
  ngDoCheck(): void {
    this.isLoggin = this.service.getIsAdmin();
    this.name = 'Bem vindo, ' + this.service.getUsername();
  }
  ngOnInit(): void {
    this.isLoggin = this.service.getIsAdmin();
    this.name = this.service.getUsername();
  }

  logout() {
    this.service.loginLogout();
    this.route.navigate(['/login']);
  }

  signin() {
    this.isLoggin ? this.logout() : this.route.navigate(['/login']);
  }

  
  goToSignUp() {
    this.route.navigate(['/signup'])
  }
}
