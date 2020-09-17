import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { DashboardService } from 'app/services/dashboard/dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  info: any = {};
  isLogin = false;
  roles: string[];
  authority: string;
  devolver: boolean;
  public userCount: string;
  public cpublicCount: string;
  public cprivadoCount: string;
  public questionCount: string;
  public timeExpiredCount: string;
  public responseLinkCount: string;
  public userCountWeek: string;
  public userCountDay: string;
  public cpublicCountWeek: string;
  public cpublicCountDay: string;
  public cprivadoCountWeek: string;
  public cprivadoCountDay: string;
  public questionCountWeek: string;
  public questionCountDay: string;
  public PrivateFrequencyLast: any = {};
  public PrivateFrequencyToday: any = {};
  public PublicFrequencyLast: any = {};
  public PublicFrequencyToday: any = {};
  public titulo1: string = "Usuarios";
  public titulo2: string = "Clientes Públicos";
  public titulo3: string = "Clientes Privados";
  public titulo4: string = "ChatBot";
  public titulo5: string = "Esta Semana";
  public titulo6: string = "Hoy";
  public titulo7: string = "Estadísticas";
  public titulo8: string = "Usuario Frecuentes";
  public titulo9: string = "Redireccionamiento";
  public titulo10: string = "Conversaciones Expiradas";
  public titulo11: string = "Mes Pasado";
  public titulo12: string = "No Existe Usuario Frecuente en la Base de Datos";
  public titulo13: string;
  public titulo14: string;
  public titulo15: string;
  public titulo16: string;

  constructor(private tokenService: TokenService,
    private router: Router,
    private dashboardService: DashboardService) { }

  ngOnInit() {
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
        this.client();
        this.dashboar();
        if (rol === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }
  client() {
    this.dashboardService.clientPrivateFrequencyLast().subscribe(response => {
      if (response.id === 0) {
        this.swalAlert();
        this.titulo13 = "No Hubo Cliente Privado Frecuente del Mes";
        console.log(response)
      } else {
        this.PrivateFrequencyLast = response
      } (err) => {
        this.swalAlert();
        console.log("No Existe Data");
        throw err;
      }
    })
    this.dashboardService.clientPublicFrequencyLast().subscribe(response => {
      if (response.id === 0) {
        this.swalAlert();
        this.titulo14 = "No Hubo Cliente Público Frecuente del Mes";
      } else {
        this.PublicFrequencyLast = response
      } (err) => {
        this.swalAlert();
        console.log("No Existe Data");
        throw err;
      }
    })
    this.dashboardService.clientPrivateFrequencyToday().subscribe(response => {
      if (response.id === 0) {
        this.swalAlert();
        this.titulo15 = "No Hubo Cliente Privado del Día";
      } else {
        this.PrivateFrequencyToday = response
      } (err) => {
        this.swalAlert();
        console.log("No Existe Data");
        throw err;
      }
    })
    this.dashboardService.clientPublicFrequencyToday().subscribe(response => {
      if (response.id === 0) {
        this.swalAlert();
        this.titulo16 = "No Hubo Cliente Público del Día";
      } else {
        this.PublicFrequencyToday = response;
      } (err) => {
        this.swalAlert();
        console.log("No Existe Data");
        throw err;
      }
    })
  }

  dashboar() {
    this.dashboardService.countUsers().subscribe(response => {
      this.userCount = response
    })
    this.dashboardService.countClientPublic().subscribe(response => {
      this.cpublicCount = response
    })
    this.dashboardService.countClientPrivate().subscribe(response => {
      this.cprivadoCount = response
    })
    this.dashboardService.countQuestion().subscribe(response => {
      this.questionCount = response
    })
    this.dashboardService.countResponseLink().subscribe(response => {
      this.responseLinkCount = response
    })
    this.dashboardService.countTimeExpired().subscribe(response => {
      this.timeExpiredCount = response
    })
    this.dashboardService.countUsersWeek().subscribe(response => {
      this.userCountWeek = response
    })
    this.dashboardService.countUsersDay().subscribe(response => {
      this.userCountDay = response
    })
    this.dashboardService.countClientPublicWeek().subscribe(response => {
      this.cpublicCountWeek = response
    })
    this.dashboardService.countClientPublicDay().subscribe(response => {
      this.cpublicCountDay = response
    })
    this.dashboardService.countClientPrivateWeek().subscribe(response => {
      this.cprivadoCountWeek = response
    })
    this.dashboardService.countClientPrivateDay().subscribe(response => {
      this.cprivadoCountDay = response
    })
    this.dashboardService.countQuestionWeek().subscribe(response => {
      this.questionCountWeek = response
    })
    this.dashboardService.countQuestionDay().subscribe(response => {
      this.questionCountDay = response
    })
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.authority = '';
    this.router.navigate(['login']);
  }
  //////////////////////Swal Alert//////////////////////////////
  swalAlert() {
    let timerInterval
    Swal.fire({
      title: '' + this.titulo12,
      timer: 1500,
      timerProgressBar: false,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              Swal.getTimerLeft()
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }
}