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
  protected readonly title = signal('Cat Gallery');

  protected queryConfig: {
    limit: number;
    page: number;
    order: 'ASC' | 'DESC' | 'RAND';
    query: string;
  } = {
    limit: 10,
    page: 0,
    order: 'DESC',
    query: '',
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
  public showAllBreeds: boolean = false;
  public currentPage: number = 1;
  public pageSize: number = 10;

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

    this.queryConfig.query = term;
    this.queryConfig.page = 0;

    this.catService
      .getImages(
        this.queryConfig.limit,
        this.queryConfig.page,
        this.queryConfig.order,
        1,
        [this.queryConfig.query],
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
    this.queryConfig.query = breedName.slice(0, 4);
    this.selectedBreed = breedName;
    this.queryConfig.page = 0;
    this.catService
      .getImages(
        this.queryConfig.limit,
        this.queryConfig.page,
        this.queryConfig.order,
        1,
        [this.queryConfig.query],
        undefined,
        this.userId,
      )
      .subscribe((images) => {
        this.images = images;
      });
  }

  nextPage() {
    this.queryConfig.page += 1;
    this.catService
      .getImages(
        this.queryConfig.limit,
        this.queryConfig.page,
        this.queryConfig.order,
        1,
        [this.queryConfig.query],
        undefined,
        this.userId,
      )
      .subscribe((images) => {
        this.images = images;
      });
  }

  previousPage() {
    this.queryConfig.page -= 1;
    this.catService
      .getImages(
        this.queryConfig.limit,
        this.queryConfig.page,
        this.queryConfig.order,
        1,
        [this.queryConfig.query],
        undefined,
        this.userId,
      )
      .subscribe((images) => {
        this.images = images;
      });
  }
}
