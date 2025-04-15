import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsDetailsComponent } from './agents-details.component';

describe('AgentsDetailsComponent', () => {
  let component: AgentsDetailsComponent;
  let fixture: ComponentFixture<AgentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
