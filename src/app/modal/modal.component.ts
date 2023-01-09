import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() title = 'modal window'
  @Input() text = 'Lorem ipsum, dolor sit amet consectetur adipisicing'

  @Output() close = new EventEmitter<void>()

}
