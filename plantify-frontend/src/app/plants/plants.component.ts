import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  private subscription: Subscription;

  constructor(private http: HttpClient,
    private plantService: PlantsService
  ) { }

  ngOnInit() {
    this.isFetching = true;
    this.plantService.fetchPlants(1).subscribe( plants => {
      this.isFetching = false;
      this.loadedPlants = plants;
    }
      // , error => {
      //   this.isFetching = false;
      //   this.error = error.message;
      // }
    );

    this.subscription = this.plantService.plantsChanged
      .subscribe(
        (plants: Plant[]) => {
          this.loadedPlants = plants;
          // console.log('******** inside subscription ********' + this.loadedPlants)
        }
      );
  }
}
