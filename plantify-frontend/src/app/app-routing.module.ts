import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { CategoryTilesComponent } from './browse-categories/category-tiles/category-tiles.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlantDetailsComponent } from './plants/plant-list/plant-details/plant-details.component';
import { PlantListComponent } from './plants/plant-list/plant-list.component';
import { PlantsComponent } from './plants/plants.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'plants', component: PlantsComponent },
  { path: 'plants/:categotyType/:id', component: PlantsComponent },
  { path: 'category/:name', component: CategoryTilesComponent },
  { path: 'plant-detail/:id', component: PlantDetailsComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard],
  },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
