import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './cat-list.html',
  styleUrl: './cat-list.scss',
})
export class CatList {
  @Input() images: any[] = [];
  @Input() userId: string = '';
  @Output() vote = new EventEmitter<{ image_id: string; sub_id: string; value: number }>();
}
