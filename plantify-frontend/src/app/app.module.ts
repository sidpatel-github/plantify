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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlantsComponent } from './plants/plants.component';
import { PlantListComponent } from './plants/plant-list/plant-list.component';
import { PlantListFilterComponent } from './plants/plant-list-filter/plant-list-filter.component';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { PlantDetailsComponent } from './plants/plant-list/plant-details/plant-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

// import { GraphQLModule } from './graphql.module';

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
    AuthComponent,
    PlantsComponent,
    PlantListComponent,
    PlantListFilterComponent,
    PlantDetailsComponent,
    CartComponent,
    CheckoutComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
    // // ,
    // GraphQLModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:4200/graphql' }),
      cache: new InMemoryCache()
    });
  }
}
