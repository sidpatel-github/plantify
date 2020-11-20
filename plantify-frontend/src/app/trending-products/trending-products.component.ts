import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending-products',
  templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.css']
})
export class TrendingProductsComponent implements OnInit {
  public trendingPlants: { id: number, name: string, price: number, image: string } []= [
    {
      id: 1,
      name: 'Kui Ye Chen’s AirPods',
      image: 'product-1.jpg',
      price: 250,
    },
    {
      id: 2,
      name: 'Air Jordan 12 gym red',
      image: 'product-2.jpg',
      price: 250,
    },
    {
      id: 3,
      name: 'Cyan cotton t-shirt',
      image: 'product-3.jpg',
      price: 250,
    },
    {
      id: 4,
      name: 'Timex Unisex Originals',
      image: 'product-4.jpg',
      price: 250,
    },
    {
      id: 5,
      name: 'Red digital smartwatch',
      image: 'product-5.jpg',
      price: 250,
    },
    {
      id: 4,
      name: 'Nike air max 95',
      image: 'product-6.jpg',
      price: 250,
    },
    {
      id: 4,
      name: 'Joemalone Women prefume',
      image: 'product-7.jpg',
      price: 250,
    },
    {
      id: 4,
      name: 'Apple Watch',
      image: 'product-8.jpg',
      price: 250,
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
