import { Component, OnInit, ViewChild } from '@angular/core';
import { Rol } from 'app/models/rol';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'app/services/auth.service';
import { ContactService } from 'app/services/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { EditRolComponent } from './edit-rol/edit-rol.component';
import { RolModalComponent } from './rol-modal/rol-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  rols: Rol [] = [];
  public rol1 = new Rol ();
  public titulo: string = "Rol"; 
  dataSource: MatTableDataSource<Rol>;
  columnsToDisplay =  ['Nombre', 'Modificar','Eliminar'];

  constructor( private authService: AuthService,
    private contactService: ContactService,
    private dialog: MatDialog,) { }
    @ViewChild (MatPaginator, {static:true }) paginator:MatPaginator;

  ngOnInit(): void {
    setTimeout(function() {
      $("#contenido").fadeOut(6000);
    }, 3000);
    this.authService.rol().subscribe(response =>{  if(response.length === 0){
      this.swalAlert();
    }else{
      response.forEach ((idUser: Rol) => {
      this.rols.push(idUser)
      this.dataSource.data=[];
      this.dataSource.data = this.rols.slice(0);
      })}}) 
      console.log (this.rols);
    this.dataSource = new MatTableDataSource(this.rols);
    this.dataSource.paginator = this.paginator;
  }
  rol(rols: any) {
    throw new Error("Method not implemented.");
  }

  swalAlert(){
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
    this.rol1 = x;
    this.contactService.deleteRol(this.rol1.id).subscribe(
      response => {
        if (response.mensaje == 'Rol eliminada Exitosamente') {
        }
      }, (err) => {
        this.swalWarn();
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
      title: 'Rol eliminado Exitosamente'
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
      title: 'Este Rol está siendo Utilizado'
    })
  }

  Borrar(x) {
    this.rol1 = x;
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
          'Rol ha sido eliminado correctamente.',
          'success'
        )
        this.load();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Rol está seguro :)',
          'error'
        )
      }
    })
  }

  openDialog1(obj) {
    console.log(obj, 44)
    const dialogRef = this.dialog.open(EditRolComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.load();
      console.log('The dialog was closed');
    });
  }
  public openDialog() {
    const dialogRef = this.dialog.open(RolModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.load();
      console.log('The dialog was closed');
    });
  }

  load() {
    this.authService.rol().subscribe(response => {
    this.rols = [];
    response.forEach((idUser:Rol) => {
    this.rols.push(idUser)
    });
    this.dataSource.data=[];
    this.dataSource.data = this.rols.slice(0);
    })
  }
}

