import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class Track {
  private readonly storageKey = 'any';

  getUserTrack(): string {
    let userId = localStorage.getItem(this.storageKey);
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem(this.storageKey, userId);
    }
    return userId;
  }
}
