import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private api: Api,
    private toastController: ToastController,
  ) { }

  token: string = '';
  user: any = {}
  isLoginPage: boolean = this.router.url === '/login';
  isLogged: boolean = false;


  ngOnInit() {
    this.token = localStorage.getItem("token") || '';
    this.isLogged = !!(this.token && this.token.trim());

    this.getUserMe();
  }

  async logout() {
    try {
      const res = await this.api.updateUser(this.user.id, { isLogged: false }, this.token)
      console.log(res)
      localStorage.removeItem("token")
      this.token = "";
      this.presentToast("Has cerrado sesión", "success");
      this.router.navigate(["/home"])
    } catch (error) {
      console.error(error)
    }
  }

  async getUserMe() {
    try {
      const res = await this.api.getUserMe(this.token);
      this.user = res.data
      console.log(this.user)
    } catch (error) {
      // console.error(error)
      this.user = {}
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
