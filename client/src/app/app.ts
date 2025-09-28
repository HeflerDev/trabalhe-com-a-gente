import { Component, signal, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchBar } from './components/search-bar/search-bar';
import { Cat } from './services/cat';
import { Track } from './services/track';
import { CommonModule } from '@angular/common';
import { Breeds, CatImage } from './services/cat.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchBar, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('client');

  private queryConfig: {
    limit: number;
    page: number;
    order: 'ASC' | 'DESC' | 'RAND';
  } = {
    limit: 10,
    page: 0,
    order: 'RAND',
  };

  constructor(
    private catService: Cat,
    private trackService: Track,
  ) {}

  public selectedBreed: string = '';
  public images: CatImage[] = [];
  public breeds: Breeds[] = [];
  public userId!: string;
  public votes: Record<string, number> = {};

  ngOnInit(): void {
    this.userId = this.trackService.getUserTrack();
    this.catService.getBreeds().subscribe((breeds) => {
      this.breeds = breeds;
    });
  }

  onSearch(term: string) {
    if (!term) {
      this.images = [];
      return;
    }

    this.catService
      .getImages(
        this.queryConfig.limit,
        this.queryConfig.page,
        this.queryConfig.order,
        1,
        [term],
        undefined,
        this.userId,
      )
      .subscribe((images) => {
        this.images = images;
      });
  }

  vote(image_id: string, sub_id: string, value: number) {
    if (!image_id || !sub_id || value === null || value === undefined) return;

    this.catService.postVote(image_id, sub_id, value).subscribe({
      next: () => (this.votes[image_id] = value),
      error: (err: any) => console.error('Vote failed:', err),
    });
  }

  filterByBreed(breedName: string) {
    const shortBreedName = breedName.slice(0, 4);
    this.selectedBreed = breedName;
    this.catService
      .getImages(
        this.queryConfig.limit,
        this.queryConfig.page,
        this.queryConfig.order,
        1,
        [shortBreedName],
        undefined,
        this.userId,
      )
      .subscribe((images) => {
        this.images = images;
      });
  }
}
