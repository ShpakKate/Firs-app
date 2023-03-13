import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../shared/material/material.module';
import { MyAuthGuard } from '../../shared/guards/my-auth-guard.service';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { PagesComponent } from './components/pages/pages.component';
import { EditingUserDataComponent } from './components/editing-user-data/editing-user-data.component';
import { DeletingUserComponent } from './components/deleting-user/deleting-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListOfUsersComponent } from './components/list-of-users/list-of-users.component';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    EditingUserDataComponent,
    DeletingUserComponent,
    PagesComponent,
    ListOfUsersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          {path: '', redirectTo: '/admin/list', pathMatch: 'full'},
          {path: 'pages', canActivate: [MyAuthGuard], component: PagesComponent},
          {path: 'list', canActivate: [MyAuthGuard], component: ListOfUsersComponent},
        ],
      },
    ]),
    MatSortModule,
  ],
  exports: [RouterModule],
})
export class AdminModule {}
