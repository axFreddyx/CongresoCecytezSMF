import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  constructor(
    private api: Api,
    private toastController: ToastController,
  ) { }

  estados: any[] = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de Mexico",
    "Coahuila",
    "Colima",
    "Durango",
    "Estado de Mexico",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Michoacan",
    "Morelos",
    "Nayarit",
    "Nuevo Leon",
    "Oaxaca",
    "Puebla",
    "Queretaro",
    "Quintana Roo",
    "San Luis Potosi",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatan",
    "Zacatecas"
  ]

  data: any = {
    name: "",
    last_name: "",
    email: "",
    username: "",
    phone_number: "",
    institution: "",
    state: "",
    role: "",
    gender: "",
    cecytez_member: false,
    isUserCongreso:true
  }

  confirm_email: any = ""

  roles: any[] = []

  dataEmail: any = {
    email: "",
    nombre: "",
    folio: "",
    urlAcceso: ""
  }

  ngOnInit() {
    this.getRoles()
  }

  async register() {
    try {
      console.log(this.data)
      const datafill = !!this.data.name.trim() &&
        !!this.data.last_name.trim() &&
        !!this.data.email.trim() &&
        !!this.confirm_email.trim()&&
        !!this.data.phone_number.trim() &&
        !!this.data.institution.trim() &&
        !!this.data.state.trim() &&
        !!this.data.role.trim() &&
        !!this.data.gender.trim()

      if (!datafill) {
        this.presentToast("Campos faltantes, llene todo el formulario.", "danger")
        return;
      }

      if (this.data.email !== this.confirm_email) {
        this.presentToast("Los correos electronicos son diferentes, intente de nuevo.", "danger")
        return;
      }

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

  async enviarCorreo() {
    try {
      await this.api.emailPreRegistro(this.dataEmail)
      // console.log(res)
    } catch (err) {
      console.error(err);
    }
  }

  async getRoles() {
    try {
      const res = await this.api.getRoles();

      const roles = res.data.roles

      roles.map((role: any) => {
        const type = role.type;
        if (
          type !== "authenticated" &&
          type !== "public" &&
          type !== "moderador" &&
          type !== "dictaminador" &&
          type !== "administrador"
        ) {
          this.roles.push(role)
        }

      });
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
}