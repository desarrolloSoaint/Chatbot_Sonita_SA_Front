import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Aiml_if } from 'app/models/aiml_if';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { AimlIfPostComponent } from './aiml-if-post/aiml-if-post.component';
import { MatDialog } from '@angular/material/dialog';
import { AimlIfEditarComponent } from './aiml-if-editar/aiml-if-editar.component';

@Component({
  selector: 'app-aiml-if-tabla',
  templateUrl: './aiml-if-tabla.component.html',
  styleUrls: ['./aiml-if-tabla.component.css']
})
export class AimlIfTablaComponent implements OnInit {
  public titulo: string = "Aiml If";
  dataSource: MatTableDataSource<Aiml_if>;
  aimlIf1: Aiml_if[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns = ['Aiml If', 'Modificar', 'Eliminar'];
  public aimlIf = new Aiml_if('', '', '');
  x:any;
  constructor(private authService: AuthService,private dialog: MatDialog) { }

  ngOnInit(): void {
    setTimeout(function() {
      $("#contenido").fadeOut(6000);
    }, 3000);
    this.authService.getAimlIf().subscribe(response => {
      if (response.length === 0) {
        this.swalAlert();
      } else {
        response.forEach((aiml: Aiml_if) => {
          this.aimlIf1.push(aiml)
          this.dataSource.data = [];
          this.dataSource.data = this.aimlIf1.slice(0);
        })
      }
    })
    this.dataSource = new MatTableDataSource(this.aimlIf1);
    this.dataSource.paginator = this.paginator;
  }

  load() {
    setTimeout(function() {
      $("#contenido").fadeOut(6000);
    }, 3000);
    this.authService.getAimlIf().subscribe(response => {
      this.aimlIf1 = [];
      response.forEach((aiml: Aiml_if) => {
        this.aimlIf1.push(aiml)
      });
      this.dataSource.data = [];
      this.dataSource.data = this.aimlIf1.slice(0);
    })
  }
  
  openDialog(obj) {
    const dialogRef = this.dialog.open(AimlIfPostComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }

  openDialog1(obj) {
    const dialogRef = this.dialog.open(AimlIfEditarComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }

  eliminar(x) {
    this.aimlIf = x;
    this.authService.deleteAimlIf(this.aimlIf.id).subscribe(
      response => {
        if (response.mensaje == 'Archivo aimlIf eliminado exitosamente') {
          this.load();
        }
      }, (err) => {
        throw err;
      });
  }

  Borrar(x) {
    this.aimlIf = x;
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
          'Tu Aiml IF ha sido eliminado correctamente.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu Aiml IF está seguro :)',
          'error'
        )
      }
    })
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
}
