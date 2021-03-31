import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RightclickComponent } from './rightclick.component';

describe('RightclickComponent', () => {
  let component: RightclickComponent;
  let fixture: ComponentFixture<RightclickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightclickComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RightclickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
