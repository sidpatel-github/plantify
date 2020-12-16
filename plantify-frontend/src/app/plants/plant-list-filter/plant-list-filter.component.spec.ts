import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantListFilterComponent } from './plant-list-filter.component';

describe('PlantListFilterComponent', () => {
  let component: PlantListFilterComponent;
  let fixture: ComponentFixture<PlantListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
