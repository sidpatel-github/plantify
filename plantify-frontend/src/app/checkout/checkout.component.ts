import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Cart } from '../shared/cart.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Order } from '../shared/order.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('f') checkoutForm: NgForm;
  order = new Order();
  loadedCart: Cart[] = [];
  total: number

  isLoading = false;
  error: string;
  constructor(private dataStorageService: DataStorageService, private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.loadedCart = this.cartService.getCartItems();
    this.total = this.cartService.getCartTotal();
  }

  onSubmit() {
    console.log(this.checkoutForm);

    if (this.checkoutForm.invalid) {
      console.log('form invalid')
      return;
    }

    this.order.first_name = this.checkoutForm.value.firstName;
    this.order.last_name = this.checkoutForm.value.lastName;
    this.order.email = this.checkoutForm.value.email;
    this.order.phoneNo = +this.checkoutForm.value.phone;
    this.order.address = this.checkoutForm.value.address;
    this.order.city = this.checkoutForm.value.city;
    this.order.state = this.checkoutForm.value.state;
    this.order.amount = 250;
    this.order.datetime = new Date();

    this.isLoading = true;
    this.dataStorageService.storeCart().subscribe(response => {
      this.cartService.emptyCart();
      console.log("*****cart empty*****")

      this.dataStorageService.placeOrder(this.order).subscribe(response => {

        console.log(response)
        this.isLoading = false;
        this.error = 'success'
        this.router.navigate(['/']);
      }, error => {
        this.isLoading = false;
        this.error = error
        console.error('error caught in checkout component')
      });
    }, error => {
      this.isLoading = false;
      this.error = error
      console.error('error caught in cart component')
    });

    this.checkoutForm.reset();
  }
}
