import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Cat {
  constructor(private apollo: Apollo) {}

  getImages(
    limit = 10,
    page = 0,
    order: 'ASC' | 'DESC' | 'RAND' = 'RAND',
    has_breeds = 0,
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
        }
      }
    `;

    console.log('Reached API');

    return this.apollo
      .watchQuery({
        query: GetCatImages,
        variables: { limit, page, order, has_breeds, breed_ids, category_ids, sub_id },
      })
      .valueChanges.pipe(map((result) => (result.data as any).getCatImages));
  }
}
