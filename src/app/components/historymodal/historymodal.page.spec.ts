import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistorymodalPage } from './historymodal.page';

describe('HistorymodalPage', () => {
  let component: HistorymodalPage;
  let fixture: ComponentFixture<HistorymodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorymodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorymodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
