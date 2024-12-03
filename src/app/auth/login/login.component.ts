import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  hidePassword = true;
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}
  onLogin(): void {
    this.authService
      .login(this.username, this.password)
      .subscribe((success) => {
        if (success) {
          const user = this.authService.getCurrentUser();
          this.router.navigate(['/profile', user.id]);
        } else {
          this.errorMessage = 'Неверный логин или пароль';
        }
      });
  }
}
