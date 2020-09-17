import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Country } from 'app/models/country';
import { ContactService } from 'app/services/contact.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-pais-modal',
  templateUrl: './pais-modal.component.html',
  styleUrls: ['./pais-modal.component.css']
})
export class PaisModalComponent implements OnInit {
  public formGroup: FormGroup;
  public country = new Country();
  public titulo: string = "Registro de País";

  constructor(private formBuilder: FormBuilder,
    private contactService: ContactService,
    private dialogRef: MatDialogRef<PaisModalComponent>
  ) {
    this.formGroup = this.formBuilder.group({
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
    this.closeDialog();
    this.swalSucces();
    this.contactService.guardarPais(this.country).subscribe(
      response => {
        if (response.mensaje == ' País Creado Exitosamente.') {
        }
      }, (err) => {
        this.swalWarn();
        throw err;
      });
  }
  ////////////////////Swal Alert////////////////////////
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
      title: 'País Creado Exitosamente'
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
      title: 'Ese País ya existe'
    })
  }
  resetForm() {
    this.formGroup.reset();
  }
}
