import { Component, Input } from '@angular/core';

@Component({
  selector: 'ali-imgage-control',
  templateUrl: './imgage-control.component.html',
  styleUrls: ['./imgage-control.component.scss']
})
export class ImgageControlComponent {

  imageWidth= signal(0)
  @Input() set width(val:number){
    this.imageWidth.set(val)
  }
  imageHeight= Signal(0)
  @Input() set height(val:number){
    this.imageHeight.set(val)
  }

}
