import { Component, OnInit } from '@angular/core';
import { TicketService, Ticket } from '../../core/ticket.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
})
export class TicketsListComponent implements OnInit {
  tickets: Ticket[] = [];
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      const userID = currentUser.id;

      this.ticketService.getTicketsByUser(userID).subscribe(
        (tickets) => {
          this.tickets = tickets;
        },
        (error) => {
          console.error('Ошибка при получении тикетов:', error);
          this.errorMessage = 'Не удалось загрузить тикеты. Попробуйте позже.';
        }
      );
    } else {
      this.errorMessage = 'Вы не авторизованы. Пожалуйста, войдите в аккаунт.';
    }
  }

  goBackToProfile() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const userID = currentUser.id;
      this.router.navigate(['/profile', userID]);
    } else {
      this.errorMessage = 'Вы не авторизованы. Пожалуйста, войдите в аккаунт.';
    }
  }
}
