import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

export const authGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.authState$.pipe(
      map((state) => {
        // console.log('estado del guard', state);
        if (!state) {
          router.navigateByUrl('/auth/login');
          return false;
        }
        return true;
      })
    );
  };
};

export const roleGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    // const currentUser: User | null = null;
    return authService.authState$.pipe(
      map((state) => {
        if (!state) {
          router.navigateByUrl('/pages/home');
          return false;
        }
        // mejorar esto ------
        if (state.email !== environment.emailAdmin) {
          router.navigateByUrl('/pages/home');
          return false;
        } else {
          return true;
        }
      })
    );
  };
};
