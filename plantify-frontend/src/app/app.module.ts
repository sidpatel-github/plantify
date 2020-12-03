import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { BrowseCategoriesComponent } from './browse-categories/browse-categories.component';
import { TrendingProductsComponent } from './trending-products/trending-products.component';
import { ServicesComponent } from './services/services.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainCarouselComponent,
    BrowseCategoriesComponent,
    TrendingProductsComponent,
    ServicesComponent,
    MainPageComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
