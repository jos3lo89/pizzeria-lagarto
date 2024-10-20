import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonButton,
} from '@ionic/angular/standalone';
import {
  Bebida,
  BebidaFirebase,
  BebidasApi,
} from '../../models/producto.models';
import { Router } from '@angular/router';
// import { BebidaService } from '../../service/bebida.service';
import { BebidaApiService } from 'src/app/shared/services/bebida-api.service';

@Component({
  selector: 'app-lista-bebidas',
  templateUrl: './lista-bebidas.page.html',
  styleUrls: ['./lista-bebidas.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export default class ListaBebidasPage implements OnInit {
  private _router = inject(Router);
  // private _bebidaService = inject(BebidaService);
  private _bebidaApiService = inject(BebidaApiService);
  constructor() {}

  productos: BebidasApi[] = [];

  async ngOnInit() {
    // this._bebidaService.obtenerBebidas().subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.productos = data;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });

    await this.obtenerBebidas();
  }

  async obtenerBebidas() {
    try {
      const res = await this._bebidaApiService.obtenerBebidas();

      this.productos = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  setRouter(id: string) {
    this._router.navigate(['/pages/detalles-bebida'], {
      queryParams: {
        id,
      },
    });
  }
}
