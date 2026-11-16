import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Api } from 'src/app/services/api';
import { Auth } from 'src/app/services/auth/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor(
    private auth: Auth,
    private api: Api,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  data: any = {
    identifier: '',
    password: ''
  }

  isMsg: boolean = false;
  user: any = {}

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      this.isMsg = p['msg'] == 1;
      console.log(this.isMsg)
      if (this.isMsg) {
        this.presentToast("Para acceder a las paginas, por favor inicia sesión.", "warning")
      }
    })
  }

  async login() {
    try {

      // Validation
      const dataFull = !!this.data.identifier.trim() &&
        !!this.data.password.trim()

      console.log(dataFull)
      if (!dataFull) {
        this.presentToast('Campos faltantes. Intenta de nuevo.', 'danger');
        return;
      }

      // Login user
      const resLogin = await this.auth.login(this.data);

      // Store token in localStorage
      localStorage.setItem('token', `Bearer ${resLogin.data.jwt}`);
      const token = localStorage.getItem('token') || '';

      // Update user isLogged status
      const userid = resLogin.data.user.id;
      await this.api.updateUser(userid, { isLogged: true }, token);

      // GetUserMe

      await this.getUserMe(token)

      // Redirect


      // console.log(this.user)

      this.redirectByRole(this.user.role?.type);

      // Alert
      this.presentToast('Inicio de sesión exitoso', 'success');
    } catch (error: any) {
      console.error(error)
      if (error.code === "ERR_BAD_REQUEST") {
        this.presentToast("Credenciales incorrectas. Intente de nuevo.", "danger")
      }
    }
  }

  async getUserMe(token: any) {
    try {
      const res = await this.api.getUserMe(token);
      this.user = res.data
      console.log(this.user.role.type)
    } catch (error) {
      console.error(error)
    }
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: "top",
      color: color,
    });

    await toast.present();
  }

  redirectByRole(role: string) {
    switch (role) {
      case 'administrador':
        this.router.navigate(["/dashboard_a"])
        break;

      case 'moderador':
        this.router.navigate(["/dashboard_m"])
        break;

      case 'dictaminador':
        this.router.navigate(["/dashboard_d"])
        break;
      case 'co_autor':
        this.router.navigate(["/dashboard_a_p_c"])

        break;
      case 'ponente':
        this.router.navigate(["/dashboard_a_p_c"])

        break;
      case 'asistente':
        this.router.navigate(["/dashboard_a_p_c"])

        break;
      default:
        this.router.navigate(["/unauthorized"])

        break;
    }
  }

}
