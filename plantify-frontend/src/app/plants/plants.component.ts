import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Plant } from '../plant.model';
import { PlantsService } from '../plants.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {
  loadedPlants: Plant[] = [];
  isFetching = false;
  categotyType: string;
  id: string;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private plantService: PlantsService
  ) { }

  ngOnInit() {
    this.isFetching = true;

    this.route.params.subscribe((params: Params) => {
      this.categotyType = params.categotyType;
      this.id = params.id;
    });
    if (this.id != null && this.categotyType) {

      this.plantService.fetchPlantsUsingCategories(this.categotyType, +this.id).subscribe(plants => {
        this.loadedPlants = plants;
        console.error(this.loadedPlants)
        this.isFetching = false;
      });

    } else {
      this.plantService.fetchPlants(1).subscribe(plants => {
        this.isFetching = false;
        this.loadedPlants = plants;
      }
        // , error => {
        //   this.isFetching = false;
        //   this.error = error.message;
        // }
      );
    }

    this.subscription = this.plantService.plantsChanged
      .subscribe(
        (plants: Plant[]) => {
          this.loadedPlants = plants;
          // console.log('******** inside subscription ********' + this.loadedPlants)
        }
      );
  }
}
