import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Currency } from 'app/models/currency';
import { ContactService } from 'app/services/contact.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-moneda-modal',
  templateUrl: './moneda-modal.component.html',
  styleUrls: ['./moneda-modal.component.css']
})
export class MonedaModalComponent implements OnInit {
  public formGroup: FormGroup;
  public currency = new Currency ();
  public titulo: string = "Registro de Moneda"; 

  constructor(private formBuilder: FormBuilder,
    private contactService: ContactService,
    private dialogRef: MatDialogRef<MonedaModalComponent>
    ) { this.formGroup = this.formBuilder.group({ 
      abbreviation: ['',[Validators.required]],
     money: ['',[Validators.required]],
     symbol: ['',[Validators.required]],

  }) }

  ngOnInit(): void {
  }
  

  resetForm(){
    this.formGroup.reset();
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit1(f) {
    console.log(f.value, 'prueba1');
    this.contactService.guardarMoneda(this.currency).subscribe(
      response => {
        console.log(51, response);
        this.closeDialog();
          this.swalSucces();
        if (response.mensaje == 'Currency Registrada Exitosamente.') {
          
        }
      },  (err) => {             
        this.swalWarn();                 
        throw err;
      });
  }

  /////////////////////Swal Alert////////////////////////////
  swalSucces(){
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
      title: 'Moneda Creada Exitosamente'
    })
  }
  swalWarn(){
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
      title: 'Esa Moneda ya existe'
    })
  }


}
