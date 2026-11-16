import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Api } from 'src/app/services/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comprobantes',
  templateUrl: './comprobantes.page.html',
  styleUrls: ['./comprobantes.page.scss'],
  standalone: false,
})
export class ComprobantesPage implements OnInit {

  constructor(
    private api: Api,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  token: any;
  comprobantes: any[] = [];
  comprobantesOriginal: any[] = []; // ← copia sin filtrar

  comprobante: any = {};
  validate: boolean = false
  files: any[] = [];
  url: any
  user: any = {}

  data: any = {
    validated: false
  }

  dataEmail: any = {
    "email": "",
    "nombre": "",
    "estado": "",
    "urlAcceso": ""
  }

  async ngOnInit() {
    this.token = localStorage.getItem("token");
    this.getComprobantes()
    await this.getUserMe()
  }

  async getComprobantes() {
    try {
      this.files = [];

      const res = await this.api.getComprobantes(this.token);

      this.comprobantes = res.data;
      this.comprobantesOriginal = [...res.data]; // ← respaldo

      this.comprobantes.forEach(c => {
        c.file.forEach((f: any) => {
          if (f.publishedAt !== null) {
            this.files.push(f);
          }
        });
      });

    } catch (error) {
      console.error(error);
    }
  }

  async aceptar(c: any) {
    try {
      this.data = {
        validated: true,
      }
      await this.api.updateComprobante(c.documentId, this.data, this.token);
      await this.enviarEmail(c.user, "aceptado");
      this.resetView();
      this.presentToast("Se ha aceptado el comprobante y se le ha enviado un correo electronico al usuario. ", "success");
    } catch (error) {
      console.error(error);
      this.presentToast("Ha ocurrido un error.", "danger");
    }
  }

  async resetView() {
    this.comprobantes = []
    await this.getComprobantes()
  }

  async rechazar(c: any) {
    try {
      this.data = {
        isRejected: true,
      }
      await this.api.updateComprobante(c.documentId, this.data, this.token);
      await this.enviarEmail(c.user, "rechazado")
      this.resetView()

      this.presentToast("Se ha rechazado el comprobante y se le ha enviado un correo electronico al usuario. ", "success")
    } catch (error) {
      console.error(error)
      this.presentToast("Ha ocurrido un error.", "danger")
    }
  }

  async cancel_Validation(c: any) {
    try {
      this.data = {
        validated: false,
        isRejected: false,
      }
      await this.api.updateComprobante(c.documentId, this.data, this.token);
      await this.enviarEmail(c.user, "cancelado");
      this.resetView();
      this.presentToast("Se ha cancelado la aceptación el comprobante y se le ha enviado un correo electronico para notificarle al usuario al usuario. ", "success")
    } catch (error) {
      console.error(error)
      this.presentToast("Ha ocurrido un error.", "danger")
    }
  }

  async enviarEmail(data: any, status: any) {
    try {
      this.dataEmail = {
        "email": data.email,
        "nombre": `${data.name} ${data.last_name}`,
        "estado": status,
        "urlAcceso": `http://localhost:8100/login`
      }
      console.log(this.data)
      await this.api.emailComprobante(this.dataEmail);
    } catch (error) {
      console.error(error)
    }
  }

  async getUserMe() {
    try {
      const res = await this.api.getUserMe(this.token);

      // this.user = res.data

      // const role_type = res.data.role.type
      // if (role_type === "administrador") {
      //   this.isAdmin = true
      // }
      // console.log(role_type)
    } catch (error) {
      console.error(error)
    }
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: "top",
      color: color
    });

    await toast.present();
  }

  async alert(c: any, isRejected: boolean) {

    const config = isRejected
      ? {
        header: "¿Quieres rechazar este comprobante de pago?",
        subHeader: "Esta acción no se puede deshacer.",
        action: () => this.rechazar(c)
      }
      : {
        header: "¿Quieres aceptar este comprobante de pago?",
        subHeader: "Confirma que la información del comprobante es correcta.",
        action: () => this.aceptar(c)
      };

    const alert = await this.alertController.create({
      header: config.header,
      subHeader: config.subHeader,
      message: "¿Deseas continuar?",
      buttons: [
        {
          text: "Sí",
          role: "confirm",
          handler: () => {
            alert.dismiss();
            config.action();
          }
        },
        {
          text: "No",
          role: "cancel",
          handler: () => alert.dismiss()
        }
      ]
    });

    await alert.present();
  }

  filtrarAceptados() {
    this.comprobantes = this.comprobantesOriginal.filter(c => c.validated === true);
  }

  filtrarRechazados() {
    this.comprobantes = this.comprobantesOriginal.filter(c => c.isRejected === true);
  }

  filtrarTodo() {
    this.comprobantes = [...this.comprobantesOriginal];
  }

  filtrarNoValidados() {
    this.comprobantes = this.comprobantesOriginal.filter(
      c => c.validated === false && c.isRejected !== true
    );
  }


}
