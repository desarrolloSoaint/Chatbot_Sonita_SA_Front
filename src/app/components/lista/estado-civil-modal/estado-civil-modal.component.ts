import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'app/services/contact.service';
import { MatDialogRef } from '@angular/material/dialog';
import { StateCivil } from 'app/models/state-civil';

@Component({
  selector: 'app-estado-civil-modal',
  templateUrl: './estado-civil-modal.component.html',
  styleUrls: ['./estado-civil-modal.component.css']
})
export class EstadoCivilModalComponent implements OnInit {
  public formGroup: FormGroup;
  public stateCivil = new StateCivil();
  public titulo: string = "Registro de Estado Civil";

  constructor(private formBuilder: FormBuilder,
    private contactService: ContactService,
    private dialogRef: MatDialogRef<EstadoCivilModalComponent>) {
    this.formGroup = this.formBuilder.group({
      abbreviation: ['', [Validators.required]],
      name: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit1(f) {
    console.log(f.value, 76);
    this.contactService.guardarStateCivil(this.stateCivil).subscribe(
      response => {
        this.closeDialog();
          this.swalSucces();
        if (response.mensaje == 'Estado Civil Registrado Exitosamente.') {
          
        }
      }, (err) => {
        this.swalWarn();
        throw err;
      });
  }

  /////////////////////////Swal Alert//////////////////////////////
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
      title: 'Estado Civil Creado Exitosamente'
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
      title: 'Estado Civil ya Existe'
    })
  }
}

