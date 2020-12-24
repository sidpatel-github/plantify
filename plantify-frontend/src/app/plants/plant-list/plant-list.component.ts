import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlantsService } from 'src/app/plants.service';
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

  constructor(private plantService: PlantsService) {
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
}
