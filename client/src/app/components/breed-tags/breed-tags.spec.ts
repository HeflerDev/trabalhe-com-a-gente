import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedTags } from './breed-tags';

describe('BreedTags', () => {
  let component: BreedTags;
  let fixture: ComponentFixture<BreedTags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedTags]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedTags);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
