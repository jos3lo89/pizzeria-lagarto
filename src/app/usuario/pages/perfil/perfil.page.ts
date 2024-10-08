import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonSpinner,
  IonButton,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonSpinner,
    IonCardContent,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export default class PerfilPage implements OnInit {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _toast = inject(ToastService);

  usuario: any;

  constructor() {}

  ngOnInit() {
    this._authService.authState$.subscribe({
      next: (data) => {
        this.usuario = data;
      },
    });
  }

  async cerrarSesion() {
    try {
      await this._authService.cerrarSesion();
      this._router.navigateByUrl('/auth/login');
      this._toast.getToast('Cerraste sesión', 'middle', 'warning');
    } catch (error) {
      this._toast.getToast('Error al cerrar sesión', 'middle', 'danger');
      console.log(error);
    }
  }

  setRouter(route: string) {
    this._router.navigateByUrl(route);
  }
}
