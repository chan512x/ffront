import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SresultsComponent } from './sresults.component';

describe('SresultsComponent', () => {
  let component: SresultsComponent;
  let fixture: ComponentFixture<SresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SresultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
