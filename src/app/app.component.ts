import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'test-app';
  @ViewChild('content') modalRef: TemplateRef<any>;
 
  constructor(private modalService: BsModalService) { }

  openDarkModal(content) {
    this.modalService.show(content);
  }

  ngAfterViewInit() {
    console.log("Template", this.modalRef);
  }
}
