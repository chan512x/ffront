import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpageComponent } from './lpage.component';

describe('LpageComponent', () => {
  let component: LpageComponent;
  let fixture: ComponentFixture<LpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
