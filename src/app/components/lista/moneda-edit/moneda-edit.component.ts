import { Component, OnInit, Optional, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { ContactService } from 'app/services/contact.service';
import { Currency } from 'app/models/currency';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-moneda-edit',
  templateUrl: './moneda-edit.component.html',
  styleUrls: ['./moneda-edit.component.css']
})
export class MonedaEditComponent implements OnInit {
  public currency= new Currency ();
  public formGroup: FormGroup;
  public titulo: string = "Editar Moneda";
    
  constructor(private formBuilder: FormBuilder,
  private contactService: ContactService,
  private dialogRef: MatDialogRef<MonedaEditComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA)
   public data) 
   { this.formGroup = this.formBuilder.group({ 
    abbreviation: ['',[Validators.required]],
   money: ['',[Validators.required]],
   symbol: ['',[Validators.required]],

}) 
this.currency = { ...data };
}
   
  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  Editar() {
    this.contactService.editMoneda(this.currency, this.data.id).subscribe(
      response => {
        console.log(response);
        this.closeDialog();
          this.swalSucces();
        if (response.mensaje == 'Currency actualizada') {
          
          
        }
      }, (err) => {
        this.swalWarn();
        throw err;
      });
  }

  //////////////////////////Swal Alert//////////////////////////////
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
      title: 'Moneda Actualizada Exitosamente'
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
      title: 'Esa moneda ya existe'
    })
  }

}
