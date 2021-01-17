import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-plant-list-filter',
  templateUrl: './plant-list-filter.component.html',
  styleUrls: ['./plant-list-filter.component.css']
})
export class PlantListFilterComponent implements OnInit {
  value: number = 100;
  highValue: number = 60;

  options: Options = {
    floor: 0,
    ceil: 200
  };
  constructor() { }

  ngOnInit() {
  }

}
