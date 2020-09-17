import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Gender } from 'app/models/gender';
import Swal from 'sweetalert2';
import { ContactService } from 'app/services/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { GeneroModalComponent } from '../genero-modal/genero-modal.component';
import { GeeneroEditComponent } from '../geenero-edit/geenero-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})

export class GeneroComponent implements OnInit {
  genders: Gender[] = [];
  public gender1 = new Gender();
  public titulo: string = "Género";
  dataSource: MatTableDataSource<Gender>;
  columnsToDisplay = ['Nombre', 'Abreviacion', 'Modificar', 'Eliminar'];

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
    this.authService.gender().subscribe(response => {
      if (response.length === 0) {
        this.swalAlert();
      } else {
        response.forEach((idUser: Gender) => {
          this.genders.push(idUser)
          this.dataSource.data = [];
          this.dataSource.data = this.genders.slice(0);
        })
      }
    })
    console.log(this.genders);
    this.dataSource = new MatTableDataSource(this.genders);
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
    this.gender1 = x;
    console.log(this.gender1)
    this.contactService.deleteGenero(this.gender1.id).subscribe(
      response => {
        this.load();
        if (response.mensaje == 'Género eliminado Exitosamente') {
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
      title: 'Género  eliminado Exitosamente'
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
      title: 'No existe el Género'
    })
  }
  openDialog1(obj) {
    console.log(obj, 44)
    const dialogRef = this.dialog.open(GeeneroEditComponent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load();
      console.log('The dialog was closed');
    });
  }

  Borrar(x) {
    this.gender1 = x;
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
          'Género ha sido eliminado correctamente.',
          'success'
        )
        this.load();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Género está seguro :)',
          'error'
        )
      }
    })
  }

  public openDialog() {
    const dialogRef = this.dialog.open(GeneroModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.load();
      console.log('The dialog was closed');
    });
  }

  load() {
    this.authService.gender().subscribe(response => {
      this.genders = [];
      response.forEach((idUser: Gender) => {
        this.genders.push(idUser)
      });
      this.dataSource.data = [];
      this.dataSource.data = this.genders.slice(0);
    })
  }
}