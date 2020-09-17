import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ContactService } from 'app/services/contact.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { State } from 'app/models/state';
import { Country } from 'app/models/country';


@Component({
  selector: 'app-estado-modal',
  templateUrl: './estado-modal.component.html',
  styleUrls: ['./estado-modal.component.css']
})
export class EstadoModalComponent implements OnInit {
  public formGroup: FormGroup;
  public state = new State ();
  public titulo: string = "Registro de Estado"; 
  public paises: Country[] = [];
  
  constructor( private formBuilder: FormBuilder,
    private contactService: ContactService,
    private dialogRef: MatDialogRef<EstadoModalComponent>
    )
     {this.formGroup = this.formBuilder.group({
      country_id: ['', [Validators.required]],
      state: ['', [Validators.required]]
     })
   } 
    
    ngOnInit(): void {
      this.contactService.getContry().subscribe(response => response.forEach ((country:Country) => {
        this.paises.push(country)
      }))
   }

  resetForm(){
    this.formGroup.reset();
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit1(f) {
    console.log(this.formGroup);
    this.contactService.guardarEstado(this.state).subscribe(

      response => {
        console.log(response)
        this.closeDialog();
          this.swalSucces();
        if (response.mensaje == 'Estado Creado Exitosamente.') {
          
        }
      },  (err) => {             
        this.swalWarn();                 
        throw err;
      });
  }
 ///////////////////////Swal Alert//////////////////////////////
 
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
    title: 'Estado Creado Exitosamente'
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
    title: 'Ese Estado ya Existe'
  })
}
}

