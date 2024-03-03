import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgageControlComponent } from './imgage-control.component';

describe('ImgageControlComponent', () => {
  let component: ImgageControlComponent;
  let fixture: ComponentFixture<ImgageControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgageControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgageControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
