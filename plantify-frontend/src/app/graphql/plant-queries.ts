import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable({ providedIn: 'root' })
export class PlantQueries {

  getPlants() {
    return gql`
          query($page: Int!) {
            plants(page:$page) {
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
  }

}
