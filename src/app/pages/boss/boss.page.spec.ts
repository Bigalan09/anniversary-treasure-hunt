import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BossPage } from './boss.page';

describe('BossPage', () => {
  let component: BossPage;
  let fixture: ComponentFixture<BossPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BossPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BossPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
