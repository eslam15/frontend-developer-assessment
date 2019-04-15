import { TestBed, async } from '@angular/core/testing';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsersComponent
      ],
    }).compileComponents();
  }));

  it('should create the users', () => {
    const fixture = TestBed.createComponent(UsersComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});