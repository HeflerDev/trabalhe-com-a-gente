import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './cat-list.html',
})
export class CatList {
  @Input() images: any[] = [];
  @Input() userId: string = '';
  @Input() vote: (image_id: string, sub_id: string, value: number) => void = () => {};
}
