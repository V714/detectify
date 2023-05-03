import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './sites/home/home.component';
import { DetectifiedComponent } from './sites/detectified/detectified.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detectified/:uuid', component: DetectifiedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
