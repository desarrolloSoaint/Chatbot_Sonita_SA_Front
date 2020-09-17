import { Component, OnInit, Inject, Optional } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { State } from 'app/models/state';
import { ContactService } from 'app/services/contact.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from 'app/models/country';



@Component({
  selector: 'app-estado-edit',
  templateUrl: './estado-edit.component.html',
  styleUrls: ['./estado-edit.component.css']
})
export class EstadoEditComponent implements OnInit {
  public formGroup: FormGroup;
  public state= new State ();
  public titulo: string = "Editar Estado";
  public paises: Country[] = [];

    constructor( private formBuilder: FormBuilder,
      private contactService: ContactService,
      private dialogRef: MatDialogRef<EstadoEditComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data)
      
       {this.formGroup = this.formBuilder.group({
        country_id: ['', [Validators.required]],
        state: ['', [Validators.required]]

       })
       this.state = { ...data };
     } 

  ngOnInit(): void {
    this.contactService.getContry().subscribe(response => response.forEach ((country:Country) => {
      this.paises.push(country)
    }))
  }
  closeDialog() {
    this.dialogRef.close();
  }
 
  Editar() {
    this.contactService.editEstado(this.state, this.data.id).subscribe(
      response => {
        console.log(response);
        this.closeDialog();
          this.swalSucces();
        if (response.mensaje == 'Estado Actualizado Exitosamente') {
          
          this.ngOnInit();
        }
      }, (err) => {
        this.swalWarn();
        throw err;
      });
  }

  //////////////////////Swal Alert/////////////////////////
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
      title: 'Estado Actualizado Exitosamente'
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
      title: 'Ese Estado ya Existe'
    })
  }

}
