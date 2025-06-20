import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsCarouselComponent } from './maps-carousel.component';

describe('MapsCarouselComponent', () => {
  let component: MapsCarouselComponent;
  let fixture: ComponentFixture<MapsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapsCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
