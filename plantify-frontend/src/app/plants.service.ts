import { Injectable } from '@angular/core';
import { Plant } from './plant.model';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { PlantQueries } from './graphql/plant-queries';
import { CategoryQueries } from './graphql/category-queries';
import { Category } from './shared/category.model';


@Injectable({ providedIn: 'root' })
export class PlantsService {
  error = new Subject<string>();
  plantsChanged = new Subject<Plant[]>();
  plantChanged = new Subject<Plant>();

  // private plants: Plant[] = [];

  constructor(private http: HttpClient, private apollo: Apollo
    , private plantQueries: PlantQueries,
    private categoryQueries: CategoryQueries,
  ) { }

  fetchPlants(page: number) {
    return this.apollo.watchQuery<[Plant]>({
      query: this.plantQueries.getPlants(),
      variables: { page: page },
    }).valueChanges.pipe(map(result => {
      const loadedplantsArray: Plant[] = [];
      const tempRes = result['data']['plants']['data'];
      for (const key in tempRes) {
        loadedplantsArray.push({ ...tempRes[key] });
      }
      this.plantsChanged.next(loadedplantsArray);
      return loadedplantsArray;
    }));
  }

  fetchPlant(id: number) {
    return this.apollo.watchQuery<Plant>({
      query: this.plantQueries.getPlant(),
      variables: { id: id },
    }).valueChanges.pipe(map(result => {
      let loadedplant: Plant;
      const tempRes = result['data']['plant']['data'];
      loadedplant = { ...tempRes };
      const responseImages = tempRes['main_species']['images'];
      // console.log('================')
      // console.log(responseImages)
      loadedplant.images = [];
      loadedplant.images.push(loadedplant.image_url)
      if (responseImages.leaf != null) {
        loadedplant.images.push(responseImages.leaf[0].image_url)
      }
      if (responseImages.flower != null) {
        loadedplant.images.push(responseImages.flower[0].image_url)
      }
      if (responseImages.fruit != null) {
        loadedplant.images.push(responseImages.fruit[0].image_url)
      }
      if (responseImages.habit != null) {
        loadedplant.images.push(responseImages.habit[0].image_url)
      }
      this.plantChanged.next(loadedplant);
      return loadedplant;
    }));
  }

  fetchCategories(categoryType: string) {
    return this.apollo.watchQuery<[Category]>({
      query: this.categoryQueries.getCategory(),
      variables: { categoryType: categoryType },
    }).valueChanges.pipe(map(result => {
      const loadedCategoriesArray: Category[] = [];
      const tempRes = result['data']['category']['data'];
      console.log(tempRes);
      for (const key in tempRes) {
        loadedCategoriesArray.push({ ...tempRes[key] });
      }
      return loadedCategoriesArray;
    }));
  }

  fetchPlantsUsingCategories(categoryType: string, id: number) {
    return this.apollo.watchQuery<[Plant]>({
      query: this.categoryQueries.getPlantsFromCategory(),
      variables: {
        categoryType: categoryType,
        id: id
      },
    }).valueChanges.pipe(map(result => {
      const loadedplantsArray: Plant[] = [];
      const tempRes = result['data']['categoryPlants']['data'];
      for (const key in tempRes) {
        loadedplantsArray.push({ ...tempRes[key] });
      }
      this.plantsChanged.next(loadedplantsArray);
      return loadedplantsArray;
    }));
  }

}
