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
import { ProductosService } from '../../service/productos.service';
import { ProductoFire } from '../../models/producto.models';

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
  private _productoService = inject(ProductosService);

  nombreBusqueda = '';
  productos: ProductoFire[] | null = null;

  constructor() {}

  ngOnInit() {}

  buscar() {
    if (this.nombreBusqueda.trim()) {
      console.log(this.nombreBusqueda);
      this.obtenerProductos(this.nombreBusqueda);
    }
  }

  obtenerProductos(nombre: string) {
    this._productoService.obtenerPizzaPorNombre(nombre).subscribe({
      next: (data) => {
        this.productos = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
