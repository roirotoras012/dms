import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PdfviewerPage } from './pdfviewer.page';

describe('PdfviewerPage', () => {
  let component: PdfviewerPage;
  let fixture: ComponentFixture<PdfviewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfviewerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PdfviewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
