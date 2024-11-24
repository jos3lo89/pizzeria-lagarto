import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonList,
  IonButton,
  IonRow,
  IonGrid,
  IonCol,
} from '@ionic/angular/standalone';
// import { ProductosService } from '../../service/productos.service';
import {
  newProductosApi,
  PizzasApi,
  // ProductoFire,
} from '../../productos/models/producto.models';
import { Router } from '@angular/router';
import { PizzaApiService } from 'src/app/shared/services/pizza-api.service';

@Component({
  selector: 'app-lista-pizzas',
  templateUrl: './lista-pizzas.page.html',
  styleUrls: ['./lista-pizzas.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonGrid,
    IonRow,
    IonButton,
    IonList,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export default class ListaPizzasPage implements OnInit {
  // private _productoService = inject(ProductosService);
  private _router = inject(Router);
  private _pizzaApiService = inject(PizzaApiService);

  // productos2: ProductoFire[] = [];
  productos: newProductosApi[] = [];

  constructor() {}

  async ngOnInit() {
    // this._productoService.obtenerPizzas().subscribe({
    //   next: (data) => {
    //     this.productos = data;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });

    await this.obtenerPizzas();
  }

  async obtenerPizzas() {
    const data = await this._pizzaApiService.obtenerPizzas();
    this.productos = data.map((p) => {
      return { ...p, precioDescuento: p.familiar - p.familiar * p.descuento };
    });
    // console.log(this.productos);
  }

  setRouter(id: string) {
    this._router.navigate(['/pages/detalles'], {
      queryParams: {
        id,
      },
    });
  }
}
