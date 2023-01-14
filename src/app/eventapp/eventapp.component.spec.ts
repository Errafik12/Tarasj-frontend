import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventappComponent } from './eventapp.component';

describe('EventappComponent', () => {
  let component: EventappComponent;
  let fixture: ComponentFixture<EventappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
