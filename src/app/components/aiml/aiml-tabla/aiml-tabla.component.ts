import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { Aiml } from 'app/models/aiml';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AimlEditarComponent } from './aiml-editar/aiml-editar.component';
import { AimlPostComponent } from './aiml-post/aiml-post.component';

@Component({
  selector: 'app-aiml-tabla',
  templateUrl: './aiml-tabla.component.html',
  styleUrls: ['./aiml-tabla.component.css']
})

export class AimlTablaComponent implements OnInit {
  public titulo: string = "Aiml";
  dataSource: MatTableDataSource<Aiml>;
  aiml1: Aiml[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns = ['Aiml', 'Modificar', 'Eliminar'];
  public aiml = new Aiml('', '', '');
  x:any;
  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    setTimeout(function() {
      $("#contenido").fadeOut(6000);
    }, 3000);
    this.authService.getAiml().subscribe(response => {
      if (response.length === 0) {
        this.swalAlert();
      } else {
        response.forEach((aiml: Aiml) => {
          this.aiml1.push(aiml)
          this.dataSource.data = [];
          this.dataSource.data = this.aiml1.slice(0);
        })
      }
    })
    this.dataSource = new MatTableDataSource(this.aiml1);
    this.dataSource.paginator = this.paginator;
  }

  load() {
    this.authService.getAiml().subscribe(response => {
      this.aiml1 = [];
      response.forEach((aiml: Aiml) => {
        this.aiml1.push(aiml)
      });
      this.dataSource.data = [];
      this.dataSource.data = this.aiml1.slice(0);
    })
  }

  openDialog1(obj) {
    const dialogRef = this.dialog.open(AimlEditarComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }

  openDialog(obj) {
    const dialogRef = this.dialog.open(AimlPostComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }

  eliminar(x) {
    this.aiml = x;
    this.authService.deleteAiml(this.aiml.id).subscribe(
      response => {
        if (response.mensaje == 'Archivo aiml eliminado exitosamente') {
          this.load();
        }
      }, (err) => {
        throw err;
      });
  }

  Borrar(x) {
    this.aiml = x;
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
          'Tu Aiml ha sido eliminado correctamente.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu Aiml está seguro :)',
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