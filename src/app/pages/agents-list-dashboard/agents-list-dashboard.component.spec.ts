import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsListDashboardComponent } from './agents-list-dashboard.component';

describe('AgentsListDashboardComponent', () => {
  let component: AgentsListDashboardComponent;
  let fixture: ComponentFixture<AgentsListDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentsListDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentsListDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
