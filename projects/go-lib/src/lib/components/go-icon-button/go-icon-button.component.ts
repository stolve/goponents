import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'go-icon-button',
  templateUrl: './go-icon-button.component.html',
  styleUrls: ['./go-icon-button.component.scss']
})
export class GoIconButtonComponent implements OnChanges, OnInit {
  iconClass: string;
  classObject: object = {};
  loaderClassObject: object = {};
  loaderType: 'light' | 'dark' = 'light';

  @Input() buttonDisabled: boolean;
  @Input() buttonIcon: string;
  @Input() buttonSize: string = 'small';
  @Input() buttonTitle: string;
  @Input() buttonVariant: string;
  @Input() isProcessing: boolean = false;
  @Input() useDarkTheme: boolean = false;

  @Output() handleClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.iconClass = 'go-icon--' + this.buttonSize;
    this.setupButton();
  }

  ngOnChanges(): void {
    this.setupButton();
    this.buttonLoader();
  }

  clicked(): void {
    this.handleClick.emit(this.isProcessing);
  }

  private setupButton(): void {
    this.buttonVariant = this.buttonVariant === 'positive' ? 'primary' : this.buttonVariant;

    this.classObject = {
      'go-icon-button--dark': this.useDarkTheme,
      'go-icon-button--loading': this.isProcessing
    };

    this.classObject['go-icon-button--' + this.buttonVariant] = true;
  }

  private buttonLoader(): void {
    if (this.isAlternativeDark()) {
      this.loaderType = 'light';
      this.loaderClassObject['go-icon-button__loader--dark'] = true;
    } else if (this.isAlternativeLight()) {
      this.loaderType = 'dark';
      this.loaderClassObject['go-icon-button__loader--light'] = true;
    } else {
      this.loaderType = 'light';
      this.loaderClassObject[`go-icon-button__loader--${this.buttonVariant}`] = true;
    }
  }

  private isAlternativeDark(): boolean {
    return (this.buttonVariant === 'secondary' || this.buttonVariant === 'tertiary') && this.useDarkTheme;
  }

  private isAlternativeLight(): boolean {
    return (this.buttonVariant === 'secondary' || this.buttonVariant === 'tertiary') && !this.useDarkTheme;
  }
}
