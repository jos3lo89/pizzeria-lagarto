import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonButton,
  IonModal,
  IonButtons,
  IonIcon,
  IonInput,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ProductosService } from '../../service/productos.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { camera, close, image } from 'ionicons/icons';
import { BebidaService } from '../../service/bebida.service';

@Component({
  selector: 'app-agregar-bebida',
  templateUrl: './agregar-bebida.page.html',
  styleUrls: ['./agregar-bebida.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonIcon,
    IonButtons,
    IonModal,
    IonButton,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export default class AgregarBebidaPage implements OnInit {
  private _router = inject(Router);
  private _formBuilder = inject(FormBuilder);
  private _toast = inject(ToastService);
  // private _productoService = inject(ProductosService);
  private _bebidaService = inject(BebidaService);

  fotoBebida: string | undefined = undefined;
  openModal = false;
  CameraSource = CameraSource;
  guardando = false;

  form = this._formBuilder.group({
    nombre: this._formBuilder.control('', [Validators.required]),
    precio: this._formBuilder.control(999, [Validators.required]),
  });

  constructor() {
    addIcons({ camera, image, close });
  }

  setRouter(route: string) {
    this._router.navigateByUrl(route);
  }

  async guardarBebida() {
    if (this.form.invalid) {
      this._toast.getToast(
        'Ingrese los datos en el formulario',
        'middle',
        'warning'
      );
      return;
    }

    const { nombre, precio } = this.form.value;
    if (!nombre || !precio) return;
    if (!this.fotoBebida) {
      this._toast.getToast('Falta la foto de la bebida', 'middle', 'warning');
      return;
    }

    try {
      this.guardando = true;

      await this._bebidaService.guardarBebida(
        {
          nombre,
          precio,
        },
        this.fotoBebida
      );

      this._toast.getToast('bebida agreada', 'middle', 'success');
      this.guardando = false;
      this.form.reset();
      this.fotoBebida = '';
    } catch (error) {
      this.guardando = false;
      console.log(error);
    }
  }

  async takePicture(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source,
    });
    this.fotoBebida = image.dataUrl;
    console.log(this.fotoBebida);

    this.closeModal();
  }

  closeModal() {
    this.openModal = false;
  }
  openModal2() {
    this.openModal = true;
  }

  ngOnInit() {}
}
