import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Docpopover2Component } from './docpopover2.component';

describe('Docpopover2Component', () => {
  let component: Docpopover2Component;
  let fixture: ComponentFixture<Docpopover2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Docpopover2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Docpopover2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
