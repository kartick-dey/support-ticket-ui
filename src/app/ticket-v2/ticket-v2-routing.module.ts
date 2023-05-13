import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
import { AllTicketsComponent } from './component/all-tickets/all-tickets.component';
import { ViewComponent } from './component/view/view.component';

const routes: Routes = [
  { path: 'log', component: AllTicketsComponent, canActivate: [AuthGuard] },
  { path: 'view/:ticketid', component: ViewComponent, canActivate: [AuthGuard] },
  // { path: '', redirectTo: 'log', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketV2RoutingModule { }
