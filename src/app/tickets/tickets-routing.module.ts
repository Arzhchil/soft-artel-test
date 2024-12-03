import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

const routes: Routes = [
  { path: '', component: TicketsListComponent },
  { path: ':ticketID', component: TicketDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
