import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PrivateContact } from 'app/models/private-contact';
import { Country } from 'app/models/country';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EditPrivateComponent } from './edit-private/edit-private.component';
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import Swal from 'sweetalert2';
import { ViewDataComponent } from './view-data/view-data.component';
import { RegisterClientPrivateComponent } from './register-client-private/register-client-private.component';

@Component({
  selector: 'app-cliente-privado',
  templateUrl: './cliente-privado.component.html',
  styleUrls: ['./cliente-privado.component.css']
})
export class ClientePrivadoComponent implements OnInit {
  public clientePrivado = new PrivateContact;
  public clientesPrivados: PrivateContact[] = [];
  public paises: Country[] = [];
  dataSource: MatTableDataSource<PrivateContact>;
  displayedColumns = ['Usuario', 'País', 'Ver', 'Modificar', 'Eliminar'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public title = 'Clientes Privados';
  x:any;
  constructor(private userService: UserRegisterService,
    private dialog?: MatDialog) { }

  ngOnInit(): void {
    setTimeout(function() {
      $('#contenido').fadeOut(6000);
    }, 3000);

    this.userService.getIdPrivate().subscribe(response => response.forEach((idUser: PrivateContact) => {
      this.clientesPrivados.push(idUser)
      console.log(this.clientesPrivados)
      this.dataSource.data = [];
      this.dataSource.data = this.clientesPrivados.slice(0);
    }))

    this.dataSource = new MatTableDataSource(this.clientesPrivados);
    this.dataSource.paginator = this.paginator;
  }
  public openDialog(obj) {
    const dialogRef = this.dialog.open(RegisterClientPrivateComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.load();
      console.log('The dialog was closed');
    });
  }

  load() {
    setTimeout(function () {
      $('#contenido').fadeOut(6000);
    }, 3000);
    this.userService.wait().subscribe(response => {
      this.clientesPrivados = [];
      response.forEach((idPrivate: PrivateContact) => {
        this.clientesPrivados.push(idPrivate)
      });
      this.dataSource.data = [];
      this.dataSource.data = this.clientesPrivados.slice(0);
    })
  }

  openDialog1(obj) {
    const dialogRef = this.dialog.open(EditPrivateComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }
  openDialogView(clientePrivado: PrivateContact) {
    const dialogRef = this.dialog.open(ViewDataComponent, {
      data: {
        id: clientePrivado.id
      }
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

  eliminar(x) {
    this.clientePrivado = x;
    this.userService.deletePrivate(this.clientePrivado.id).subscribe(
      response => {
        if (response.mensaje === 'Cliente eliminado') {
           this.load();
        }
      }, (err) => {
        throw err;
      });
  }

  Borrar(x) {
    this.clientesPrivados = x;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás Seguro?',
      text: 'No podrás revertir esto!',
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
