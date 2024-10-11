import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Bebida, BebidaFirebase } from '../models/producto.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BebidaService {
  private _firestore = inject(Firestore);
  private _storage = inject(Storage);

  private _colecionNombre = 'bebidas';

  constructor() {}

  async guardarBebida(bebida: Bebida, fotoBebida: string) {
    const fotoUrl = await this.subirFoto(fotoBebida);

    if (fotoUrl) {
      const coleccionReferencia = collection(
        this._firestore,
        this._colecionNombre
      );
      await addDoc(coleccionReferencia, {
        nombre: bebida.nombre,
        precio: bebida.precio,
        foto: fotoUrl,
      });
    }
  }

  obtenerBebidas(): Observable<BebidaFirebase[]> {
    const coleccionReferencia = collection(this._firestore, 'bebidas');

    return new Observable((observer) => {
      getDocs(coleccionReferencia)
        .then((querySnapshot) => {
          const items = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as BebidaFirebase;
          });

          observer.next(items);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  obtnerBebidaPorId(id: string): Observable<BebidaFirebase> {
    const coleccionReferencia = doc(this._firestore, `bebidas/${id}`);

    return new Observable((observer) => {
      getDoc(coleccionReferencia)
        .then((querySnapShot) => {
          const item = {
            id: querySnapShot.id,
            ...querySnapShot.data(),
          } as BebidaFirebase;

          observer.next(item);

          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  private async subirFoto(foto: string) {
    try {
      const base64Parts = foto.split(';base64,');
      const contentType = base64Parts[0].split(':')[1];
      const base64String = base64Parts[1];

      const imgRef = ref(
        this._storage,
        `bebidas/${Date.now()}-${Math.floor(
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
}
