import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from '@firebase/firestore';
import { Observable } from 'rxjs';
import {
  ProductoCarrito,
  ProductoCarritoFire,
} from '../models/producto.models';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private _firestore = inject(Firestore);

  private nombreColeccion = 'carrito';

  constructor() {}

  async agregarAlCarrito(producto: ProductoCarrito) {
    const ref = collection(this._firestore, this.nombreColeccion);
    await addDoc(ref, producto);
  }

  obtenerCarritoPorUsuario(id: string): Observable<ProductoCarritoFire[]> {
    const coleccionReferencia = collection(
      this._firestore,
      this.nombreColeccion
    );

    const q = query(coleccionReferencia, where('idUser', '==', id));

    return new Observable((observer) => {
      getDocs(q)
        .then((querySnapShot) => {
          const items = querySnapShot.docs.map((doc) => {
            return { docId: doc.id, ...doc.data() } as ProductoCarritoFire;
          });
          observer.next(items);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  async borrarDelCarrito(idProducto: string) {
    const coleccionReferencia = doc(
      this._firestore,
      `${this.nombreColeccion}/${idProducto}`
    );

    await deleteDoc(coleccionReferencia);
  }
}
