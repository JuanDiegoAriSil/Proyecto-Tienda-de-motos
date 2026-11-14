
import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthServices } from '../../Services/auth-services';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  form: FormGroup;

  constructor(
    private loginForm: FormBuilder,
    private authService: AuthServices,
    private snackBar: MatSnackBar
  ) {

    this.form = this.loginForm.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  onSubmit(): void {

    // VALIDAR FORMULARIO
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // OBTENER VALORES DEL FORMULARIO
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;

    // CONSULTAR EL SERVICIO DE AUTENTICACIÓN
    this.authService.login(email, password).subscribe({

      next: (respuesta) => {

        this.snackBar.open(
          'Inicio de sesión correcto',
          'Cerrar',
          {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        );

        console.log('Usuario autenticado:', respuesta.usuario);

      },

      error: (error: HttpErrorResponse) => {

        const mensaje = error.status === 401
          ? 'Correo o contraseña incorrectos'
          : 'No se pudo iniciar sesión. Intenta nuevamente.';

        this.snackBar.open(
          mensaje,
          'Cerrar',
          {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        );

      }

    });

  }

}
