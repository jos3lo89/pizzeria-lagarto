import { inject, Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { ProductoCarriotApi } from 'src/app/productos/models/producto.models';

@Injectable({
  providedIn: 'root',
})
export class CarritoApiService {
  private _axios = inject(AxiosService);

  constructor() {}

  async agregarAlCarrito(producto: ProductoCarriotApi) {
    return await this._axios.getAxiosClient().post('/carrito', producto);
  }

  async obtenerCarritoPorIdUser(id: string) {
    return await this._axios.getAxiosClient().get(`/carrito/${id}`);
  }

  async borrarProducto(id: string) {
    return await this._axios.getAxiosClient().delete(`/carrito/${id}`);
  }
}
