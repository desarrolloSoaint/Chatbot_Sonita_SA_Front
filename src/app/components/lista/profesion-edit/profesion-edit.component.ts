import { Component, OnInit, Optional, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profession } from 'app/models/profession';
import { ContactService } from 'app/services/contact.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profesion-edit',
  templateUrl: './profesion-edit.component.html',
  styleUrls: ['./profesion-edit.component.css']
})
export class ProfesionEditComponent implements OnInit{
  public formGroup: FormGroup;
  public profession= new Profession();
  public titulo: string = "Editar Profesión";

  constructor(private formBuilder: FormBuilder,
    private contactService: ContactService,
    private dialogRef: MatDialogRef<ProfesionEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
    )
     {
      this.formGroup = this.formBuilder.group({ 
     name: ['',[Validators.required]],
    })
    this.profession = { ...data };

  }
 
  ngOnInit(): void {
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
  Editar() {
    this.contactService.editProfesion(this.profession, this.data.id).subscribe(
      response => {
        console.log(response);
        this.closeDialog();
          this.swalSucces();
        if (response.mensaje == 'Profesion Actualizada Exitosamente') {
          
          
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
      title: 'Profesión Actualizada Exitosamente'
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
      title: 'Esa Profesión ya existe'
    })
  }


}
