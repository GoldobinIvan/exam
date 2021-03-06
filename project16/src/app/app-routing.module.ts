import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
  path: '',
  component: MainComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'test/:id',
    component: TestComponent,
  },
  {
    path: 'users',
    loadChildren: () => 
    import('./users/users.module').then((m) => m.UsersModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
