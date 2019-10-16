import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';

@Component({
  selector: 'go-icon-button',
  templateUrl: './go-icon-button.component.html',
  styleUrls: ['./go-icon-button.component.scss']
})
export class GoIconButtonComponent implements OnChanges {
  iconClass: string;
  classObject: object = {};

  @Input() buttonDisabled: boolean;
  @Input() buttonIcon: string;
  @Input() buttonSize: string = 'small';
  @Input() buttonTitle: string;
  @Input() buttonVariant: string;
  @Input() isProcessing: boolean = false;
  @Input() useDarkTheme: boolean = false;

  @Output() handleClick: EventEmitter<void> = new EventEmitter();

  ngOnChanges(): void {
    this.iconClass = 'go-icon--' + this.buttonSize;
    this.setupButton();
  }

  clicked(): void {
    this.handleClick.emit();
  }

  private setupButton(): void {
    this.buttonVariant = this.buttonVariant === 'positive' ? 'primary' : this.buttonVariant;

    this.classObject = {
      'go-icon-button--dark': this.useDarkTheme,
      'go-icon-button--loading': this.isProcessing
    };

    this.classObject['go-icon-button--' + this.buttonVariant] = true;
  }
}
