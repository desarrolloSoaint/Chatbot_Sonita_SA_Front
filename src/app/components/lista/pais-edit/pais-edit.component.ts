import { Component, OnInit, Optional, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Country } from 'app/models/country';
import { ContactService } from 'app/services/contact.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pais-edit',
  templateUrl: './pais-edit.component.html',
  styleUrls: ['./pais-edit.component.css']
})
export class PaisEditComponent implements OnInit {
  public formGroup: FormGroup;
  public country = new Country();
  public titulo: string = "Editar País";

  constructor(private formBuilder: FormBuilder,
    private contactService: ContactService,
    private dialogRef: MatDialogRef<PaisEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],

    })
    this.country = { ...data };
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  Editar() {
    this.contactService.editPais(this.country, this.data.id).subscribe(
      response => {
        console.log(response);
        this.closeDialog();
        this.swalSucces();
        if (response.mensaje == 'País actualizado Exitosamente') {
         
          
        }
      }, (err) => {
        this.swalWarn();
        throw err;
      });
  }
  //////////////////////////Swal Alert////////////////////////////
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
      title: 'País Actualizado Exitosamente'
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

}
