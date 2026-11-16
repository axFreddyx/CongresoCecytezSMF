import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, ToastController } from '@ionic/angular';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.page.html',
  styleUrls: ['./talleres.page.scss'],
  standalone: false,
})
export class TalleresPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  
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

  listTalleresSave: any[] = []
  talleres: any[] = []
  taller: any = {}
  usersInTalleres: any = ""
  user: any = {}


  async get() {
    try {
      const res = await this.api.getTalleres(this.token);
      // console.log(res.data.data)
      this.talleres = res.data.data.map((t: any) => ({ ...t, users: t.users.length }));

      console.log(this.talleres)
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

      const datafill = !!this.data.name.trim() &&
        !!this.data.description.trim()

      if (!datafill) {
        this.presentToast("Campos faltantes", "danger")
        return;
      }

      if (this.listTalleresSave.length > 0) {
        await this.saveToMany();
        this.listTalleresSave = []
        this.presentToast("Se han creado nuevos talleres", "success")
        // return
      } else {
        await this.saveToOne();
        this.presentToast("El nuevo taller se ha creado", "success")
        // return;
      }

      this.resetVist()
      this.get()
      this.confirm()
    } catch (error) {
      console.log(error)
    }
  }

  async saveToOne() {
    await this.api.saveTalleres(this.data, this.token);
  }

  async saveToMany() {
    this.listTalleresSave.forEach(async (t: any) => {
      await this.api.saveTalleres(t, this.token);
    })
  }


  async update() {
    try {
      await this.api.updateTalleres(this.taller.documentId, this.data, this.token);
      this.resetVist()
      await this.get()
      this.confirm()
      this.presentToast("Se ha actualizado el taller", "success")
    } catch (error) {
      this.presentToast("Ha ocurrido un error", "danger")
      console.error(error)

    }
  }

  async delete(taller: any) {
    try {
      await this.api.deleteTalleres(taller.documentId, this.token);
      this.resetVist()
      await this.get()
      this.presentToast("Se ha eliminado el taller", "success")

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
    this.listTalleresSave = [];
  }

  openModal() {
    this.modal.present()
  }

  openModalUpdate(taller: any) {
    this.isUpdate = true
    this.data = {
      name: taller.name,
      description: taller.description,
    }
    this.taller = taller
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
    this.listTalleresSave.push(this.data)
    console.log(this.listTalleresSave)
  }

  resetVist() {
    this.talleres = []
    this.taller = {}
  }

  async alert(taller: any) {
    const alert = await this.alertController.create({
      header: "¿Estas seguro de eliminar?",
      subHeader: "No se podrá revertir la acción si se procede con la eliminación.",
      message: "¿Deseas continuar?",
      buttons: [{
        text: 'Si',
        role: 'confirm',
        handler: () => {
          // console.log('Confirm OK');
          this.delete(taller);
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
