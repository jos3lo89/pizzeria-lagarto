/* import { inject, Injectable } from '@angular/core';
import { Producto, ProductoAPi, ProductoFire } from '../models/producto.models';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import {
  addDoc,
  collection,
  doc,
  endAt,
  Firestore,
  getDoc,
  getDocs,
  orderBy,
  startAt,
  where,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PizzaApiService } from 'src/app/shared/services/pizza-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private _storage = inject(Storage);
  private _fireStore = inject(Firestore);
  private _api = inject(PizzaApiService);
  private nombreDeColecion = 'pizzas';
  private nombreCollBebidas = 'bebidas';
  constructor() {}
  async guardarProducto(producto: ProductoAPi, foto: string) {
  const fotoUrl = await this.subirFoto(foto);
  console.log(fotoUrl);
  if (fotoUrl) {
    try {
      console.log('dentro de regitor');
    this._api
      .crearPizza({
        description: producto.description,
        image: fotoUrl,
        name: producto.name,
        size: producto.size,
        isGlutenFree: producto.isGlutenFree,
        isSpicy: producto.isSpicy,
        isVegetarian: producto.isVegetarian,
        price: {
          big: producto.price.big,
          family: producto.price.family,
          medium: producto.price.medium,
        },
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    console.log('nose guardo wadfa');
  } catch (error) {
    console.log(error);
  }
  try {
    const pizzaReferencia = collection(
      this._fireStore,
      this.nombreDeColecion
    );
    await addDoc(pizzaReferencia, {
      ...producto,
      foto: fotoUrl,
      nombreNormlizado: producto.nombre
        .toLocaleLowerCase()
        .replace(/\s+/g, ''),
      keywords: producto.nombre.toLocaleLowerCase().split(' '), // nombre partido en arrays
    });
  } catch (error) {
    console.log(error);
  }
  } else {
  }
  }
   async subirFoto(foto: string) {
    try {
      const base64Parts = foto.split(';base64,');
      const contentType = base64Parts[0].split(':')[1];
      const base64String = base64Parts[1];
      const imgRef = ref(
        this._storage,
        `imagenes/${Date.now()}-${Math.floor(
          Math.random() * (9999 - 1000 + 1) + 1000
        )}-${Math.floor(Math.random() * (999 - 100 + 1) + 100)}`
      );
      const uploadResult = await uploadString(imgRef, base64String, 'base64', {
        contentType,
      });
      return await getDownloadURL(uploadResult.ref);
    } catch (error) {
      return null;
    }
  }
  obtenerPizzas(): Observable<ProductoFire[]> {
    const coleccionReferencia = collection(
      this._fireStore,
      this.nombreDeColecion
    );
    return new Observable((observer) => {
      getDocs(coleccionReferencia)
        .then((querySnapShot) => {
          const items = querySnapShot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as ProductoFire;
          });
          observer.next(items);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  obtenerPizzaPorId(id: string): Observable<ProductoFire> {
    const coleccionReferencia = doc(this._fireStore, `pizzas/${id}`);
    return new Observable((observer) => {
      getDoc(coleccionReferencia)
        .then((querySnapShot) => {
          const item = {
            id: querySnapShot.id,
            ...querySnapShot.data(),
          } as ProductoFire;
          observer.next(item);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  obtenerPizzaPorNombre(nombre: string): Observable<ProductoFire[]> {
    const docReferencia = collection(this._fireStore, this.nombreDeColecion);
    const nombreMinuscula = nombre.toLocaleLowerCase();
    const endNombre = nombreMinuscula + '\uf8ff';
    const q = query(
      docReferencia,
      orderBy('nombreNormlizado'),
      startAt(nombre),
      endAt(endNombre)
    );
    return new Observable((observer) => {
      getDocs(q)
        .then((querySnapshot) => {
          const items = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as ProductoFire;
          });
          observer.next(items);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  busqueda(nombre: string) {
    const docRefPizzas = collection(this._fireStore, this.nombreDeColecion);
    const docRefBebidas = collection(this._fireStore, this.nombreCollBebidas);
    const nombreMinuscula = nombre.toLocaleLowerCase();
    const endnombre = nombreMinuscula + '\uf8ff';
    const q1 = query(
      docRefPizzas,
      orderBy('nombreNormlizado'),
      startAt(nombre),
      endAt(endnombre)
    );
    const q2 = query(
      docRefBebidas,
      orderBy('nombreNormlizado'),
      startAt(nombre),
      endAt(endnombre)
    );
    return new Observable((observer) => {
      Promise.all([getDocs(q1), getDocs(q2)])
        .then(([querySnapshot1, querySnapshot2]) => {
          const docs1 = querySnapshot1.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const docs2 = querySnapshot2.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const allDocs = [...docs1, ...docs2];
          observer.next(allDocs);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
 */
