import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/services/token.service';
import { ContactService } from 'app/services/contact.service';
import { Clientes } from 'app/models/clientes';
import { PrivateContact } from 'app/models/private-contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  info: any = {};
  isLogin = false;
  roles: string[];
  authority: string;
  clientes: Clientes [] = [];
  privateContact: PrivateContact [] = []
  
  constructor(private tokenService: TokenService,private contactService: ContactService,
    private router: Router,) { }

  ngOnInit() {
    this.contactService.countPublic().subscribe(
      data => {
        this.clientes = data;
      },
      err => {
        console.log(err);
      }
    );

    this.contactService.countPrivate().subscribe(
      data => {
        this.privateContact = data;
      },
      err => {
        console.log(err);
      }
    );

    this.info = {
      token: this.tokenService.getToken(),
      email: this.tokenService.getUserName(),
      authorities: this.tokenService.getAuthorities()
    };

    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getAuthorities();
      this.roles.every(rol => {
        if (rol === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.authority = '';
    this.router.navigate(['login']);
  }
}
