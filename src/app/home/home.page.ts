import { Component,OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usuario: string = '';
  nombre: string = '';
  apellido: string = '';
  nvl_edu: string = '';

  constructor(private alertController: AlertController, private activateRoute: ActivatedRoute) {}

    ngOnInit() {
      this.activateRoute.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
    });
  }

  limpiarInputs() {
    this.nombre = '';
    this.apellido = '';
    this.nvl_edu = '';
  }

  async mostrarValores() {
    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Su nombre es: ${this.nombre} ${this.apellido}`,
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }
}
