import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  template: `
    <div>
      <ng-container *ngTemplateOutlet="modal"> </ng-container>
    </div>
    <app-root> </app-root> 
  `,
})
class WrapperComponent implements AfterViewInit {
  @ViewChild(AppComponent) appComponentRef: AppComponent;
  modal: TemplateRef<any>;
  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit() {
    this.modal = this.appComponentRef.modalRef;
    this.cdr.detectChanges();
  }
}
describe('AppComponent', () => {
  let fixture: ComponentFixture<WrapperComponent>;
  let wrapperComponent: WrapperComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WrapperComponent, AppComponent],
        imports: [ModalModule.forRoot()],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapperComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', () => {
    expect(wrapperComponent).toBeDefined();
    expect(wrapperComponent.appComponentRef).toBeDefined();
  });
  it('should have title in HtmL ', () => {
    const titleText =
      fixture.debugElement.nativeElement.querySelector('#title').innerText;
    expect(titleText).toBe('Hello');
  });
  it('should have Header in HtmL ', () => {
    console.log(fixture.debugElement.nativeElement.querySelector('.title1'));
    console.log("Yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeey", fixture.debugElement.nativeElement.querySelector('.title1').innerText);
    const titleText = (fixture.debugElement.nativeElement.querySelector('.title1').innerText);
    expect(titleText).toBe('Hii');
    // fixture.whenStable().then(() => {
    //   console.log("Inside template element ******************>", (fixture.debugElement.queryAll(By.css('.title1'))[0].nativeElement.innerText));
    //   const headerText = (fixture.debugElement.queryAll(By.css('.title1'))[0].nativeElement.innerText);
    //   expect(headerText).toBe('Hii');
    // });
  });
});
