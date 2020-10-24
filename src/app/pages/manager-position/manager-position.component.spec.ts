import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPositionComponent } from './manager-position.component';

describe('ManagerPositionComponent', () => {
  let component: ManagerPositionComponent;
  let fixture: ComponentFixture<ManagerPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
