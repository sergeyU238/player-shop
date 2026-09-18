import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { User } from '../../../entities/user/model/user';
import { AuthData } from '../services/auth-data';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import type { AuthLoginDto } from '../dto/auth-login';

interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed(({ user }) => ({
    isAuthenticated: computed(() => user() !== null),
  })),

  withMethods((store, authService = inject(AuthData)) => ({
    getUser: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() =>
          authService.getCurrentUser().pipe(
            tapResponse({
              next: (user) => {
                patchState(store, {
                  user,
                });
              },
              error: (error) => console.error(error),
              finalize: () => patchState(store, { loading: true }),
            }),
          ),
        ),
      ),
    ),
    login: rxMethod<AuthLoginDto>(
      switchMap((data) =>
        authService.login(data).pipe(
          tapResponse({
            next: (user) =>
              patchState(store, {
                user,
              }),
            error: (error) => console.log(error),
            finalize: () => patchState(store, { loading: true }),
          }),
        ),
      ),
    ),
  })),

  withHooks({
    onInit(store) {
      store.getUser();
    },
  }),
);
