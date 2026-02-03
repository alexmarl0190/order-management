import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Agreements } from './agreements';

describe('Agreements', () => {
  let component: Agreements;
  let fixture: ComponentFixture<Agreements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Agreements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Agreements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
