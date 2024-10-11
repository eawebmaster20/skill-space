import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-components',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-components.component.html',
  styleUrl: './modal-components.component.scss',
})
export class ModalComponentsComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() type: 'error' | 'success' | 'confirmation' = 'error';
  @Input() confirmText: string = 'OK';
  @Input() cancelText: string = 'Cancel';

  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
