import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocpopoverComponent } from './docpopover.component';

describe('DocpopoverComponent', () => {
  let component: DocpopoverComponent;
  let fixture: ComponentFixture<DocpopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocpopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocpopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
