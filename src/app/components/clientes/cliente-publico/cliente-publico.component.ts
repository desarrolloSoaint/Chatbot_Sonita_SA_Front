import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Clientes } from 'app/models/clientes';
import { MatDialog } from '@angular/material/dialog';
import { ClientePublicoModalComponent } from './cliente-publico-modal/cliente-publico-modal.component';
import Swal from 'sweetalert2';
import { Country } from 'app/models/country';
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import { ClientePublicoEditarComponent } from './cliente-publico-editar/cliente-publico-editar.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cliente-publico',
  templateUrl: './cliente-publico.component.html',
  styleUrls: ['./cliente-publico.component.css']
})

export class ClientePublicoComponent implements OnInit {
  public clientes = new Clientes('', '', null, null);
  public paises: Country[] = [];
  clientes1: Clientes[] = [];
  dataSource: MatTableDataSource<Clientes>;
  displayedColumns = ['Usuario', 'País', 'Modificar', 'Eliminar'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public titulo: string = "Clientes Públicos";

  constructor(private authService: AuthService, private dialog: MatDialog,
    public userService: UserRegisterService) {
  }

  ngOnInit(): void {
    setTimeout(function() {
      $("#contenido").fadeOut(6000);
    }, 3000);
    this.authService.clientes().subscribe(response => {
      if (response.length === 0) {
        this.swalAlert();
      } else {
        response.forEach((idUser: Clientes) => {
          this.clientes1.push(idUser)
          this.dataSource.data = [];
          this.dataSource.data = this.clientes1.slice(0);
        })
      }
    })
    this.dataSource = new MatTableDataSource(this.clientes1);
    this.dataSource.paginator = this.paginator;
  }

  public openDialog() {
    const dialogRef = this.dialog.open(ClientePublicoModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }

  swalAlert() {
    let timerInterval
    Swal.fire({
      title: 'NO hay Registros',
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

  load() {
    setTimeout(function() {
      $("#contenido").fadeOut(6000);
    }, 3000);
    this.authService.clientes().subscribe(response => {
      this.clientes1 = [];
      response.forEach((idUser: Clientes) => {
        this.clientes1.push(idUser)
      });
      this.dataSource.data = [];
      this.dataSource.data = this.clientes1.slice(0);
    })
  }

  openDialog1(obj) {
    const dialogRef = this.dialog.open(ClientePublicoEditarComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }

  swalSucces() {
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
      icon: 'success',
      title: 'Cliente Borrado Exitosamente'
    })
  }

  swalWarn() {
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
      title: 'No existe el cliente'
    })
  }

  swalWarn1() {
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
      title: 'Este Cliente Posee una Encuesta'
    })
  }

  eliminar(x) {
    this.clientes = x;
    this.authService.delete(this.clientes.id).subscribe(
      response => {
        if (response.mensaje == 'Cliente eliminado') {
          this.load();
        }
      }, (err) => {
        this.swalWarn1();
        throw err;
      });
  }

  Borrar(x) {
    this.clientes = x;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás Seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.eliminar(x);
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Tu cliente ha sido eliminado correctamente.',
          'success'
        )
        this.load();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu cliente está seguro :)',
          'error'
        )
      }
    })
  }
}