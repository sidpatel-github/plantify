import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from '../shared/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  loadedCart: Cart[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.loadedCart = this.cartService.getCartItems();
    console.log('=========loadedCart=============')
    console.log(this.loadedCart)

    this.cartService.cartChanged
      .subscribe(
        (cart: Cart[]) => {
          this.loadedCart = cart;
        }
      );
  }

  onDeleteCartItem(index: number) {
    this.cartService.deleteCartItem(index);
  }
}
