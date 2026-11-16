import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, ToastController } from '@ionic/angular';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: false,
})
export class UsersPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  constructor(
    private api: Api,
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }

  allUsers: any[] = [];       // Lista original
  users: any[] = [];          // Lista filtrada
  token: any;
  roles: any[] = []
  isUpdate: boolean = false;
  user: any = {}

  isLogged:any = !!localStorage.getItem("token")?.trim()
  isAdmin:boolean = false;

  data: any = {
    name: "",
    last_name: "",
    email: "",
    username: "",
    phone_number: "",
    gender: "",
    role: "",
    isUserCongreso: false
  }

  dataEmail: any = {
    email: "",
    nombre: "",
    folio: "",
    urlAcceso: ""
  }

  confirm_email: any = ""

  activeRole: string | null = null;
  filterCecytez: boolean | null = null; // true | false | null
  filterCongreso: boolean | null = null; // true = congreso, false = sistemas, null = todos

  async ngOnInit() {
    this.token = localStorage.getItem("token");
    this.getUsers();
    this.getRoles();
    await this.getUserMe();
    console.log(this.isLogged)
    console.log(this.isAdmin)
  }

  // ============================
  // ✔ GET principal optimizado
  // ============================
  async getUsers() {
    try {
      const res = await this.api.getUsers(this.token);
      this.allUsers = res.data;
      this.users = [...this.allUsers]; // copia inicial
    } catch (error) {
      console.error(error);
    }
  }

  async register() {
    try {
      console.log(this.data)
      const datafill = !!this.data.name.trim() &&
        !!this.data.last_name.trim() &&
        !!this.data.email.trim() &&
        !!this.data.phone_number.trim() &&
        !!this.data.role.trim() &&
        !!this.data.gender.trim()

      if (!datafill) {
        this.presentToast("Campos faltantes, llene todo el formulario.", "danger")
        return;
      }

      // if (this.data.email !== this.confirm_email) {
      //   this.presentToast("Los correos electronicos son diferentes, intente de nuevo.", "danger")
      //   return;
      // }

      let max = 9999; // Número máximo (inclusive)
      let min = 1111;
      let numero = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log(numero);

      console.log(numero); // Ejemplo: 0, 1, 2 ... 9
      const folio = `EDPD-${numero}`

      this.data.password = folio

      await this.api.createUser(this.data);

      this.dataEmail = {
        email: this.data.email,
        nombre: `${this.data.name} ${this.data.last_name}`,
        folio: folio,
        urlAcceso: "http://localhost:8100/login"
      }
      await this.enviarCorreo();

      this.presentToast("Pre-registro exitoso. Te hemos mandado un correo electronico en donde vendrá tu folio de acceso.", "success")
    } catch (error) {
      console.error(error)
    }
  }

  async update() {
    try {
      await this.api.updateUser(this.user.id, this.data, this.token);
      this.presentToast(`Se ha actualizado a ${this.user.name} de manera exitosa`, "success")
      this.resetView();
      this.reset()
      this.cancel()
    } catch (error) {
      this.presentToast(`Ha ocurrido un error`, "danger")
      console.error(error)
    }
  }

  resetView() {
    this.users = []
    this.getUsers();
  }

  reset() {
    this.data = {}
    this.isUpdate = false
  }

  async delete(user: any) {
    try {
      await this.api.deleteUser(user.id, this.token);
      this.presentToast(`Se ha eliminado a ${user.name} de manera exitosa`, "success")
      this.resetView();
    } catch (error) {
      console.error(error)
      this.presentToast(`Ha ocurrido un error`, "danger")
    }
  }
  // ==========================================
  // ✔ Lógica centralizada de filtrado
  // ==========================================
  applyFilters() {
    this.users = this.allUsers.filter(u => {

      // ---- Filtrar por rol ----
      if (this.activeRole && u.role.type !== this.activeRole) {
        return false;
      }

      // ---- Filtrar por miembro Cecytez ----
      if (this.filterCecytez !== null && u.cecytez_member !== this.filterCecytez) {
        return false;
      }

      // ---- Filtrar por usuario Congreso/Sistemas ----
      if (this.filterCongreso !== null && u.isUserCongreso !== this.filterCongreso) {
        return false;
      }

      return true;
    });
  }

  async getRoles() {
    try {
      const res = await this.api.getRoles();
      const roles = res.data.roles;

      this.roles = roles.filter((role: any) =>
        !["authenticated", "public", "co_autor", "asistente", "ponente"].includes(role.type)
      );

    } catch (error) {
      console.error(error)
    }
  }

  // ===============================
  // ✔ Filtros individuales
  // ===============================

  // Filtrar por rol
  userByRole(role: string) {
    this.activeRole = role;
    this.applyFilters();
  }

  search(event: any) {
    const value = event.target.value.toLowerCase().trim();

    this.applyFilters(); // limpia filtros previos

    if (value.length === 0) return;

    this.users = this.users.filter(u =>
      `${u.name} ${u.last_name}`.toLowerCase().includes(value)
    );
  }

  // Limpiar filtro de rol
  clearRoleFilter() {
    this.activeRole = null;
    this.applyFilters();
  }

  // Filtrar por Congreso
  getUsersCongreso() {
    this.filterCongreso = true;
    this.applyFilters();
  }

  async getUserMe(){
    try {
      const res = await this.api.getUserMe(this.token);
      const role_type = res.data.role.type
      if(role_type === "administrador"){
        this.isAdmin = true
      }
      console.log(role_type)
    } catch (error) {
      console.error(error)
    }
  }

  // Filtrar por Sistemas
  getUsersSystems() {
    this.filterCongreso = false;
    this.applyFilters();
  }

  // Quitar filtro Congreso/Sistemas
  clearCongresoFilter() {
    this.filterCongreso = null;
    this.applyFilters();
  }

  // Filtrar por miembro cecytez
  cecytezMember(state: boolean | null) {
    this.filterCecytez = state;
    this.applyFilters();
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

  cancel() {
    this.modal.dismiss()
    this.isUpdate = false
  }

  openModal() {
    this.modal.present()
  }

  async enviarCorreo() {
    try {
      await this.api.emailPreRegistro(this.dataEmail)
      // console.log(res)
    } catch (err) {
      console.error(err);
    }
  }

  async openModalUpdate(user: any) {

    // Espera a que roles esté cargado
    if (this.roles.length === 0) {
      await this.getRoles();
    }

    this.isUpdate = true;

    this.data = {
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      phone_number: user.phone_number,
      gender: user.gender,
      role: Number(user.role.id),  // << IMPORTANTE
    }

    this.user = user

    this.modal.present();
  }

  async alert(user: any) {
    const alert = await this.alertController.create({
      header: "¿Estas seguro de eliminar?",
      subHeader: "No se podrá revertir la acción si se procede con la eliminación.",
      message: "¿Deseas continuar?",
      buttons: [{
        text: 'Si',
        role: 'confirm',
        handler: () => {
          // console.log('Confirm OK');
          this.delete(user);
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
