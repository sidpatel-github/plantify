import { Injectable } from '@angular/core';
import { Plant } from './plant.model';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { PlantQueries } from './graphql/plant-queries';

const PLANTS_QUERY = gql`
query {
  plants {
    data {
      id
      slug
      genus_id,
      image_url,
      common_name
    }
  }
}
`;

@Injectable({ providedIn: 'root' })
export class PlantsService {
  error = new Subject<string>();
  plantsChanged = new Subject<Plant[]>();
  plantChanged = new Subject<Plant>();

  // private plants: Plant[] = [];

  constructor(private http: HttpClient, private apollo: Apollo, private plantQueries: PlantQueries) { }

  // createAndStorePost(title: string, content: string) {
  //   const postData: Post = {
  //     title: title, content: content
  //   };
  //   this.http
  //     .post<{ name: string }>(
  //       'https://ng-recipe-guide.firebaseio.com/posts.json',
  //       postData,
  //       {
  //         observe: 'response'
  //       }
  //     )
  //     .subscribe(responseData => {
  //       console.log(responseData);
  //     }, error => {
  //       this.error.next(error.message);
  //     });
  // }

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
    // .subscribe(result => {
    //   console.log("==== result ====");
    //   console.log(result);
    // });
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
      console.log('================')
      console.log(responseImages)
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

  // deletePosts() {
  //   return this.http
  //     .delete(
  //       'https://ng-recipe-guide.firebaseio.com/posts.json',
  //       {
  //         observe: 'events',
  //         responseType: 'text'
  //       }
  //     ).pipe(tap(event => {

  //       if (event.type === HttpEventType.Sent) {
  //         console.log("request sent");
  //       }
  //       if (event.type === HttpEventType.Response) {
  //         console.log(event.body);
  //       }
  //       // console.log(event);
  //     }));
  // }

}
