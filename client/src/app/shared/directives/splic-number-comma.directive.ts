import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[aliSplicNumberComma]'
})
export class SplicNumberCommaDirective {

  constructor(private el: ElementRef) { }

  // @HostListener('input', ['$event']) onInput(event: Event) {
  //   const input = this.el.nativeElement as HTMLInputElement;
  //   let value = input.value.replace(/,/g, ''); // Remove existing commas
  //   value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
  //   input.value = value;
  // }
  


  

}
