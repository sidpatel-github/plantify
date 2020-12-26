import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Plant } from 'src/app/plant.model';
import { PlantsService } from 'src/app/plants.service';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.css']
})
export class PlantDetailsComponent implements OnInit {
  @Input('loadedPlants') loadedPlant: Plant;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private plantService: PlantsService) { }

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

}
