import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { GoModalDirective } from './go-modal.directive';
import { GoModalService } from './go-modal.service';

@Component({
  selector: 'go-modal',
  templateUrl: './go-modal.component.html',
  styleUrls: ['./go-modal.component.scss']
})
export class GoModalComponent implements OnInit {
  readonly defaultModalSize: 'lg' | 'xl' = 'lg';

  currentComponent: any;
  opened: boolean = false;
  modalTitle: string;
  modalSize: 'lg' | 'xl' = this.defaultModalSize;

  @ViewChild(GoModalDirective) goModalHost: GoModalDirective;
  @ViewChild('goModal') goModal: ElementRef<HTMLElement>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private goModalService: GoModalService
  ) {
  }

  ngOnInit() {
    this.goModalService.activeModalComponent.subscribe((value) => {
      this.currentComponent = value;
      this.loadComponent();
    });

    this.goModalService.modalOpen.subscribe((value) => {
      this.opened = value;
    });
  }

  loadComponent(): void {
    const componentFactory: ComponentFactory<{}> = this.componentFactoryResolver.resolveComponentFactory(this.currentComponent.component);
    const viewContainerRef: ViewContainerRef = this.goModalHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef: ComponentRef<{}> = viewContainerRef.createComponent(componentFactory);

    Object.keys(this.currentComponent.bindings).forEach((key: string) => {
      componentRef.instance[key] = this.currentComponent.bindings[key];
    });

    // Set title for modal if provided
    if (componentRef.instance['modalTitle']) {
      this.modalTitle = componentRef.instance['modalTitle'];
    } else {
      this.modalTitle = '';
    }

    // Set modal size if provided (by default set to 'lg')`
    if (componentRef.instance['modalSize'] === 'lg' || componentRef.instance['modalSize'] === 'xl') {
      this.modalSize = componentRef.instance['modalSize'];
    } else {
      this.modalSize = this.defaultModalSize;
    }
  }

  /**
   * Close modal when user clicks outside of the modal
   *
   * @param $event - Click event
   */
  backdropClick($event: MouseEvent): void {
    if ($event && this.goModal.nativeElement === $event.target) {
      this.closeModal();
    }
  }

  closeModal() {
    this.goModalService.toggleModal(false);
  }

  goModalClasses() {
    return { 'go-modal--visible': this.opened }
  }
}
