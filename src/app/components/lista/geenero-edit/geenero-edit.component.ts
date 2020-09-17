import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Gender } from 'app/models/gender';
import { ContactService } from 'app/services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-geenero-edit',
  templateUrl: './geenero-edit.component.html',
  styleUrls: ['./geenero-edit.component.css']
})
export class GeeneroEditComponent implements OnInit {
  public formGroup: FormGroup;
  public gender= new Gender();
  public titulo: string = "Editar Género";

  constructor(private formBuilder: FormBuilder,
    private contactService: ContactService,
    private dialogRef: MatDialogRef<GeeneroEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.formGroup = this.formBuilder.group({ 
      name: ['',[Validators.required]],
      abbreviation: ['',[Validators.required]],
     })
     this.gender = { ...data };
   }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close();
  }

  Editar() {
    this.contactService.editGenero(this.gender, this.data.id).subscribe(
      response => {
        console.log(response);
        this.closeDialog();
          this.swalSucces();
        if (response.mensaje == 'Género ActualizadO Exitosamente') {
          
          
        }
      }, (err) => {
        this.swalWarn();
        throw err;
      });
  }

  /////////////////////////Swal Alert////////////////////////////
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
      title: 'Género Actualizado Exitosamente'
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
      title: 'Ese género ya existe'
    })
  }


}
