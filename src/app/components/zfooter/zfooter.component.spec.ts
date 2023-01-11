import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZfooterComponent } from './zfooter.component';

describe('ZfooterComponent', () => {
  let component: ZfooterComponent;
  let fixture: ComponentFixture<ZfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZfooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
