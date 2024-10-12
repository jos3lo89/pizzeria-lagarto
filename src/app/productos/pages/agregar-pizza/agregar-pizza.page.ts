import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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
  IonCheckbox,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { camera, cameraOutline, close, image } from 'ionicons/icons';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ProductosService } from '../../service/productos.service';
interface FormAgregarPizza {
  nombre: FormControl<string | null>;
  descripcion: FormControl<string | null>;
  gluten: FormControl<boolean | null>;
  picante: FormControl<boolean | null>;
  vegetariana: FormControl<boolean | null>;
  tamanosPrecios: FormGroup<{
    familiar: FormControl<number | null>;
    mediana: FormControl<number | null>;
    grande: FormControl<number | null>;
  }>;
}

@Component({
  selector: 'app-agregar-pizza',
  templateUrl: './agregar-pizza.page.html',
  styleUrls: ['./agregar-pizza.page.scss'],
  standalone: true,
  imports: [
    IonCheckbox,
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

  // Aplica la interfaz FormAgregarPizza
  form = this._formBuilder.group<FormAgregarPizza>({
    nombre: this._formBuilder.control('', [Validators.required]),
    descripcion: this._formBuilder.control('', [Validators.required]),
    gluten: this._formBuilder.control(false, [Validators.required]),
    picante: this._formBuilder.control(false, [Validators.required]),
    vegetariana: this._formBuilder.control(false, [Validators.required]),
    tamanosPrecios: this._formBuilder.group({
      familiar: this._formBuilder.control<number | null>(
        null,
        Validators.required
      ),
      mediana: this._formBuilder.control<number | null>(
        null,
        Validators.required
      ),
      grande: this._formBuilder.control<number | null>(
        null,
        Validators.required
      ),
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
    const {
      nombre,
      descripcion,
      tamanosPrecios,
      gluten,
      picante,
      vegetariana,
    } = this.form.value;
    if (!nombre || !descripcion || !tamanosPrecios) return;
    const { grande, mediana, familiar } = tamanosPrecios;
    if (!grande || !mediana || !familiar) return;

    if (!this.fotoPizza) {
      this._toast.getToast('Falta la foto de la pizza', 'middle', 'warning');
      return;
    }

    if (gluten == null || picante == null || vegetariana == null) {
      return;
    }

    try {
      this.guardando = true;
      await this._productoService.guardarProducto(
        {
          name: nombre,
          description: descripcion,
          size: 'big',

          isGlutenFree: gluten,
          isSpicy: picante,
          isVegetarian: vegetariana,
          price: {
            big: grande,
            family: familiar,
            medium: mediana,
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
