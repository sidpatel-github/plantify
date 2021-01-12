import { Injectable } from '@angular/core';
import { Cart } from './shared/cart.model';

import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CartService {
  error = new Subject<string>();
  private cart: Cart[] = [];
  cartChanged = new Subject<Cart[]>();

  constructor() {
    const cartData: Cart[] = JSON.parse(localStorage.getItem('cartData'));
    console.log('cart constructor called');
    if (!cartData) {
      console.log('empty cart');
      return;
    }
    console.log('fille cart');
    this.cart = cartData
    this.cartChanged.next(this.cart.slice());

    console.log(this.cart);
  }

  getCartItems() {
    return this.cart.slice();
  }

  getCartItem(index: number) {
    return this.cart[index];
  }

  addCartItem(cart: Cart) {
    const existingCartItemIndex = this.doesCartContains(cart.plantId);
    if (existingCartItemIndex === -1) {
      console.log("match found!!!")
      this.cart.push(cart);
    } else {
      console.log("match not found!!!")
      this.cart[existingCartItemIndex] = cart;
    }
    localStorage.setItem('cartData', JSON.stringify(this.cart.slice()));
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

  emptyCart() {
    this.cart = [];
    this.cartChanged.next(this.cart.slice());
  }

  doesCartContains(id: string) {
    return this.cart.findIndex(plant => plant.plantId === id);
  }

  getCartTotal() {
    let total: number = 0;
    this.cart.forEach(cart => {
      total += (cart.amount * cart.quantity)
    });
    return total;
  }
}
