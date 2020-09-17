import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-aiml-if-post',
  templateUrl: './aiml-if-post.component.html',
  styleUrls: ['./aiml-if-post.component.css']
})
export class AimlIfPostComponent implements OnInit {
  public titulo: string = "Guardar Aiml IF";
  filedata: any;
  fileEvent(e) {
    this.filedata = e.target.files[0];
  }
  file:any;
  constructor(private dialogRef: MatDialogRef<AimlIfPostComponent>, private authService: AuthService) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit1() {
    var myFormData = new FormData();
    myFormData.append('file', this.filedata);
    this.authService.guardarAimlIf(myFormData).subscribe(
      response => {
        if (response.mensaje == 'Archivo aimlIf registrado exitosamente') {
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
      title: 'Aiml IF Registrado Exitosamente'
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
      title: 'La Extensión debe ser .Aiml.csv o el Aiml IF es muy pesado pruebe con otro o ya existe ese archivo.'
    })
  }
}
