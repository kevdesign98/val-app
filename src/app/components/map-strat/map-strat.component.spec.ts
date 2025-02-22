import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapStratComponent } from './map-strat.component';

describe('MapStratComponent', () => {
  let component: MapStratComponent;
  let fixture: ComponentFixture<MapStratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapStratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapStratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
