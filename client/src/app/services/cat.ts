import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreedList, Breeds } from './cat.type';

@Injectable({ providedIn: 'root' })
export class Cat {
  constructor(private apollo: Apollo) {}

  getImages(
    limit = 10,
    page = 0,
    order: 'ASC' | 'DESC' | 'RAND' = 'RAND',
    has_breeds = 1,
    breed_ids?: string[],
    category_ids?: string[],
    sub_id?: string,
  ): Observable<any[]> {
    const GetCatImages = gql`
      query GetCatImages(
        $limit: Int
        $page: Int
        $order: String
        $has_breeds: Int
        $breed_ids: [String]
        $category_ids: [String]
        $sub_id: String
      ) {
        getCatImages(
          limit: $limit
          page: $page
          order: $order
          has_breeds: $has_breeds
          breed_ids: $breed_ids
          category_ids: $category_ids
          sub_id: $sub_id
        ) {
          id
          url
          width
          height
          breeds {
            id
            name
            origin
            temperament
            weight {
              imperial
              metric
            }
          }
        }
      }
    `;

    return this.apollo
      .watchQuery({
        query: GetCatImages,
        variables: { limit, page, order, has_breeds, breed_ids, category_ids, sub_id },
      })
      .valueChanges.pipe(map((result) => (result.data as any).getCatImages));
  }

  getBreeds(): Observable<Breeds[]> {
    const GetBreeds = gql`
      query GetBreeds {
        getBreedList {
          name
        }
      }
    `;

    return this.apollo
      .query<{ getBreedList: Breeds[] }>({
        query: GetBreeds,
      })
      .pipe(map((result) => result.data.getBreedList as any));
  }

  postVote(image_id: string, sub_id: string, value: number): any {
    try {
      const PostVote = gql`
        mutation PostVote($image_id: String!, $sub_id: String, $value: Int!) {
          postVote(image_id: $image_id, sub_id: $sub_id, value: $value) {
            message
            id
            image_id
            sub_id
            value
            country_code
          }
        }
      `;

      return this.apollo
        .mutate({
          mutation: PostVote,
          variables: { image_id, sub_id, value },
        })
        .pipe(map((result) => result.data as any));
    } catch (error: any) {
      throw new Error(`Failed to post vote: ${error.message}`);
    }
  }
}
