import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MenuService } from '../../services/menu.service';
import { USERS } from 'app/models/avatar';
import { LoginUsuario } from 'app/models/login-usuario';
import { TokenService } from 'app/services/token.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImageUserComponent } from './image-user/image-user.component';
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import { AuthService } from 'app/services/auth.service';
import { DataU } from 'app/models/datau';
import { Url_Back } from 'app/config/config';



declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children: string;
}

declare interface User {
  name: string;
  foto: string;
  rol: string;
}

export const ROUTE: RouteInfo[] = [
  { path: '/home',children:'', title: 'Dashboard',  icon: 'dashboard', class: '' },
];
export const ROUTES: RouteInfo[] = [
  { path: '/home',children:'', title: 'Dashboard', icon: 'dashboard', class: 'color:white', },
  { path: '/lists',children:'', title: 'Listas', icon: 'view_list', class: '' },
  { path: '/users',children:'', title: 'Usuarios', icon: 'person', class: '' },
  { path: '/chatbot',children:'', title: 'ChatBot', icon: 'psychology', class: '' },
  { path: '/clients',children:'', title: 'clientes', icon: 'library_books', class: '' },
  { path: '/history',children:'', title: 'historial', icon: 'bubble_chart', class: '' },
  { path: '/aiml',children:'', title: 'Aimls', icon: 'post_add', class: '' },
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})

export class SidebarComponent implements OnInit {
  isAdmin = false;
  isUsers = false;
  adminrol= false; 
  menuItemss: any[];


  public menuItems: any;
  public name: any;
  public identity: any;
  public rol: any;
  public show: boolean;
  public USERS: any;
  icon: any;
  ROUTES: any;
  foto: any;
  infos: any = {};
  isLogin = false;
  roles: string[];
  authority: string;
  devolver: Boolean;
  usuario: LoginUsuario;
  imagen: any;
  public id: Array<any>;
  uno: any;
  dos: any;
  public imagen1: any;
  rutaimagen: any;
  public y: any;
  imagen_users: any;
  dataUser: DataU[] = [];
  variable: any;
  variables: any;
  datuserid: any;
  public datid: any;
  public otra: any;
  public ulti: any;
  arrayDesdeService: any;
  dato: any;
  idU: any;

  public carga: boolean;

  constructor(private authService: AuthService, private userRegister: UserRegisterService,
    public dialog: MatDialog, private userService: UserService,
    private MenuService: MenuService, private tokenService: TokenService, private router: Router) {
    this.identity = this.userService.dataUserSesion(USERS),
      this.rol = this.userService.datauserrol(),
      this.ROUTES = this.MenuService.menuOptionService(ROUTES);
      this.carga = false;
  }

  openDialog() {
    const config = new MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    const dialogRef = this.dialog.open(ImageUserComponent, config)
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.carga = true;
    }, 300);

    this.menuItemss = ROUTE.filter(menuItem => menuItem);
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
     
      if (rol === 'ROLE_USER'){
        this.adminrol=true;
      }
    });

    this.authService.id().subscribe(response => response.forEach((idUser: DataU) => {
      this.dataUser.push(idUser)
      this.dato = idUser.id_user;
      this.otra = this.dato.id;
      if (this.infos.id == this.otra) {
        this.dataUser.push(idUser)
        this.idU = idUser.id
        this.userRegister.avatarChat(this.idU).subscribe(
          data => {
            this.imagen = data;
            this.imagen1 = this.imagen.image_user;
            this.rutaimagen =  Url_Back+'users/uploads/users/' + this.imagen1;
            return this.imagen1;
          },
          err => {
            console.log(err);
          }
        )
      }
    }));
    this.menuItems = ROUTES.filter(menuItems => this.MenuService.menuOptionService(ROUTES));
    this.infos = {
      email: this.tokenService.getUserName(),
      id: this.tokenService.getId(),
      authorities: this.tokenService.getAuthorities()
    };
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}