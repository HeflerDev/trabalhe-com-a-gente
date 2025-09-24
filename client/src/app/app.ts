import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBar } from './components/search-bar/search-bar';
import { Cat, CatImage } from './services/cat';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('client');

  constructor(private catService: Cat) { }

  public images: CatImage[] = []

  onSearch(term: string) {
    if (!term) {
      this.images = [];
      return;
    }

    this.catService.getImages(10, 0, 'RAND', 1, undefined, undefined, term)
      .subscribe((images) => {
        this.images = images;
      });
  }
}
