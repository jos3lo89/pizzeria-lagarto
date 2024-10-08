import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-google-btn',
  templateUrl: './google-btn.component.html',
  styleUrls: ['./google-btn.component.scss'],
  standalone: true,
  imports: [IonButton],
})
export class GoogleBtnComponent implements OnInit {
  @Output() clickMe = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  handleClick() {
    this.clickMe.emit();
  }
}
