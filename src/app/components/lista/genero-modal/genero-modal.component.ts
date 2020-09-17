import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from 'app/services/contact.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Gender } from 'app/models/gender';

@Component({
  selector: 'app-genero-modal',
  templateUrl: './genero-modal.component.html',
  styleUrls: ['./genero-modal.component.css']
})
export class GeneroModalComponent implements OnInit {
  public formGroup: FormGroup;
  public gender = new Gender ();
  public titulo: string = "Registro de Género"; 

  constructor(private formBuilder: FormBuilder,
    private contactService: ContactService,
    private dialogRef: MatDialogRef<GeneroModalComponent>
    ) {
    this.formGroup = this.formBuilder.group({ 
      abbreviation: ['',[Validators.required]],
   name: ['',[Validators.required]],
  })
   }

  ngOnInit(): void {
  }
  
  

  resetForm(){
    this.formGroup.reset();
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit1(f) {
    console.log(f.value, 76);
    this.contactService.guardarGenero(this.gender).subscribe(
      response => {
        this.closeDialog();
          this.swalSucces();
        if (response.mensaje == 'Género Creado Exitosamente.') {
          
        }
      },  (err) => {             
        this.swalWarn();                 
        throw err;
      });
  }
  /////////////////////Swal Alert///////////////////////////////
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
      title: 'Género Creado Exitosamente'
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
      title: 'Ese Género ya Existe'
    })
  }




}
