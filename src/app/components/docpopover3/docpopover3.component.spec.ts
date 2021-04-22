import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Docpopover3Component } from './docpopover3.component';

describe('Docpopover3Component', () => {
  let component: Docpopover3Component;
  let fixture: ComponentFixture<Docpopover3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Docpopover3Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Docpopover3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
