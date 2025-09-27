import { Component, signal, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchBar } from './components/search-bar/search-bar';
import { Cat } from './services/cat';
import { Track } from './services/track';
import { CommonModule } from '@angular/common';
import { CatImage } from './services/cat.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchBar, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('client');

  constructor(
    private catService: Cat,
    private trackService: Track,
  ) {}

  public images: CatImage[] = [];
  public userId!: string;
  public votes: Record<string, number> = {};

  ngOnInit(): void {
    this.userId = this.trackService.getUserTrack();
  }

  onSearch(term: string) {
    if (!term) {
      this.images = [];
      return;
    }

    this.catService
      .getImages(3, 0, 'RAND', 1, [term], undefined, this.userId)
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
}
