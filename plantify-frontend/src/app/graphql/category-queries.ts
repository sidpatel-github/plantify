import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable({ providedIn: 'root' })
export class CategoryQueries {

  getCategory() {
    return gql`
        query($categoryType: String!) {
          category(categoryType:$categoryType) {
            data {
              id,
              slug
            }
          }
        }
        `;
  }

  getPlantsFromCategory() {
    return gql`
        query($categoryType: String!, $id: ID!) {
          categoryPlants(categoryType:$categoryType, id:$id) {
            data {
                id,
                slug,
                genus_id,
                image_url,
                common_name
            }
          }
        }
        `;
  }

}
