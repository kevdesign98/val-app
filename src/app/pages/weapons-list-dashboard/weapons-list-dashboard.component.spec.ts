import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponsListDashboardComponent } from './weapons-list-dashboard.component';

describe('WeaponsListDashboardComponent', () => {
  let component: WeaponsListDashboardComponent;
  let fixture: ComponentFixture<WeaponsListDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaponsListDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeaponsListDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
