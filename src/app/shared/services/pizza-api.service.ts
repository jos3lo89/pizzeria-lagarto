import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PizzaApiRegister,
  Productotype,
} from 'src/app/productos/models/producto.models';

@Injectable({
  providedIn: 'root',
})
export class PizzaApiService {
  private _http = inject(HttpClient);

  private _apiUrl = 'http://localhost:3000';
  constructor() {}

  crearPizza(pizza: PizzaApiRegister): Observable<any> {
    return this._http.post(`${this._apiUrl}/pizza`, pizza);
  }

  obtenerPizzas(): Observable<any> {
    return this._http.get(`${this._apiUrl}/pizza`);
  }
}
