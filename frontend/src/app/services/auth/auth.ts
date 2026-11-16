import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  apiUrl: any = environment.apiUrl;
  constructor(
  ) { }

  async login(data: any) {
    // return this.apiUrl + '/auth/local';
    return await axios.post(`${this.apiUrl}/auth/local`, data);
  }

  isTokenValid() {
    return localStorage.getItem('token') !== null;
  }

}
