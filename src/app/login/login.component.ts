import { Component, OnInit } from '@angular/core';
import { User } from './user';
import {AuthService} from "../_guards/auth.service";
import {Router} from "@angular/router";

@Component({
  selector   : 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  model : User = {};

  constructor(private authService : AuthService,
                private router : Router) {}

  onSubmit(e : any) {

    this.authService.login(this.model)
        .then(() => {
           this.router.navigate(['/city']);
        });
  }

  ngOnInit() {
    console.log('Login loaded');
  }
}
