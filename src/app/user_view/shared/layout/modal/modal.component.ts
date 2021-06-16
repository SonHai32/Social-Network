import { Component, OnInit, Input} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() modalTitle: string = '';
  modalVisible = false;

  constructor() {}

  ngOnInit(): void {
  }

  toggleModal(): void {
    this.modalVisible = !this.modalVisible;
  }
}
