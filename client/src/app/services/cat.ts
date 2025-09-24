import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CatWeight {
  imperial: string;
  metric: string;
}

export interface CatBreed {
  weight: CatWeight;
  id: string;
  name: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  life_span: string;
  wikipedia_url: string;
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: CatBreed[];
}


export interface ICat {
  getImages(
    limit?: number,
    page?: number,
    order?: 'ASC' | 'DESC' | 'RAND',
    has_breeds?: number,
    breed_ids?: string[],
    category_ids?: string[],
    sub_id?: string
  ): Observable<CatImage[]>;
}

@Injectable({
  providedIn: 'root'
})

export class Cat implements ICat {
  constructor(private http: HttpClient) { }
  private apiUrl = "https://api.thecatapi.com/v1"


  public getImages(
    limit = 10,
    page = 0,
    order: 'ASC' | 'DESC' | 'RAND' = 'RAND',
    has_breeds = 0,
    breed_ids?: string[],
    category_ids?: string[],
    sub_id?: string
  ): Observable<CatImage[]> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      order,
      has_breeds: has_breeds.toString(),
    });

    if (breed_ids?.length) params.append('breed_ids', breed_ids.join(','));
    if (category_ids?.length) params.append('category_ids', category_ids.join(','));
    if (sub_id) params.append('sub_id', sub_id);

    return this.http.get<CatImage[]>(
      `${this.apiUrl}/images/search?${params.toString()}`
    );
  }

}
