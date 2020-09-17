import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario }  from  '../../models/login-usuario';
import { AuthService } from   '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { GLOBAL } from '../../global';
import { UserRegisterService } from 'app/services/usuario/user-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public logo: string;
  public avatar: string;
  form: any = {};
  usuario: LoginUsuario;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  errorMsg = '';
  spinnerActive:boolean;


  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router, private userRegister:UserRegisterService) {
    this.logo = GLOBAL.logo;
    this.avatar = GLOBAL.avatar;
   }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

    this.tokenService.logOut();
  }

  onLogin(): void {
    this.usuario = new LoginUsuario(this.form.email, this.form.password);
    this.authService.login(this.usuario).subscribe(data => {
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.email);
      this.tokenService.setId(data.id);
      this.tokenService.setAuthorities(data.authorities);
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
      this.router.navigate(['home']);
    },
      (err: any) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMsg = err.error.message;
      }
    );
  }

  spinner(){
    this.spinnerActive = true;
  }

  
}