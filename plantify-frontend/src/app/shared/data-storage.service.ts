import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Cart } from './cart.model';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  storeCart() {
    const cart = this.cartService.getCartItems();
    var items = { items: cart };


    console.log(items);
    this.http
      .post(
        '/api/cart',
        items
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  // fetchRecipes() {
  //   return this.http
  //     .get<Cart[]>(
  //       'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json'
  //     )
  //     .pipe(
  //       map(recipes => {
  //         return recipes.map(recipe => {
  //           return {
  //             ...recipe,
  //             ingredients: recipe.ingredients ? recipe.ingredients : []
  //           };
  //         });
  //       }),
  //       tap(recipes => {
  //         this.recipeService.setRecipes(recipes);
  //       })
  //     );
  // }
}
