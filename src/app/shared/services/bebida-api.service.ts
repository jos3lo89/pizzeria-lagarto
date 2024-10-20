import { inject, Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { BebidaCrearApi } from 'src/app/productos/models/producto.models';
import { SubirImgService } from './subir-img.service';

@Injectable({
  providedIn: 'root',
})
export class BebidaApiService {
  private _axios = inject(AxiosService);
  private _subirImgService = inject(SubirImgService);

  constructor() {}

  async crearBebida(bebida: BebidaCrearApi, foto: string) {
    const imagen_url = await this._subirImgService.subirFoto(foto);
    return await this._axios.getAxiosClient().post('/bebida', {
      ...bebida,
      imagen_url,
    });
  }

  async obtenerBebidas() {
    return await this._axios.getAxiosClient().get('/bebida');
  }

  async obtenerBebidaPorId(id: string) {
    return await this._axios.getAxiosClient().get(`/bebida/${id}`);
  }
}
