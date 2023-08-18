import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  usuario: string = '';
  contrasena: string = '';

  constructor(private router: Router, private toastController: ToastController) {}

  async ingresar() {
    if (this.usuario.length >= 3 && this.usuario.length <= 8 && /^\d{4}$/.test(this.contrasena)) {
      
      this.router.navigate(['/home'], {
        queryParams: {
          usuario: this.usuario,
          contrasena: this.contrasena
        }
      });
    } else {
      
      const toast = await this.toastController.create({
        message: 'Usuario o contraseña inválidos',
        duration: 1000, // Duración en milisegundos
        color: 'danger' // Puedes ajustar el color según tus estilos
      });

      await toast.present();
    }
  }

}
