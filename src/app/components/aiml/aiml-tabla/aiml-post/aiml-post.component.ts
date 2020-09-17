import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aiml-post',
  templateUrl: './aiml-post.component.html',
  styleUrls: ['./aiml-post.component.css']
})
export class AimlPostComponent implements OnInit {
  public titulo: string = "Guardar Aiml";
  filedata: any;
  fileEvent(e) {
    this.filedata = e.target.files[0];
  }
  file:any;
  constructor(private dialogRef: MatDialogRef<AimlPostComponent>, private authService: AuthService) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit1() {
    var myFormData = new FormData();
    myFormData.append('file', this.filedata);
    this.authService.guardarAiml(myFormData).subscribe(
      response => {
        if (response.mensaje == 'Archivo aiml registrado exitosamente') {
          this.swalSucces();
          this.closeDialog();
          this.ngOnInit();
        }
      }, (err) => {
        this.swalWarn();
        throw err;
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
      title: 'Aiml Registrado Exitosamente'
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
      title: 'La Extensión debe ser .Aiml o el Aiml es muy pesado pruebe con otro o ya existe ese archivo.'
    })
  }
}
