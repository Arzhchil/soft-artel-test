import { Component, OnInit } from '@angular/core';
import { TicketService, Ticket } from '../../core/ticket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {
  ticket?: Ticket | null = null;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const ticketID = +this.route.snapshot.paramMap.get('ticketID')!;
    this.ticketService.getTicket(ticketID).subscribe((ticket) => {
      this.ticket = ticket;
    });
  }
}
