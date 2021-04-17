import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewBranchPage } from './view-branch.page';

describe('ViewBranchPage', () => {
  let component: ViewBranchPage;
  let fixture: ComponentFixture<ViewBranchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBranchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewBranchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
