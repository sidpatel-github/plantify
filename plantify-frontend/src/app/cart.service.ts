import { Injectable } from '@angular/core';
import { Cart } from './shared/cart.model';

import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CartService {
  error = new Subject<string>();
  private cart: Cart[] = [];
  cartChanged = new Subject<Cart[]>();

  getCartItems() {
    return this.cart.slice();
  }

  getCartItem(index: number) {
    return this.cart[index];
  }

  addCartItem(cart: Cart) {

    const existingCartItemIndex = this.doesCartContains(cart.plantId);
    if (existingCartItemIndex === -1) {
      this.cart.push(cart);
    } else {
      this.cart[existingCartItemIndex] = cart;
    }
    this.cartChanged.next(this.cart.slice());
  }

  addCartItems(cart: Cart[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.cart.push(...cart);
    this.cartChanged.next(this.cart.slice());
  }

  updateCartItem(index: number, newCart: Cart) {
    this.cart[index] = newCart;
    this.cartChanged.next(this.cart.slice());
  }

  deleteCartItem(index: number) {
    this.cart.splice(index, 1);
    this.cartChanged.next(this.cart.slice());
  }

  doesCartContains(id: string) {
    return this.cart.findIndex(plant => plant.plantId === id);
  }
}
