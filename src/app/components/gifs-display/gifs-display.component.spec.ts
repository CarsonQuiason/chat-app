import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifsDisplayComponent } from './gifs-display.component';

describe('GifsDisplayComponent', () => {
  let component: GifsDisplayComponent;
  let fixture: ComponentFixture<GifsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GifsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GifsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
