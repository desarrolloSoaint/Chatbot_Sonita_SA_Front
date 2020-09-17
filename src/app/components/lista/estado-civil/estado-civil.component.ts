import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { StateCivil } from 'app/models/state-civil';
import Swal from 'sweetalert2';
import { ContactService } from 'app/services/contact.service';
import { EstadoCivilModalComponent } from '../estado-civil-modal/estado-civil-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { EstadoCivilEditComponent } from '../estado-civil-edit/estado-civil-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-estado-civil',
  templateUrl: './estado-civil.component.html',
  styleUrls: ['./estado-civil.component.css']
})

export class EstadoCivilComponent implements OnInit {
  stateCivils: StateCivil[] = [];
  public staCivil1 = new StateCivil ();
  public titulo: string = "Estado Civil"; 
  dataSource: MatTableDataSource<StateCivil>;
  columnsToDisplay =  ['Nombre', 'Abreviacion', 'Modificar','Eliminar'];

  constructor(
    private authService: AuthService,
    private contactService: ContactService,
    private dialog: MatDialog,
  ) { }
  @ViewChild (MatPaginator, {static:true }) paginator:MatPaginator;

  ngOnInit(): void {
    setTimeout(function() {
      $("#contenido").fadeOut(6000);
    }, 3000);
    this.authService.stateCivil().subscribe(response =>{ 
      if(response.length === 0){
      this.swalAlert();
      }
      else{
       response.forEach ((idUser: StateCivil) => {
      this.stateCivils.push(idUser)
      this.dataSource.data=[];
      this.dataSource.data = this.stateCivils.slice(0);
        })}}) 
      console.log (this.stateCivils);
    this.dataSource = new MatTableDataSource(this.stateCivils);
    this.dataSource.paginator = this.paginator;
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

  load() {
    this.authService.stateCivil().subscribe(response => {
    this.stateCivils = [];
    response.forEach((idUser:StateCivil) => {
    this.stateCivils.push(idUser)
    });
    this.dataSource.data=[];
    this.dataSource.data = this.stateCivils.slice(0);
    })
  }

  eliminar(x) {
    this.staCivil1 = x;
    this.contactService.deleteStaCivil(this.staCivil1.id).subscribe(
      response => {
        this.load();
        if (response.mensaje == 'StaCivil eliminado Exitosamente') {

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
      title: 'Estado Civil eliminado Exitosamente'
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

  Borrar(x) {
    this.staCivil1 = x;
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
          'Estado Civil ha sido eliminado correctamente.',
          'success'
        )
        this.load();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Estado Civil está seguro :)',
          'error'
        )
      }
    })
  }

  openDialog1(obj) {
    console.log(obj, 44)
    const dialogRef = this.dialog.open(EstadoCivilEditComponent, {
      data: obj
    });

  dialogRef.afterClosed().subscribe(result => {
    this.load();
    console.log('The dialog was closed');
  });
  
}

  public openDialog() {
    const dialogRef = this.dialog.open(EstadoCivilModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.load();
      console.log('The dialog was closed');
    });
  }
}



