import { Component, OnInit, Optional, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateCivil } from 'app/models/state-civil';
import { ContactService } from 'app/services/contact.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-estado-civil-edit',
  templateUrl: './estado-civil-edit.component.html',
  styleUrls: ['./estado-civil-edit.component.css']
})
export class EstadoCivilEditComponent implements OnInit {
  public formGroup: FormGroup;
  public stateCivil= new StateCivil();
  public titulo: string = "Editar Estado Civil";

   constructor(private formBuilder: FormBuilder,
    private contactService: ContactService,
    private dialogRef: MatDialogRef<EstadoCivilEditComponent>,
     @Optional() @Inject(MAT_DIALOG_DATA) public data)
    
     {    
       this.formGroup = this.formBuilder.group({ 
      abbreviation: ['',[Validators.required]],
   name: ['',[Validators.required]],
  })
  this.stateCivil = { ...data };
   }
  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

    Editar() {
      this.contactService.editEstadoCivil(this.stateCivil, this.data.id).subscribe(
        response => {
          console.log(response);
          this.closeDialog();
            this.swalSucces();
          if (response.mensaje == 'Estado Civil Actualizado Exitosamente.') {
            
            
          }
        }, (err) => {
          this.swalWarn();
          throw err;
        });
    }

 /////////////////////Swal Alert////////////////////////
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
    title: 'Estado Civil Actualizado Exitosamente'
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
    title: 'Ese Estado Civil ya Existe'
  })
}

    


  

}
