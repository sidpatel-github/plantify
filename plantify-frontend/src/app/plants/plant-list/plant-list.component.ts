import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart.service';
import { PlantsService } from 'src/app/plants.service';
import { Cart } from 'src/app/shared/cart.model';
import { Plant } from '../../plant.model';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {

  @Input('loadedPlants') loadedPlants: Plant[];
  paginationArray: Number[] = [];
  isFetching = false;

  constructor(private plantService: PlantsService, private cartService: CartService) {
    this.paginationArray = Array(5).fill(0).map((x, i) => i + 1);
  }

  ngOnInit() {
  }

  onPaginatioin(pageNum: number) {
    this.isFetching = true;

    this.plantService.fetchPlants(pageNum).subscribe(plants => {
      this.isFetching = false;
      console.log('*******HEY********' + plants[1].common_name)
      this.loadedPlants = plants;
    });
    // console.log(pageNum);
  }

  onAddCart(plant: Plant) {
    const newCartItem = new Cart(plant.id, plant.common_name, plant.image_url, 250, 1);
    this.cartService.addCartItem(newCartItem);
  }
}
