import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ticket {
  id: number;
  userId: number;
  title: string;
  creationDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'http://localhost:3000/tickets';

  constructor(private http: HttpClient) {}

  getTicketsByUser(userID: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}?userId=${userID}`);
  }

  getTicket(ticketID: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${ticketID}`);
  }
}
