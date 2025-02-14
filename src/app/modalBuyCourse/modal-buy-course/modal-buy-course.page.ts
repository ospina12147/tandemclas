import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-buy-course',
  templateUrl: './modal-buy-course.page.html',
  styleUrls: ['./modal-buy-course.page.scss'],
})
export class ModalBuyCoursePage implements OnInit {

  @Input() dataUrlPage: any;
  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
