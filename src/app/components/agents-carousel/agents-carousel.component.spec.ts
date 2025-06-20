import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsCarouselComponent } from './agents-carousel.component';

describe('AgentsCarouselComponent', () => {
  let component: AgentsCarouselComponent;
  let fixture: ComponentFixture<AgentsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentsCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
