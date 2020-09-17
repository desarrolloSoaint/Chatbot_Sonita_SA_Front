import { Component, OnInit, Input, Inject, Optional } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Clientes } from 'app/models/clientes';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from 'app/models/country';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-publico-editar',
  templateUrl: './cliente-publico-editar.component.html',
  styleUrls: ['./cliente-publico-editar.component.css']
})

export class ClientePublicoEditarComponent implements OnInit {
  public titulo: string = "Editar Cliente Público";
  public clientes = new Clientes(null, '', null,null);
  emailPattern: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public formGroup: FormGroup;
  public paises: Country[] = [];
  action;
  //public clientes1: Clientes[] = [];

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ClientePublicoEditarComponent>,
    public userService: UserRegisterService, @Optional() @Inject(MAT_DIALOG_DATA) public data) {
    this.clientes = { ...data };
    this.action = this.data.action
    this.formGroup = this.formBuilder.group({
          email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
          id_country: ['', [Validators.required]],
         })
    
  }


  ngOnInit(): void {
    this.userService.getContry().subscribe(response => response.forEach ((country:Country) => {
      this.paises.push(country)
     // this.get()
    }));
  }

  // get(){
  //   const clienteId = this.data.id; 
  //   this.authService.clientes().subscribe(response  => {
  //     const filteredUsers = response.filter((clientes) => {
  //       return clientes.id === clienteId;
  //     });
  //     if (filteredUsers.length > 0) {
  //       this.clientes = filteredUsers[0];
  //       this.geomar(filteredUsers[0]);
  //     }  else {
  //       console.error("El id no fue encontrado"); 
  //      // this.swalAlert();
  //     }
  //   });
  // }
 

  // geomar(clientes1:Clientes){
  //   this.formGroup = this.formBuilder.group({
  //     email: [clientes1.email||'', [Validators.required, Validators.pattern(this.emailPattern)]],
  //     id_country: [clientes1.id_country.id ||'', [Validators.required]],
  //   })
  //   this.formGroup.setValue({
  //     email: clientes1.email || "" ,
  //     id_country: clientes1.id_country.id || "" ,
  //   })
  // }

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
      title: 'Cliente Actualizado Exitosamente'
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
      title: 'Ese Email ya existe'
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  Editar() {
    console.log(this.clientes)
    console.log(this.data.id)
    this.authService.edit(this.clientes, this.data.id).subscribe(
      response => {
        console.log(response);
        if (response.mensaje == 'Cliente actualizado') {
          this.closeDialog();
          this.swalSucces();
          this.ngOnInit();
        }
      }, (err) => {
        this.swalWarn();
        throw err;
      });
  }
}
