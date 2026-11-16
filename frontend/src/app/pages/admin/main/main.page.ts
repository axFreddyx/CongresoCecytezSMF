import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: false,
})
export class MainPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  constructor(private api: Api) { }

  data: any = {
    main: {
      section_main: { title: '', description: '' },
      contacto: { phone_number: '', email: '', address: '', schedule: '' },
      styles: {
        colorPrimario: '',
        colorPrimario2: '',
        colorSecundario: '',
        colorSecundario2: ''
      },
      fotos: null,
      requisitos: null,
      instrucciones: null,
      calendario: null,
      convocatoria: null,
      programa: null,
    },
    hoteles: {
      name: "",
      location: "",
      website: "",
      contact: "",
      images: null
    },
    datos_bancarios: {
      titular_name: '',
      bank: '',
      account_number: '',
      clabe: '',
      file: null
    },
    costos: {
      price_asistente: "",
      price_ponente: "",
      price_taller: "",
      surcharge: "",
      discount_cecytez_member: "",
      price_talleres: 300
    }
  };

  token: any;

  ngOnInit() {
    this.token = localStorage.getItem("token")
  }

  // ---------------------------------------------------------
  // MÉTODO PRINCIPAL PARA CREAR TODAS LAS COLECCIONES STRAPI
  // ---------------------------------------------------------
  async create() {
    try {

      await this.main()

    } catch (err) {
      console.error("❌ ERROR EN CREATE():", err);
      alert("Error creando datos ❌");
    }
  }

  async main() {
    try {
      const mainFD = new FormData();

      // --- Sección DATA ---
      mainFD.append("data", JSON.stringify({
        section_main: {
          title: this.data.main.section_main.title,
          description: this.data.main.section_main.description
        },
        section_contact: {
          phone_number: this.data.main.contacto.phone_number,
          email: this.data.main.contacto.email,
          address: this.data.main.contacto.address,
          schedule: this.data.main.contacto.schedule
        },
        styles: {
          colorPrimario: this.data.main.styles.colorPrimario,
          colorPrimario2: this.data.main.styles.colorPrimario2,
          colorSecundario: this.data.main.styles.colorSecundario,
          colorSecundario2: this.data.main.styles.colorSecundario2
        }
      }));

      // --- Sección FILES ---
      const keysMainFiles = [
        "fotos",
        "requisitos",
        "instrucciones",
        "calendario",
        "convocatoria",
        "programa",
        "ficha_de_pago"
      ];

      keysMainFiles.forEach((key: string) => {
        const file = this.data.main[key];

        if (file) {
          // Si es array de archivos
          if (Array.isArray(file)) {
            file.forEach((f: File) => {
              mainFD.append(`files.${key}`, f);
            });
          } else {
            // Archivo único
            mainFD.append(`files.${key}`, file);
          }
        }
      });

      // Aquí enviarías mainFD con axios o fetch

      // for (const pair of (mainFD as any).entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      await this.api.post("mains", mainFD, this.token)

      // await axios.post("/api/endpoint", mainFD);

    } catch (error) {
      console.error(error);
    }
  }

  openModal() {
    this.modal.present();
  }

  // async saveMain() {
  //   console.log(this.data);
  // }

  onFile(e: Event, key: string) {
    const input = e.target as HTMLInputElement | null;
    const file = input?.files?.[0] || null;
    this.data.main[key] = file;
  }

}
