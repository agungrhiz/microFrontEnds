import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BaseNavComponent } from './components/base-nav/base-nav.component';
import { CrudListComponent } from './pages/crud/crud-list.component';
import { CrudFormComponent } from './pages/crud/crud-form.component';

export const routes: Routes = [
  {
    path: '',
    component: BaseNavComponent,
    children: [
      { path: '', component: HomeComponent, data: { title: 'Dashboard' } },
      {
        path: 'crud',
        data: { title: 'CRUD' },
        children: [
          {
            path: '',
            component: CrudListComponent,
          },
          {
            path: 'create',
            component: CrudFormComponent,
          },
          {
            path: ':id',
            component: CrudFormComponent,
          },
        ],
      },
    ],
  },
];
