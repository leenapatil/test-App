import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  template: `
  <div>
  <ng-container *ngTemplateOutlet="modal"> </ng-container>
  </div>
   
    <app-root>
    </app-root>
  `,
})
class WrapperComponent implements AfterViewInit{
  @ViewChild(AppComponent, { static: true }) appComponentRef: AppComponent;
  modal: TemplateRef<any>;
  ngAfterViewInit() {
    setTimeout(() => {
      this.modal = this.appComponentRef.modalRef;
      // console.log("Template=================>", this.modal);
    });
  }
}
describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let wrapperComponent: WrapperComponent;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WrapperComponent, AppComponent],
      imports: [ModalModule.forRoot()]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapperComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    console.log("Inside template element ******************>", fixture.debugElement.queryAll(By.css('#ng-modal')));
    app = wrapperComponent.appComponentRef;
    fixture.detectChanges();
    
  });
  it('should create the app', async(() => {
    let sut = fixture.componentInstance;
    sut.ngAfterViewInit( );
    fixture.detectChanges( );
    expect(wrapperComponent).toBeDefined();
    expect(app).toBeDefined();
  }));
  it('should have title in HtmL ', async(() => {
    const titleText = (fixture.debugElement.nativeElement.querySelector('#title').innerText);
    expect(titleText).toBe('Hello');
  }));
  it('should have Header in HtmL ', async(() => {
    let sut = fixture.componentInstance;
    sut.ngAfterViewInit( );
    fixture.detectChanges( );
    console.log("Yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeey", fixture.debugElement.nativeElement.querySelector('.title1').innerText);
    const titleText = (fixture.debugElement.nativeElement.querySelector('.title1').innerText);
    expect(titleText).toBe('Hii'); 
    // fixture.whenStable().then(() => {
    //   console.log("Inside template element ******************>", (fixture.debugElement.queryAll(By.css('.title1'))[0].nativeElement.innerText));
    //   const headerText = (fixture.debugElement.queryAll(By.css('.title1'))[0].nativeElement.innerText);
    //   expect(headerText).toBe('Hii');
    // });
  }));
});