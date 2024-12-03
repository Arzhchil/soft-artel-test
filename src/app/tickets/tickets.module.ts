import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketsRoutingModule } from './tickets-routing.module';

@NgModule({
  declarations: [TicketDetailComponent, TicketsListComponent],
  imports: [CommonModule, TicketsRoutingModule, SharedModule],
})
export class TicketsModule {}
