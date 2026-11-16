import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.page.html',
  styleUrls: ['./mesas.page.scss'],
  standalone: false
})
export class MesasPage implements OnInit {

  @ViewChild('modal', { static: false }) modal!: IonModal;


  constructor(
    private api: Api,
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }

  token: any;
  isUpdate: boolean = false;
  isLogged: boolean = !!localStorage.getItem("token")?.trim();
  isAdmin: boolean = false;

  async ngOnInit() {
    this.token = localStorage.getItem("token");
    await this.getUserMe()
    await this.get()
    console.log(this.isLogged)
    console.log(this.isAdmin)
  }

  data: any = {
    name: "",
    description: "",
  }

  listMesasSave: any[] = []
  mesas: any[] = []
  mesa: any = {}
  user: any = {}


  async get() {
    try {
      const res = await this.api.getMesas(this.token);
      // console.log(res.data.data)
      this.mesas = res.data.data

      console.log(this.mesas)
    } catch (error) {
      console.error(error)
    }
  }

  async getUserMe() {
    try {
      const res = await this.api.getUserMe(this.token);
      this.user = res.data
      console.log(this.user.role.type)
      if (this.user && this.user.role.type === "administrador") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    } catch (error) {
      console.error(error)
      this.user = {}
    }
  }

  async save() {
    try {

      if (this.listMesasSave.length > 0) {
        await this.saveToMany();
        this.listMesasSave = []
        this.presentToast("Se han creado nuevas mesas", "success")
        // return
      } else {
        const datafill = !!this.data.name.trim() &&
          !!this.data.description.trim()

        if (!datafill) {
          this.presentToast("Campos faltantes", "danger")
          return;
        }

        await this.saveToOne();
        this.presentToast("La nueva mesa se ha creado", "success")
        // return;
      }
      this.confirm()
      this.resetVist()
      this.get()
    } catch (error) {
      console.error(error)
    }
  }

  async saveToOne() {
    await this.api.saveMesas(this.data, this.token);
  }

  async saveToMany() {
    this.listMesasSave.forEach(async (t: any) => {
      await this.api.saveMesas(t, this.token);
    })
  }

  async update() {
    try {
      await this.api.updateMesas(this.mesa.documentId, this.data, this.token);
      this.resetVist()
      await this.get()
      this.confirm()
      this.presentToast("Se ha actualizado la mesa", "success")
    } catch (error) {
      this.presentToast("Ha ocurrido un error", "danger")
      console.error(error)

    }
  }

  async delete(mesa: any) {
    try {
      await this.api.deleteMesas(mesa.documentId, this.token);
      this.resetVist()
      await this.get()
      this.presentToast("Se ha eliminado la mesa", "success")

    } catch (error) {
      console.error(error)
      this.presentToast("Ha ocurrido un error", "danger")
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.isUpdate = false
    this.reset()
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

  reset() {
    this.data = {
      name: "",
      description: "",
    }
    this.listMesasSave = [];
  }

  openModal() {
    this.modal.present()
  }

  openModalUpdate(mesa: any) {
    this.isUpdate = true
    this.data = {
      name: mesa.name,
      description: mesa.description,
    }
    this.mesa = mesa
    this.modal.present()
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

  addToList() {
    this.listMesasSave.push(this.data)
    console.log(this.listMesasSave)
    this.data = {
      name: "",
      description: "",
    }
  }

  resetVist() {
    this.mesas = []
    this.mesa = {}
  }

  async alert(mesa: any) {
    const alert = await this.alertController.create({
      header: "¿Estas seguro de eliminar?",
      subHeader: "No se podrá revertir la acción si se procede con la eliminación.",
      message: "¿Deseas continuar?",
      buttons: [{
        text: 'Si',
        role: 'confirm',
        handler: () => {
          // console.log('Confirm OK');
          this.delete(mesa);
          alert.dismiss()
        }
      },
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          alert.dismiss()
        }
      }]
    });

    await alert.present();
  }

}
