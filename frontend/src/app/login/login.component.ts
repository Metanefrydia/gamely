import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { TokenPayload } from '../authentication/authentication.models';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public credentials: TokenPayload = {
    email: '',
    password: ''
  };

  public constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {}

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
