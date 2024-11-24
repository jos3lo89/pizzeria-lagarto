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
// import { ProductosService } from '../../service/productos.service';
import { PizzaApiService } from 'src/app/shared/services/pizza-api.service';
interface FormAgregarPizza {
  nombre: FormControl<string | null>;
  descripcion: FormControl<string | null>;
  categoria: FormControl<'vegetariana' | 'carnes' | null>;
  tiempo_preparacion: FormControl<number | null>;
  descuento: FormControl<string | null>;
  tamanosPrecios: FormGroup<{
    familiar: FormControl<number | null>;
    mediana: FormControl<number | null>;
    personal: FormControl<number | null>;
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
  // private _productoService = inject(ProductosService);
  private _pizzaApiService = inject(PizzaApiService);

  fotoPizza: string | undefined = undefined;
  openModal = false;
  CameraSource = CameraSource;
  guardando = false;

  form = this._formBuilder.group<FormAgregarPizza>({
    nombre: this._formBuilder.control('', [Validators.required]),
    descripcion: this._formBuilder.control('', [Validators.required]),
    categoria: this._formBuilder.control(null, [Validators.required]),
    tiempo_preparacion: this._formBuilder.control(0, [Validators.required]),
    descuento: this._formBuilder.control('0.1', [Validators.required]),
    tamanosPrecios: this._formBuilder.group({
      familiar: this._formBuilder.control<number | null>(
        null,
        Validators.required
      ),
      mediana: this._formBuilder.control<number | null>(
        null,
        Validators.required
      ),
      personal: this._formBuilder.control<number | null>(
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
      categoria,
      descuento,
      tiempo_preparacion,
    } = this.form.value;
    if (
      !nombre ||
      !descripcion ||
      !tamanosPrecios ||
      !categoria ||
      !descuento ||
      !tiempo_preparacion
    )
      return;
    const { personal, mediana, familiar } = tamanosPrecios;
    if (!personal || !mediana || !familiar) return;

    if (!this.fotoPizza) {
      this._toast.getToast('Falta la foto de la pizza', 'middle', 'warning');
      return;
    }

    try {
      this.guardando = true;
      // await this._productoService.guardarProducto(
      //   {
      //     name: nombre,
      //     description: descripcion,
      //     size: 'big',

      //     isGlutenFree: gluten,
      //     isSpicy: picante,
      //     isVegetarian: vegetariana,
      //     price: {
      //       big: grande,
      //       family: familiar,
      //       medium: mediana,
      //     },
      //   },
      //   this.fotoPizza
      // );

      // api START

      await this._pizzaApiService.crearPizza(
        {
          nombre,
          categoria,
          descripcion,
          descuento: parseFloat(descuento),
          disponible: true,
          promocion: true,
          tiempo_preparacion,

          familiar: familiar,
          mediana: mediana,
          personal: personal,
        },
        this.fotoPizza
      );
      // api ENd

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
