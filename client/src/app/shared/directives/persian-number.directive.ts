import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: "[aliPersianNumber]",
})
export class PersianNumberDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener("input", ["$event"]) onInput(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let inputValue = inputElement.value;

    // Replace English numerals with Persian numerals
    inputValue = this.convertToPersian(inputValue);

    // Update the input value
    this.renderer.setProperty(inputElement, "value", inputValue);
  }

  private convertToPersian(value: string): string {
    const persianNumerals = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    return value.replace(/\d/g, (match) => persianNumerals[parseInt(match)]);
  }
}
