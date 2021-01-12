import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { CartService } from '../cart.service';
import { Cart } from '../shared/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  loggedInUser: User;
  email: string;
  cartItemCount: number = 0;
  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.email = user.email;
      }
      console.log(user);
    });

    this.cartService.cartChanged
      .subscribe(
        (cart: Cart[]) => {
          this.cartItemCount = cart.length;
          console.log("cart subscriber called")
        }
      );
  }
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
