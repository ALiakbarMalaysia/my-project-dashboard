import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageConrolComponent } from './image-conrol.component';

describe('ImageConrolComponent', () => {
  let component: ImageConrolComponent;
  let fixture: ComponentFixture<ImageConrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageConrolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageConrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
