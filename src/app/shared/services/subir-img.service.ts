import { inject, Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class SubirImgService {
  private _storage = inject(Storage);

  constructor() {}

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
}
