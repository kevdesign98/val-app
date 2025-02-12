import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMapsComponent } from './list-maps.component';

describe('ListMapsComponent', () => {
  let component: ListMapsComponent;
  let fixture: ComponentFixture<ListMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMapsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
