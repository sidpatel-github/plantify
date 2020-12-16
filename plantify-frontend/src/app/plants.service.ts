import { Injectable } from '@angular/core';
import { Plant } from './plant.model';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';


const PLANTS_QUERY = gql`
query {
  plants {
    data {
      id
      slug
      genus_id
    }
  }
}
`;

@Injectable({ providedIn: 'root' })
export class PlantsService {
  error = new Subject<string>();
  loadedPlants: Plant[] = [];
  private query: QueryRef<any>;

  constructor(private http: HttpClient, private apollo: Apollo) { }

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

  fetchPosts() {
    console.log("fetch");

    return this.apollo.watchQuery({
      query: PLANTS_QUERY
    }).valueChanges.pipe(map(result => {
      // const plantsArray: Plant[] = [];
      const tempRes = result['data']['plants']['data'];
      for (const key in tempRes) {
        // console.log("==== key ====");
        this.loadedPlants.push({ ...tempRes[key] });
      }
      return this.loadedPlants;
    }));
    // .subscribe(result => {
    //   console.log("==== result ====");
    //   console.log(result);
    // });
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
