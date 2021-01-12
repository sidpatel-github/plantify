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
  isLoading = false;

  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   autoWidth: true,
  //   autoHeight: true,
  //   // merge: false,
  //   navText: ['Previous', 'Next'],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 4
  //     }
  //   },
  //   nav: true
  // }

  constructor(private route: ActivatedRoute,
    private plantService: PlantsService,
    private cartService: CartService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    this.isLoading = true;

    this.plantService.fetchPlant(id).subscribe(plant => {
      this.loadedPlant = plant;
    });

    this.plantService.plantChanged
      .subscribe(
        (plant: Plant) => {
          this.loadedPlant = plant;
          this.isLoading = false;
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
