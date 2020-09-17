import { Component, OnInit } from '@angular/core';
import { Rol } from 'app/models/rol';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'app/services/contact.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol-modal',
  templateUrl: './rol-modal.component.html',
  styleUrls: ['./rol-modal.component.css']
})
export class RolModalComponent implements OnInit {
  public formGroup: FormGroup;
  public rol = new Rol();
  public titulo: string = "Registro de Rol";

  constructor(private contactService: ContactService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RolModalComponent>) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }
  resetForm() {
    this.formGroup.reset();
  }
  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit1(f) {
    this.contactService.crearRol(this.rol).subscribe(
      response => {
        console.log(response.mensaje)
        if (response.mensaje == 'Rol registrado exitosamente.') {
          this.swalSucces();
          this.closeDialog();
        }
      }, (err) => {
        this.swalWarn();
        throw err;
      })
  }

  //////////////////Swal Alert///////////////////////////////
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
      title: 'Rol Creada Exitosamente'
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
      title: 'Ese Rol  ya existe'
    })
  }
}
