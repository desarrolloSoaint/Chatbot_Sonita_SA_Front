import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Country } from 'app/models/country';
import Swal from 'sweetalert2';
import { ContactService } from 'app/services/contact.service';
import { PaisModalComponent } from '../pais-modal/pais-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PaisEditComponent } from '../pais-edit/pais-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})

export class PaisComponent implements OnInit {
  countrys: Country[] = [];
  public country1 = new Country ();
  public titulo: string = "País"; 
  dataSource: MatTableDataSource<Country>;
  columnsToDisplay =  ['Nombre', 'Modificar','Eliminar'];
  
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
    this.authService.country().subscribe(response => response.forEach ((idUser: Country) => {
      this.countrys.push(idUser)
      this.dataSource.data=[];
      this.dataSource.data = this.countrys.slice(0);
      })) 
      console.log (this.countrys);
    this.dataSource = new MatTableDataSource(this.countrys);
    this.dataSource.paginator = this.paginator;
  }
  openDialog1(obj) {
  
    console.log( obj,44)
    const dialogRef = this.dialog.open(PaisEditComponent, {
      data:obj
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.load();
      console.log('The dialog was closed');
    });
    
  }
   openDialog() {
    const dialogRef = this.dialog.open(PaisModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.load();
      console.log('The dialog was closed');
    });
  }
  load() {
    this.authService.country().subscribe(response => {
    this.countrys = [];
    response.forEach((idUser:Country) => {
    this.countrys.push(idUser)
    });
    this.dataSource.data=[];
    this.dataSource.data = this.countrys.slice(0);
    })
  }

  eliminar(x) {
    this.country1 = x;
    this.contactService.deletePais(this.country1.id).subscribe(
      response => {
        this.load();
        console.log(response)
        },
       (err) => {
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
      title: 'País eliminado Exitosamente'
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
      title: 'Eliminar Estado con Relación antes de Borrar este País'
    })
  }

  Borrar(x) {
    this.country1 = x;
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
          'País ha sido eliminado correctamente.',
          'success'
        )
        this.load();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'País  está seguro :)',
          'error'
        )
      }
    })
  }

}
 


