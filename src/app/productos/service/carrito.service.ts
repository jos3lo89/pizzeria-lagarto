/* import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from '@firebase/firestore';
import { Observable } from 'rxjs';
import {
  ProductoCarrito,
  ProductoCarritoFire,
} from '../models/producto.models';
import { AuthService } from 'src/app/auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  // private _firestore = inject(Firestore);
  // private _authService = inject(AuthService);

  // private nombreColeccion = 'carrito';
  // private _isAuth = false;
  // constructor() {}

  // async agregarAlCarrito(producto: ProductoCarrito) {
  //   // this._authService.authState$.subscribe({
  //   //   next: (data) => {
  //   //     if (data) {
  //   //       this._isAuth = true;
  //   //     }
  //   //   },
  //   // });

  //   // if (!this._isAuth) return;

  //   const ref = collection(this._firestore, this.nombreColeccion);
  //   return await addDoc(ref, producto);
  // }

  // obtenerCarritoPorUsuario(id: string): Observable<ProductoCarritoFire[]> {
  //   const coleccionReferencia = collection(
  //     this._firestore,
  //     this.nombreColeccion
  //   );

  //   const q = query(coleccionReferencia, where('idUser', '==', id));

  //   return new Observable((observer) => {
  //     getDocs(q)
  //       .then((querySnapShot) => {
  //         const items = querySnapShot.docs.map((doc) => {
  //           return { docId: doc.id, ...doc.data() } as ProductoCarritoFire;
  //         });
  //         observer.next(items);
  //         observer.complete();
  //       })
  //       .catch((error) => {
  //         observer.error(error);
  //       });
  //   });
  // }

  // async borrarDelCarrito(idProducto: string) {
  //   const coleccionReferencia = doc(
  //     this._firestore,
  //     `${this.nombreColeccion}/${idProducto}`
  //   );

  //   await deleteDoc(coleccionReferencia);
  // }

  // cantidadCarrito(id: string): Observable<number> {
  //   const refCol = collection(this._firestore, this.nombreColeccion);
  //   const q = query(refCol, where('idUser', '==', id));

  //   return new Observable((observer) => {
  //     const unsubscribe = onSnapshot(
  //       q,
  //       (querySnapshot) => {
  //         const docsLength = querySnapshot.docs.length;
  //         observer.next(docsLength);
  //       },
  //       (error) => {
  //         observer.error(error);
  //       }
  //     );

  //     return () => unsubscribe();
  //   });
  // }
}
 */
