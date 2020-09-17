import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Profession } from 'app/models/profession';
import { ContactService } from 'app/services/contact.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ProfesionModalComponent } from '../profesion-modal/profesion-modal.component';
import { ProfesionEditComponent } from '../profesion-edit/profesion-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-profesion',
  templateUrl: './profesion.component.html',
  styleUrls: ['./profesion.component.css']
})

export class ProfesionComponent implements OnInit {
  professions: Profession[] = [];
  public profession1 = new Profession();
  public titulo: string = "Profesión";
  dataSource: MatTableDataSource<Profession>;
  columnsToDisplay = ['Nombre', 'Modificar', 'Eliminar'];

  constructor(
    private authService: AuthService,
    private contactService: ContactService,
    private dialog: MatDialog,
  ) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    setTimeout(function () {
      $("#contenido").fadeOut(6000);
    }, 3000);
    this.authService.profession().subscribe(response => {
      if (response.length === 0) {
        this.swalAlert();
      } else {
        response.forEach((idUser: Profession) => {
          this.professions.push(idUser)
          this.dataSource.data = [];
          this.dataSource.data = this.professions.slice(0);
        })
      }
    })
    console.log(this.professions);
    this.dataSource = new MatTableDataSource(this.professions);
    this.dataSource.paginator = this.paginator;
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

  eliminar(x) {
    this.profession1 = x;
    this.contactService.deleteProfesion(this.profession1.id).subscribe(
      response => {
        this.load();
        if (response.mensaje == 'Profesion eliminada Exitosamente') {
          this.ngOnInit();
        }
      }, (err) => {
        throw err;
      }
    );
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
      title: 'Profesión eliminado Exitosamente'
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
      title: 'No existe la Profesión'
    })
  }

  Borrar(x) {
    this.profession1 = x;
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
          'Profesión ha sido eliminado correctamente.',
          'success'
        )
        this.load();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Profesión está seguro :)',
          'error'
        )
      }
    })
  }

  openDialog1(obj) {
    console.log(obj, 44)
    const dialogRef = this.dialog.open(ProfesionEditComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.load();
      console.log('The dialog was closed');
    });
  }

  public openDialog() {
    const dialogRef = this.dialog.open(ProfesionModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.load();
      console.log('The dialog was closed');
    });
  }

  load() {
    this.authService.profession().subscribe(response => {
      this.professions = [];
      response.forEach((idUser: Profession) => {
        this.professions.push(idUser)
      });
      this.dataSource.data = [];
      this.dataSource.data = this.professions.slice(0);
    })
  }
}
