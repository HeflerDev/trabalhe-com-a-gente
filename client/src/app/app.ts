import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBar } from './components/search-bar/search-bar';
import { Cat } from './services/cat';
import { Track } from './services/track';
import { CommonModule } from '@angular/common';
import { CatImage } from './services/cat.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchBar, CommonModule],
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

  ngOnInit(): void {
    this.userId = this.trackService.getUserTrack();
    // TODO: Remove This
    console.log('User Id', this.userId);
  }

  onSearch(term: string) {
    if (!term) {
      this.images = [];
      return;
    }

    this.catService.getImages(3, 0, 'RAND', 1, [term], undefined, term).subscribe((images) => {
      this.images = images;
    });
  }
}
