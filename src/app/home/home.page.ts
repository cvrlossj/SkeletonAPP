import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, AnimationController, NavController, createAnimation } from '@ionic/angular';
import { Animation } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private animation:Animation = createAnimation('')


  constructor(
    private alertController: AlertController,
    private activateRoute: ActivatedRoute,
    private navCtrl: NavController,
    private animationCtrl: AnimationController
    ) {}

    usuario: string = '';
    nombre: string = '';
    apellido: string = '';
    nvl_edu: string = '';

    ngOnInit() {
      this.activateRoute.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
    });
  }

  ngAfterViewInit(){
    // Para titulo
    const titleElement = document.querySelector('#title')
    // Para nombre y apellido
    const nombreInp = document.querySelector('#nombreInp');
    const apellidoInp = document.querySelector('#apellidoInp');

    if (titleElement) {
      const titleAnimation = this.animationCtrl
        .create()
        .addElement(titleElement)
        .duration(2500)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, transform: 'translateX(0px)', opacity: 1 },
          { offset: 0.25, transform: 'translateX(100%)', opacity: 0.2 },
          { offset: 0.5, transform: 'translateX(0px)', opacity: 1 },
          { offset: 0.75, transform: 'translateX(-100%)', opacity: 0.2 },
          { offset: 1, transform: 'translateX(0px)', opacity: 1 },
        ]);

      titleAnimation.play();
    }

    if (nombreInp && apellidoInp){
      this.animation = this.animationCtrl
      .create()
      .addElement(nombreInp)
      .addElement(apellidoInp)
      .duration(500)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateX(0px)'},
        { offset: 0.33, transform: 'translateX(330px)' }, // Mueve al lado derecho en 0.33 segundos
        { offset: 0.66, transform: 'translateX(-10px)' }, // Mueve al lado izquierdo en 0.33 segundos
        { offset: 1, transform: 'translateX(0px)' }, // Vuelve a la posición original en 0.33 segundos
      ]);
    }

  }


  // --- Deja en blanco los inputs --- //
  limpiarInputs() {
    this.animation.play()
    this.esperar()
    this.nombre = '';
    this.apellido = '';
    this.nvl_edu = '';
  }


  // --- Mostrar Valores --- //
  async mostrarValores() {
    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Su nombre es: ${this.nombre} ${this.apellido}`,
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }


  // --- Hace una simulación de un cierre de sesión --- //
  cerrarSesion(){
    this.navCtrl.navigateBack('/login');
  }


  async esperar(){
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log("Han pasado 1 segundos")
  }


}
