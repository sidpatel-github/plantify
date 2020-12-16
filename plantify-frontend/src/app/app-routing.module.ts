import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PlantListComponent } from './plants/plant-list/plant-list.component';
import { PlantsComponent } from './plants/plants.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'plants', component: PlantsComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
