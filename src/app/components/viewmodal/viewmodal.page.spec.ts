import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewmodalPage } from './viewmodal.page';

describe('ViewmodalPage', () => {
  let component: ViewmodalPage;
  let fixture: ComponentFixture<ViewmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
