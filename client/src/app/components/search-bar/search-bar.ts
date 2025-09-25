import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar {
  @Output() search = new EventEmitter<string>();

  public searchTerm: string = '';

  private subscription: Subscription; // Subscription is a listener?
  private searchSubject = new Subject<string>()

  constructor() {
    this.subscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((term) => {
      this.search.emit(term.trim())
    })
  }

  onInputChange(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onSearch(): void {
    this.search.emit(this.searchTerm.trim());
  }

  clear(): void {
    this.searchTerm = '';
    this.search.emit('');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

