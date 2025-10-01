import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-breed-tags',
  templateUrl: './breed-tags.html',
  styleUrl: './breed-tags.scss',
  imports: [MatButtonModule, CommonModule],
  standalone: true,
})
export class BreedTags {
  readonly breeds = input<any[]>([]);
  @Input() showAllBreeds: boolean = false;
  readonly selectedBreed = input<string>('');
  @Output() filterByBreed = new EventEmitter<string>();
}
