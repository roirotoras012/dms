import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuditorPage } from './auditor.page';

describe('AuditorPage', () => {
  let component: AuditorPage;
  let fixture: ComponentFixture<AuditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
