import { Component, OnInit, Optional, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'app/services/auth.service';
import { Aiml } from 'app/models/aiml';

@Component({
  selector: 'app-aiml-editar',
  templateUrl: './aiml-editar.component.html',
  styleUrls: ['./aiml-editar.component.css']
})
export class AimlEditarComponent implements OnInit {
  public titulo: string = "Editar Aiml";
  filedata: any;
  fileEvent(e) {
    this.filedata = e.target.files[0];
  }
  public aiml = new Aiml('','','');
  file:any;
  constructor(private dialogRef: MatDialogRef<AimlEditarComponent>,private authService: AuthService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data ) {
    this.aiml = { ...data };
     }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit1() {
    var myFormData = new FormData();
    myFormData.append('file', this.filedata);
    this.authService.editAiml(myFormData,this.aiml.id).subscribe(
      response => {
        if (response.mensaje == 'Archivo Aiml actualizado exitosamente') {
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
      title: 'La Extensión debe ser .Aiml o el Aiml es muy pesado pruebe con otro.'
    })
  }
}
