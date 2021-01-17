import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-category-tiles',
  templateUrl: './category-tiles.component.html',
  styleUrls: ['./category-tiles.component.css']
})
export class CategoryTilesComponent implements OnInit {
  categotyType: string
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.categotyType = params.name;
    });
  }

}
