import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticalLabsComponent } from './tactical-labs.component';

describe('TacticalLabsComponent', () => {
  let component: TacticalLabsComponent;
  let fixture: ComponentFixture<TacticalLabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TacticalLabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TacticalLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
