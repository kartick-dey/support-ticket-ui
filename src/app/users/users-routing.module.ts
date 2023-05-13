import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
import { UserLogComponent } from './component/user-log/user-log.component';

const routes: Routes = [
  {
    path: 'log',
    component: UserLogComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'log', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
