import { Component, OnInit, Optional, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'app/services/auth.service';
import { Aiml_if } from 'app/models/aiml_if';

@Component({
  selector: 'app-aiml-if-editar',
  templateUrl: './aiml-if-editar.component.html',
  styleUrls: ['./aiml-if-editar.component.css']
})
export class AimlIfEditarComponent implements OnInit {
  public titulo: string = "Editar Aiml If";
  filedata: any;
  fileEvent(e) {
    this.filedata = e.target.files[0];
  }
  public aimlIf = new Aiml_if('','','');
  file:any;
  constructor(private dialogRef: MatDialogRef<AimlIfEditarComponent>, private authService: AuthService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data) {
    this.aimlIf = { ...data };
  }

  ngOnInit(): void {
  }
  
  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit1() {
    var myFormData = new FormData();
    myFormData.append('file', this.filedata);
    this.authService.editAimlIf(myFormData, this.aimlIf.id).subscribe(
      response => {
        if (response.mensaje == 'Archivo aimlIf actualizado exitosamente') {
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
      title: 'La Extensión debe ser .Aiml.csv o el Aiml If es muy pesado pruebe con otro.'
    })
  }
}
