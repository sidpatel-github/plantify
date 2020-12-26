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

  getPlant() {
    return gql`
          query($id: ID!) {
            plant(id:$id) {
              data {
                id
                slug
                genus_id,
                image_url,
                common_name,
                main_species{
                  images{
                    fruit { image_url },
                    habit { image_url },
                    leaf { image_url },
                    flower { image_url },
                  }
                }
              }
            }
          }
        `;
  }

}
