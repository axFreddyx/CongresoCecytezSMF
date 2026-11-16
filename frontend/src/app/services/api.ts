import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor() { }
  url: any = environment.apiUrl;

  headers(token: string) {
    return {
      headers: {
        Authorization: `${token}`,   // ← FORZAR EL BEARER
        // Accept: "application/json"          // ← ESTA ES LA CLAVE
        // NO PONER Content-Type
      }
    }
  }


  //#region Users

  async getUsers(token: any) {
    return await axios.get(`${this.url}/users?populate=*`, this.headers(token));
  }

  async getUserMe(token: any) {
    return await axios.get(`${this.url}/users/me?populate=*`, this.headers(token));
  }

  async createUser(data: any) {
    return await axios.post(`${this.url}/users`, data);
  }

  async updateUser(userId: string, data: any, token: string) {
    return await axios.put(
      `${this.url}/users/${userId}`,
      data,
      this.headers(token)
    );
  }

  async deleteUser(id: any, token: any) {
    return await axios.delete(`${this.url}/users/${id}`, this.headers(token))
  }

  //#endregion

  //#region Roles
  async getRoles() {
    return await axios.get(`${this.url}/users-permissions/roles`)
  }
  //#endregion

  //#region Envio email's

  async emailPreRegistro(data: any) {
    return await axios.post(`${this.url}/email/pre-registro`, data);
  }

  async emailComprobante(data: any) {
    // console.log("URL usada por Angular:", `${this.url}/email/comprobante`);
    return await axios.post(`${this.url}/email/comprobante`, data);
  }

  //#endregion

  //#region Talleres

  async getTalleres(token: any) {
    return await axios.get(`${this.url}/workshops?populate=*`, this.headers(token))
  }

  async saveTalleres(data: any, token: any) {
    return await axios.post(`${this.url}/workshops`, { data }, this.headers(token))
  }

  async updateTalleres(id: any, data: any, token: any) {
    return await axios.put(`${this.url}/workshops/${id}`, { data }, this.headers(token))
  }

  async deleteTalleres(id: any, token: any) {
    return await axios.delete(`${this.url}/workshops/${id}`, this.headers(token))
  }
  //#endregion

  //#region Mesas de trabajo
  async getMesas(token: any) {
    return await axios.get(`${this.url}/work-tables?populate=*`, this.headers(token))
  }

  async saveMesas(data: any, token: any) {
    return await axios.post(`${this.url}/work-tables`, { data }, this.headers(token))
  }

  async updateMesas(id: any, data: any, token: any) {
    return await axios.put(`${this.url}/work-tables/${id}`, { data }, this.headers(token))
  }

  async deleteMesas(id: any, token: any) {
    return await axios.delete(`${this.url}/work-tables/${id}`, this.headers(token))
  }
  //#endregion

  //#region Comprobantes
  async getComprobantes(token: any) {
    return await axios.get(`${this.url}/receipts`, this.headers(token));
  }

  async getComprobanteById(id: number, token: any) {
    return await axios.get(`${this.url}/receipts/${id}`, this.headers(token));
  }

  async createComprobante(data: any, token: any) {
    return await axios.post(`${this.url}/receipts`, data, this.headers(token));
  }

  async updateComprobante(id: number, data: any, token: any) {
    return await axios.put(`${this.url}/receipts/${id}`, { data: data }, this.headers(token));
  }

  async deleteComprobante(id: number, token: any) {
    return await axios.delete(`${this.url}/receipts/${id}`, this.headers(token));
  }

  //#endregion

  //#region Main (CORREGIDO)

  // POST (Crear)
  async post(collection: string, data: any, token: any) {

    // console.log("↓↓ VERIFICANDO FORMDATA ↓↓");

    // for (const pair of (data as any).entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    const res = await axios.post(
      `${this.url}/${collection}`,
      data,           // ✔ Enviar FormData directo
      this.headers(token)
    );
    return res.data;
  }

  // PUT (Actualizar)
  async put(collection: string, id: number, data: FormData, token: any) {
    const res = await axios.put(
      `${this.url}/${collection}/${id}`,
      data,           // ✔ Igual: FormData directo
      this.headers(token)
    );
    return res.data;
  }

  // GET (Obtener todo)
  async get(collection: string, token: any) {
    const res = await axios.get(`${this.url}/${collection}`, this.headers(token));
    return res.data;
  }

  // GET por ID
  async getById(collection: string, id: number, token: any) {
    const res = await axios.get(`${this.url}/${collection}/${id}`, this.headers(token));
    return res.data;
  }

  //#endregion


  //#region Uploads

  async uploadFile(file: File, token: any) {
    const fd = new FormData();
    fd.append('files', file);

    return await axios.post<any[]>(
      `${this.url}/upload`,
      fd,
      this.headers(token)
    );
  }

  //#endregion


  // async uploadFiles(files: File[]): Promise<any[]> {
  //   const token = localStorage.getItem("token");

  //   // axios devuelve Promises, así que NO convertimos nada a Observable
  //   const uploads = files.map(f => this.uploadFile(f, token));

  //   // Esperamos todas las Promises de axios
  //   const results = await Promise.all(uploads);

  //   // axios responde: { data: [...] }
  //   const fileArrays = results.map(r => r.data);

  //   // achatamos los arrays
  //   return ([] as any[]).concat(...fileArrays);

  // }

  // #endregion

}
