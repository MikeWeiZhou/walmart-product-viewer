import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestLoggerComponent } from './components/test-logger/test-logger.component';

const routes: Routes = [
  { path: 'test-logger', component: TestLoggerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
