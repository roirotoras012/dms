import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditModalPage } from './edit-modal.page';

describe('EditModalPage', () => {
  let component: EditModalPage;
  let fixture: ComponentFixture<EditModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
