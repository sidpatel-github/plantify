import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Plant } from '../plant.model';
import { PlantsService } from '../plants.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {
  loadedPlants: Plant[] = [];

  constructor(private http: HttpClient,
    private plantService: PlantsService
  ) { }

  ngOnInit() {
    console.log("plants loaded");
    this.plantService.fetchPosts().subscribe(plants => {
      // this.isFetching = false;
      this.loadedPlants = plants;
    }
      // , error => {
      //   this.isFetching = false;
      //   this.error = error.message;
      // }
    );

    console.log("loaded plants after init = " + this.loadedPlants);
  }

}
