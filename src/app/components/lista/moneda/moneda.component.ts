import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Currency } from 'app/models/currency';
import Swal from 'sweetalert2';
import { ContactService } from 'app/services/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { MonedaEditComponent } from '../moneda-edit/moneda-edit.component';
import { MonedaModalComponent } from '../moneda-modal/moneda-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-moneda',
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.css']
})

export class MonedaComponent implements OnInit {
  currencys: Currency[] = [];
  public currency1 = new Currency ();
  public titulo: string = "Moneda"; 
  dataSource: MatTableDataSource<Currency>;
  columnsToDisplay =  ['Nombre','Abreviacion','Simbolo', 'Modificar','Eliminar'];

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
    this.authService.currency().subscribe(response =>{ 
      if(response.length === 0){
      this.swalAlert();
      }
      else{
      response.forEach ((idUser: Currency) => {
      this.currencys.push(idUser)
      this.dataSource.data=[];
      this.dataSource.data = this.currencys.slice(0);
          })}}) 
      console.log (this.currencys);
    this.dataSource = new MatTableDataSource(this.currencys);
    this.dataSource.paginator = this.paginator;
 
  }
  swalAlert(){
    let timerInterval
    Swal.fire({
      title: 'NO hay Registros',
      //html: 'I will close in <b></b> milliseconds.',
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
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }


  eliminar(x) {
    this.currency1 = x;
    this.contactService.deleteMoneda(this.currency1.id).subscribe(
      response => {
        this.load();
        if (response.mensaje == 'Currency eliminada Exitosamente') {
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
      title: 'Moneda eliminado Exitosamente'
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
    this.currency1 = x;
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
          'Moneda ha sido eliminado correctamente.',
          'success'
        )
        this.load();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Moneda está seguro :)',
          'error'
        )
      }
    })
  }

  openDialog1(obj) {
    console.log(obj, 44)
    const dialogRef = this.dialog.open(MonedaEditComponent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.ngOnInit();
      this.load();
      console.log('The dialog was closed');
    });
  }

  public openDialog() {
    const dialogRef = this.dialog.open(MonedaModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.load();
      console.log('The dialog was closed');
    });
  }

  load() {
    this.authService.currency().subscribe(response => {
    this.currencys = [];
    response.forEach((idUser:Currency) => {
    this.currencys.push(idUser)
    });
    this.dataSource.data=[];
    this.dataSource.data = this.currencys.slice(0);
    })
  }
}
