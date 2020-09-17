import { Component, OnInit } from '@angular/core';
import { ContactService } from 'app/services/contact.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Profession } from 'app/models/profession';

@Component({
  selector: 'app-profesion-modal',
  templateUrl: './profesion-modal.component.html',
  styleUrls: ['./profesion-modal.component.css']
})
export class ProfesionModalComponent implements OnInit {
  // public result: any;
  public formGroup: FormGroup;
  public profession= new Profession ();
  public titulo: string = "Registro de Profesión"; 
  
  constructor( private contactService: ContactService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProfesionModalComponent>
    ) {
      this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required]]
      }) 
    } 

  ngOnInit(): void {
  }
  

  resetForm() {
    this.formGroup.reset();
  }
  closeDialog() {
    this.dialogRef.close();
  }
 
  onSubmit1(f) {
    console.log(f.value,76)
    this.contactService.guardarProfesion(this.profession).subscribe(
      response => {
    // console.log(51, response);
    this.closeDialog();
          this.swalSucces();
        if (response.mensaje === 'Profesion Registrada Exitosamente.') {
          // console.log(response);
        }
       }, (err) => {
        this.swalWarn();
        this.closeDialog();
        throw err;
      });
  }

  //////////////////Swal Alert///////////////////////////////
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
      title: 'Profesión Creada Exitosamente'
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
      title: 'Esa Profesión  ya existe'
    })
  }
  

  


}
