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
  IonInput,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonButtons,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { camera, cameraOutline, close, image } from 'ionicons/icons';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-agregar-pizza',
  templateUrl: './agregar-pizza.page.html',
  styleUrls: ['./agregar-pizza.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButtons,
    IonModal,
    IonInput,
    IonButton,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSelect,
    IonSelectOption,
    ReactiveFormsModule,
  ],
})
export default class AgregarPizzaPage implements OnInit {
  private _router = inject(Router);
  private _formBuilder = inject(FormBuilder);
  private _toast = inject(ToastService);
  private _productoService = inject(ProductosService);

  fotoPizza: string | undefined = undefined;
  openModal = false;
  CameraSource = CameraSource;
  guardando = false;

  form = this._formBuilder.group({
    nombre: this._formBuilder.control('', [Validators.required]),
    descripcion: this._formBuilder.control('', [Validators.required]),
    tamanosPrecios: this._formBuilder.group({
      pequena: this._formBuilder.control(1, Validators.required),
      mediana: this._formBuilder.control(1, Validators.required),
      grande: this._formBuilder.control(1, Validators.required),
    }),
  });

  constructor() {
    addIcons({ camera, image, close });
  }

  ngOnInit() {}

  setRouter(route: string) {
    this._router.navigateByUrl(route);
  }

  async guardarPizza() {
    if (this.form.invalid) {
      this._toast.getToast(
        'Ingrese los datos en el formulario',
        'middle',
        'warning'
      );
      return;
    }
    const { nombre, descripcion, tamanosPrecios } = this.form.value;
    if (!nombre || !descripcion || !tamanosPrecios) return;
    const { grande, mediana, pequena } = tamanosPrecios;
    if (!grande || !mediana || !pequena) return;

    if (!this.fotoPizza) {
      this._toast.getToast('Falta la foto de la pizza', 'middle', 'warning');
      return;
    }

    try {
      this.guardando = true;
     await this._productoService.guardarProducto(
        {
          nombre,
          descripcion,
          tamanosPrecios: {
            grande,
            mediana,
            pequena,
          },
        },
        this.fotoPizza
      );

      this._toast.getToast('Pizza agreado', 'middle', 'success');
      this.guardando = false;
      this.form.reset();
      this.fotoPizza = '';
    } catch (error) {
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
    this.fotoPizza = image.dataUrl;
    this.closeModal();
  }

  closeModal() {
    this.openModal = false;
  }
  openModal2() {
    this.openModal = true;
  }
}
