import { Component, Input, OnInit } from '@angular/core';
import { Plant } from '../../plant.model';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {

  @Input('loadedPlants') loadedPlants: Plant[] = [];

  constructor() { }

  ngOnInit() {
    console.log("====== inside list =======" + this.loadedPlants);
  }

}
