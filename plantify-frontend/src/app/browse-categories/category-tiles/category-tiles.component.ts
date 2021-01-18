import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PlantsService } from 'src/app/plants.service';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'app-category-tiles',
  templateUrl: './category-tiles.component.html',
  styleUrls: ['./category-tiles.component.css']
})
export class CategoryTilesComponent implements OnInit {
  categotyType: string;
  isFetching = false;
  categoryList: Category[] = [];

  constructor(private route: ActivatedRoute, private plantService: PlantsService) { }

  ngOnInit() {
    this.isFetching = true;

    this.route.params.subscribe((params: Params) => {
      this.categotyType = params.name;
    });

    this.plantService.fetchCategories(this.categotyType).subscribe(categories => {
      this.categoryList = categories;
      this.isFetching = false;
    });
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
