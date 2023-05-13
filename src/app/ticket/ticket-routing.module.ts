import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
import { LogComponent } from './component/log/log.component';
import { ViewComponent } from '../ticket-v2/component/view/view.component';

const routes: Routes = [
  { path: 'log', component: LogComponent, canActivate: [AuthGuard] },
  { path: 'view/:ticketid', component: ViewComponent, canActivate: [AuthGuard] },
  // { path: '', redirectTo: 'log', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketRoutingModule {}
