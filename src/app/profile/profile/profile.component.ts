import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../core/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  cities = ['Москва', 'Санкт-Петербург', 'Новосибирск'];
  dateOfBirth: Date | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.user = currentUser;
      this.dateOfBirth = new Date(currentUser.birthDate);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSave(): void {
    if (this.user) {
      this.userService.updateUser(this.user).subscribe((response) => {
        alert('Профиль сохранён');
        localStorage.setItem('currentUser', JSON.stringify(this.user));
      });
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToTickets(): void {
    this.router.navigate(['/tickets']);
  }
}
