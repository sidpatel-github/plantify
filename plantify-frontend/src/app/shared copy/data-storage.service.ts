import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap, catchError } from 'rxjs/operators';

import { Cart } from './cart.model';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart.service';
import { Order } from './order.model';
import { throwError } from 'rxjs';

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
    return this.http
      .post(
        '/api/cart',
        items
      ).pipe(
        catchError((err) => {
          console.log('error caught in storing cart')
          return throwError(err);
        })
      )
  }

  placeOrder(order: Order) {
    console.log(order);
    return this.http
      .post<Order>(
        '/api/order',
        order
      ).pipe(
        catchError((err) => {
          console.log('error caught in checkout')
          return throwError(err);
        })
      )
  }
}
