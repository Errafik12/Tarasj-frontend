import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeventappComponent } from './addeventapp.component';

describe('AddeventappComponent', () => {
  let component: AddeventappComponent;
  let fixture: ComponentFixture<AddeventappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeventappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeventappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
