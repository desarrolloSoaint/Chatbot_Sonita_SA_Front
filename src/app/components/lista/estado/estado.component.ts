import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { State } from 'app/models/state';
import Swal from 'sweetalert2';
import { ContactService } from 'app/services/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { EstadoModalComponent } from '../estado-modal/estado-modal.component';
import { EstadoEditComponent } from '../estado-edit/estado-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})

export class EstadoComponent implements OnInit {
  states: State[] = [];
  public state1 = new State ();
  public titulo: string = "Estado"; 
  dataSource: MatTableDataSource<State>;
  columnsToDisplay =  ['Nombre','Pais', 'Modificar','Eliminar'];
  

  constructor(
    private authService: AuthService,
    private contactService: ContactService,
    private dialog: MatDialog
  ) { }
  @ViewChild (MatPaginator, {static:true }) paginator:MatPaginator;

  ngOnInit(): void {
    setTimeout(function() {
      $("#contenido").fadeOut(6000);
    }, 3000);
    this.authService.state().subscribe(response =>{ if(response.length === 0){
      this.swalAlert();
    }else{
      response.forEach ((idUser: State) => {
      this.states.push(idUser)
      this.dataSource.data=[];
      this.dataSource.data = this.states.slice(0);
      })}}) 
      console.log (this.states);
    this.dataSource = new MatTableDataSource(this.states);
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
    this.state1 = x;
    this.contactService.delete(this.state1.id).subscribe(
      response => {
        this.load();
        if (response.mensaje == 'State eliminado Exitosamente') {
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
      title: 'Estado eliminado Exitosamente'
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
 

openDialog1(obj) {
  
  console. log( obj,44)
  const dialogRef = this.dialog.open(EstadoEditComponent, {
    data:obj
  });

  dialogRef.afterClosed().subscribe(result => {
    this.load();
    console.log('The dialog was closed');
  });
  
}

  Borrar(x) {
    this.state1 = x;
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
          'Estado ha sido eliminado correctamente.',
          'success'
        )
        this.load();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Estado  está seguro :)',
          'error'
        )
      }
    })
  }

  public openDialog() {
    const dialogRef = this.dialog.open(EstadoModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.load();
      console.log('The dialog was closed');
    });
  }
  load() {
    this.authService.state().subscribe(response => {
    this.states = [];
    response.forEach((idUser:State) => {
    this.states.push(idUser)
    });
    this.dataSource.data=[];
    this.dataSource.data = this.states.slice(0);
    })
   }
}

 
