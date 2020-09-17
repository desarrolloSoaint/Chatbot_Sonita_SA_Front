import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Rol } from 'app/models/rol';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'app/services/contact.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.css']
})
export class EditRolComponent implements OnInit {
  public formGroup: FormGroup;
  public rol= new Rol();
  public titulo: string = "Editar Rol";

  constructor(private formBuilder: FormBuilder,
    private contactService: ContactService,
    private dialogRef: MatDialogRef<EditRolComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data)
     {this.formGroup = this.formBuilder.group({ 
      name: ['',[Validators.required]],
     })
     this.rol = { ...data }; }

  ngOnInit(): void {
  }

  
  closeDialog() {
    this.dialogRef.close();
  }
  Editar() {
    this.contactService.editRol(this.rol, this.data.id).subscribe(
      response => {
        console.log(response);
        this.closeDialog();
          this.swalSucces();
        if (response.mensaje == 'Rol Actualizado Exitosamente') {
          
          
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
      title: 'Rol Actualizada Exitosamente'
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
      title: 'Ese Rol ya existe'
    })
  }
}
