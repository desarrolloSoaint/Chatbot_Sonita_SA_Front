import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Historial } from 'app/models/history'
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import { HistoryService } from 'app/services/history/history.service';
import { Clientes } from 'app/models/clientes';
import { PrivateContact } from 'app/models/private-contact';
import Swal from 'sweetalert2';
import { Historialecu } from 'app/models/historyencu';

@Component({
  selector: 'app-tablados',
  templateUrl: './tablados.component.html',
  styleUrls: ['./tablados.component.css']
})
export class TabladosComponent implements OnInit {
  public load: boolean;
  dataSources: MatTableDataSource<Historialecu>;
  displayedColumnss = ['Cliente', 'Quedo Conforme con la informacion suministrada', 'evaluando la calidad del chatbot,como lo identifica', 'volveria a recurrir a preguntarle al chatbot'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public hist: Historial[] = [];
  public histe: Historialecu[] = [];
  public historial: Historial = new Historial();
  public historials: Historialecu = new Historialecu();
  public clientes: Clientes[] = [];
  public clientes2: Clientes = new Clientes(1, 'pivot', 1, null);
  public clientes3: PrivateContact = new PrivateContact();
  public PrivateContact: PrivateContact[] = [];
  
  constructor(private userRegister: UserRegisterService,
    private history: HistoryService) {
    this.load = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.load = true;
    }, 3000);
    this.dataSources = new MatTableDataSource(this.histe);
    this.dataSources.paginator = this.paginator;
    this.history.historialecu().subscribe(response => {
      if (response.length === 0) {
        this.swalAlert();
        console.log(response);
      } else {
        response.forEach((histe: Historialecu) => {
          this.histe.push(histe)
          this.dataSources.data = [];
          this.dataSources.data = this.histe.slice(0);
          console.log('histe', this.histe);
          for (let index = 0; index < this.dataSources.data.length; index++) {
            if (this.dataSources.data[index].id_client == null) {
              this.dataSources.data[index].id_client = this.clientes2;
              this.dataSources.data[index].id_client.email = '';
              this.dataSources.data[index].id_client.id_country = this.dataSources.data[index].id_client_private.id_country.id;
            } else {
              if (this.dataSources.data[index].id_client.email != '') {
                this.dataSources.data[index].id_client_private = this.clientes3;
                this.dataSources.data[index].id_client_private.email = ''
                this.dataSources.data[index].id_client_private.id_country = this.dataSources.data[index].id_client
                this.dataSources.data[index].id_client_private.password = ''
              }
            }
          }
        })
      }
    });
  }

  swalAlert() {
    let timerInterval
    Swal.fire({
      title: ' NO Posee Data',
      timer: 2000,
      timerProgressBar: true,
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