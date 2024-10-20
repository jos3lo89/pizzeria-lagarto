import { inject, Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root'
})
export class BusquedaApiService {
  private _axios = inject(AxiosService);


  constructor() { }


  async buscaPorNombre(nombre: string) {
    return this._axios.getAxiosClient().get(`/busqueda/${nombre}`)
  }

}
