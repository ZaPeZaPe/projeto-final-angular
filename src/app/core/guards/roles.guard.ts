import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { LoginService } from '../auth/services/login.service';

export const rolesGuard = (activatedRoute: ActivatedRouteSnapshot) => {
  return inject(LoginService)
    .checkUserRoles(activatedRoute.data['roles'])
    .pipe(
      map((userCanDo) => {
        return userCanDo
          ? true
          : createUrlTreeFromSnapshot(activatedRoute, ['/', 'login']);
      })
    );
};
