import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart.service';
import { Plant } from 'src/app/plant.model';
import { PlantsService } from 'src/app/plants.service';
import { Cart } from 'src/app/shared/cart.model';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.css']
})
export class PlantDetailsComponent implements OnInit {
  @Input('loadedPlants') loadedPlant: Plant;
  @ViewChild('f') cartForm: NgForm;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private plantService: PlantsService,
    private cartService: CartService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    console.log('id' + id)


    this.plantService.fetchPlant(id).subscribe(plant => {
      this.loadedPlant = plant;
    });

    this.subscription = this.plantService.plantChanged
      .subscribe(
        (plant: Plant) => {
          this.loadedPlant = plant;
          console.log('******** inside subscription ********')
          console.log(this.loadedPlant)
        }
      );
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
    const newCartItem = new Cart(this.loadedPlant.id, this.loadedPlant.common_name, this.loadedPlant.image_url, 250, value.quantity);
    this.cartService.addCartItem(newCartItem);
    form.reset();
  }

}
