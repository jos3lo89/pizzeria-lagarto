import { inject, Injectable } from '@angular/core';
import { PizzaApiRegister } from 'src/app/productos/models/producto.models';
import { AxiosService } from './axios.service';
import { SubirImgService } from './subir-img.service';

@Injectable({
  providedIn: 'root',
})
export class PizzaApiService {
  private _axios = inject(AxiosService);
  private _subirImgService = inject(SubirImgService);

  constructor() {}

  async crearPizza(pizza: PizzaApiRegister, foto: string) {
    const imagen_url = await this._subirImgService.subirFoto(foto);
    return await this._axios.getAxiosClient().post('/pizza', {
      ...pizza,
      imagen_url,
    });
  }

  async obtenerPizzas() {
    return await this._axios.getAxiosClient().get('/pizza');
  }

  async obtenerPizzaPorId(id: string) {
    return await this._axios.getAxiosClient().get(`/pizza/${id}`);
  }
}
