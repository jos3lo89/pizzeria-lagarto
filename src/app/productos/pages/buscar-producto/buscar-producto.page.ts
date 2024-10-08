import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton, IonSearchbar, IonCard } from '@ionic/angular/standalone';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.page.html',
  styleUrls: ['./buscar-producto.page.scss'],
  standalone: true,
  imports: [IonCard, IonSearchbar, 
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export default class BuscarProductoPage implements OnInit {
  nombreBusqueda = '';

  constructor() {}

  ngOnInit() {}

  buscar() {
    console.log(this.nombreBusqueda);
  }
}
