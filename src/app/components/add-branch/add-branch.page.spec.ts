import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBranchPage } from './add-branch.page';

describe('AddBranchPage', () => {
  let component: AddBranchPage;
  let fixture: ComponentFixture<AddBranchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBranchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBranchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
