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
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonButton,
  IonSpinner,
  IonInput,
} from '@ionic/angular/standalone';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonSpinner,
    IonButton,
    IonList,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
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
export default class RegistroPage implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _toast = inject(ToastService);

  form = this._formBuilder.group({
    nombre: this._formBuilder.control('', [Validators.required]),
    apellido: this._formBuilder.control('', [Validators.required]),
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', [Validators.required]),
  });

  isloadingSubmitBtn = false;

  constructor() {}

  ngOnInit() {}

  async registrar() {
    if (this.form.invalid) return;
    const { nombre, apellido, email, password } = this.form.value;
    if (!nombre || !apellido || !email || !password) return;

    try {
      this.isloadingSubmitBtn = true;
      await this._authService.registrar({
        apellido,
        email,
        nombre,
        password,
        rol: 'user',
      });

      this._toast.getToast('Registro exitoso', 'middle', 'success');
      this.isloadingSubmitBtn = false;
      this.form.reset();
    } catch (error) {
      console.log(error);
      this._toast.getToast('Error al registrar', 'middle', 'danger');

      this.isloadingSubmitBtn = false;
    }
  }
}
