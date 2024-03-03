import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[aliSpliceNumber]",
})
export class SpliceNumberDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener("input", ["$event"]) numberInput(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let inputValue = inputElement.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/[^0-9.]/g, "");

    // Format the input with thousand separators
    inputValue = this.formatNumber(inputValue);

    // Update the input value
    this.renderer.setProperty(inputElement, "value", inputValue);
  }

  private formatNumber(value: string): string {
    const parts = value.split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart;
  }
}
