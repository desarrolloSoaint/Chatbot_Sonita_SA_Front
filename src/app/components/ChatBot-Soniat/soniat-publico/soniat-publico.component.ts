import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Country } from 'app/models/country';
import { Router } from '@angular/router';
import { Clientes } from 'app/models/clientes';
import { FormBuilder, Validators } from '@angular/forms';
import { AvatarChat } from 'app/models/avatarChat';
import { SoniatService } from 'app/services/soniat/soniat.service';
import Swal from 'sweetalert2';
import { PrivateClient } from 'app/models/private-contact';
import { ThemeSoniatService } from 'app/services/themeSoniat/theme-soniat.service';
import { Colors } from 'app/models/colors';
import { Url_Back } from 'app/config/config';

@Component({
  selector: 'app-soniat-publico',
  templateUrl: './soniat-publico.component.html',
  styleUrls: ['./soniat-publico.component.scss']
})

export class SoniatPublicoComponent implements OnInit {
  public clientes = new Clientes('', null, null, null);
  public clientesPrivado = new PrivateClient('', null, '', null, '');
  public errorMsg: string;
  public errorMsg1: string;
  public mensaje: string;
  public result: any;
  id: Country[] = [];
  avatarChat: AvatarChat[] = [];
  mostrar: boolean = false;
  showContent: number;
  getId: number;
  getIdPrivate:number;
  avatar_chat: string;
  prueba: string;
  img: string;
  form;
  formC;
  public  color: Colors = new Colors();
  public colors: Colors[] = [];

  public themeChatbot = {
    'theme-yellow': false,
    'theme-blue': false,
    'theme-orange': false,
    'theme-green': false,
    'theme-purple': false,
    'theme-red': false,
    'theme-yellowDark': false,
    'theme-blueDark': false,
    'theme-orangeDark': false,
    'theme-greenDark': false,
    'theme-purpleDark': false,
    'theme-redDark': false
  };

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public soniatService: SoniatService,
    public themeService: ThemeSoniatService,) {
    this.form = formBuilder.group({
      pais: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      
    });

    this.formC = formBuilder.group({
      pais: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.authService.country().subscribe(
      data => {
        this.id = data;
      },
      err => {
        console.log(err);
      }
    );

    this.authService.getAvatarChat().subscribe(
      data => {
        this.avatarChat = data;
        this.avatar_chat = this.avatarChat[0].avatarChat;
        this.img =  Url_Back+'avatar/uploads/img/' + this.avatar_chat;
      },
      err => {
        console.log(err);
      }
    );
    this.showContent = 2;
    this.getThemeChatbot();
  }

  onSubmit1(f) {
    var moment = require("moment");
    var current_timestamp = moment().format("ddd MMM D YYYY 00:00:00");
    var current_timestamp = moment(new Date());
    console.log(f.value, 'prueba1');
    this.result = {
      email: this.clientes.email, created_at: current_timestamp._i, id_country: {
        id: this.clientes.id_country,
      },
    };
    console.log(51, this.result);
    this.authService.guardar(this.result).subscribe(
      response => {
        if (response.mensaje == 'Cliente registrado.') {
          this.filterClientPublic();
        }
      }, (err) => {
        this.errorMsg = err;
        console.log(this.errorMsg, 'errorfront');
        throw err;
      });
  }

  onSubmit(f) {
    var moment = require("moment");
    var current_timestamp = moment().format("ddd MMM D YYYY 00:00:00");
    var current_timestamp = moment(new Date());
    console.log(f.value, 'prueba1');
    this.result = {
      email: this.clientesPrivado.email, password: this.clientesPrivado.password, created_at: current_timestamp._i, id_country: {
        id: this.clientesPrivado.id_country,
      },
    };
    console.log(51, this.result);
    this.authService.guardarPrivate(this.result).subscribe(
      response => {
        if (response.mensaje == 'Cliente registrado.') {
          this.filterClientPrivate();
        }
      }, (err) => {
        this.errorMsg1 = err;
        console.log(this.errorMsg1, 'errorfront');
        throw err;
      });
  }

  toggleBox() {
    this.mostrar = !this.mostrar;
  }

  filterClientPublic() {
    const email = this.clientes.email;
    this.soniatService.getPublic().subscribe(response => {
      const filter = response.reverse()[0].email;
      if (email == filter) {
        // console.log("Email Coincide")
        this.getId = response[0].id;
        this.setClientPublic();
        this.setClientPrivate();
        this.router.navigateByUrl('soniat');
      } else {
        // console.log("Email No Coincide")
        this.swalWarning()
      }
    })
  }

  setClientPublic() {
    const id = this.getId;
    this.soniatService.setId(id);
    this.getIdPrivate = undefined
  }

  filterClientPrivate() {
    const email = this.clientesPrivado.email;
    this.soniatService.getPrivate().subscribe(response => {
      const filter = response.reverse()[0].email;
      if (email == filter) {
        // console.log("Email Coincide")
        this.getIdPrivate = response[0].id;
        this.setClientPrivate();
        this.setClientPublic();
        this.router.navigateByUrl('soniat');
      } else {
        // console.log("Email No Coincide")
        this.swalWarning()
      }
    })
  }

  setClientPrivate() {
    const id = this.getIdPrivate;
    this.soniatService.setIdPrivate(id);
    this.getId = undefined;
  }

  public getThemeChatbot() {
    this.themeService.getTheme().subscribe(response => response.forEach((color: Colors) => {
      this.colors.push(color);
      this.setThemeChatbot(response[0].color);
      console.log(response);
    }))
  }

  private setThemeChatbot(theme: string) {
    const themesKeys = Object.keys(this.themeChatbot);
    for (const k of themesKeys) {
      this.themeChatbot[k] = false;
    }
    if (this.themeChatbot[theme] !== undefined) {
      this.themeChatbot[theme] = true;
    } else {
      //Tema por defecto
      this.themeChatbot['theme-blue'] = true;
    }
  }

  //////////////////////////////Swal Alert ////////////////////////////
  swalWarning() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'warning',
      title: 'No fue Encontrado el Cliente Registrado'
    })
  }
}



