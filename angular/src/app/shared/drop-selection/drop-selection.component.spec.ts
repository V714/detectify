import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropSelectionComponent } from './drop-selection.component';

describe('DropSelectionComponent', () => {
  let component: DropSelectionComponent;
  let fixture: ComponentFixture<DropSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
