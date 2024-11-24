import { computed, inject, Injectable, signal } from '@angular/core';
import { AxiosService } from './axios.service';

interface CartCounterI {
  cartCounter: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartCounterService {
  private _axiosService = inject(AxiosService);

  private _state = signal<CartCounterI>({
    cartCounter: 0,
  });

  constructor() {}

  readonly counter = computed(() => this._state().cartCounter);

  fetchCartCounter() {
    this._axiosService.get('').then((res) => {
      console.log('cantidad de productos en el carrito desde service', res);
    });
  }
}
