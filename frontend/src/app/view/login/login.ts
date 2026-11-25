
import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// ALERTAS
import Swal from 'sweetalert2';

import { AuthServices } from '../../Services/auth-services';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  form: FormGroup;

  constructor(
    private loginForm: FormBuilder,
    private authService: AuthServices
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

      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Verifica los datos del formulario',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#673AB7'
      });

      return;
    }

    // OBTENER DATOS
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;

    // CONSULTAR SERVICIO DE AUTENTICACIÓN
    this.authService.login(email, password).subscribe({

      next: (respuesta) => {

        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Inicio de sesión correcto',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#673AB7'
        });

      },

      error: (error: HttpErrorResponse) => {

        if (error.status === 401) {

          Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Correo o contraseña incorrectos',
            confirmButtonText: 'Intentar nuevamente',
            confirmButtonColor: '#673AB7'
          });

        } else {

          Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo iniciar sesión. Intenta nuevamente.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#673AB7'
          });

        }

      }

    });

  }
}
