import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSearchbar,
  IonCard,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { BusquedaApiService } from 'src/app/shared/services/busqueda-api.service';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.page.html',
  styleUrls: ['./buscar-producto.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonSearchbar,
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
  private _router = inject(Router);
  private _busquedaApiService = inject(BusquedaApiService);

  nombreBusqueda = '';
  productos: any = [];

  constructor() {}

  ngOnInit() {}

  async buscar() {
    if (this.nombreBusqueda.trim()) {
      await this.obtenerProductosPorNombre(this.nombreBusqueda);
    }
  }

  async obtenerProductosPorNombre(nombre: string) {
    try {
      const res = await this._busquedaApiService.buscaPorNombre(nombre);
      this.productos = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  setRouter(id: string) {
    this._router.navigate(['/pages/detalles'], {
      queryParams: {
        id,
        back: 'buscar-producto',
      },
    });
  }

  setRouterBebida(id: string) {
    this._router.navigate(['/pages/detalles-bebida'], {
      queryParams: {
        id,
        back: 'buscar-producto',
      },
    });
  }
}
