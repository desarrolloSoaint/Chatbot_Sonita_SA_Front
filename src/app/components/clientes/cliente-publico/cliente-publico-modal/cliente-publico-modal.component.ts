import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Country } from 'app/models/country';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import { Clientes } from 'app/models/clientes';
import { MatDialogRef } from '@angular/material/dialog';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-publico-modal',
  templateUrl: './cliente-publico-modal.component.html',
  styleUrls: ['./cliente-publico-modal.component.css']
})
export class ClientePublicoModalComponent implements OnInit {
  public titulo: string = "Registro Cliente Público"; 
  public formGroup: FormGroup;
  public paises: Country[] = [];
  emailPattern: any =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public errorMsg: string;
  public clientes = new Clientes (null,'',null,null);
  public result : any;

  constructor(private authService: AuthService,  private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ClientePublicoModalComponent>, 
    public userService: UserRegisterService,private router: Router,
    ) { 

    this.formGroup = this.formBuilder.group({ 
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      id_country: ['',[Validators.required]],
     })
  }


  ngOnInit(): void {
    this.userService.getContry().subscribe(response =>
      response.forEach ((country:Country) => {
      this.paises.push(country)
     }))
  }
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
      title: 'Cliente Creado Exitosamente'
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
      title: 'Ese Email ya existe'
    })
  }

  resetForm(){
    this.formGroup.reset();
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit1(f) {

    var moment = require("moment");
    var current_timestamp = moment().format("ddd MMM D YYYY 00:00:00");
    var current_timestamp = moment(new Date());
    this.result = {email: this.clientes.email, created_at: current_timestamp._i, id_country: {
        id: this.clientes.id_country,
      },
    };
    console.log(51, this.result);
    this.authService.guardarPublico(this.result).subscribe(
      response => {
   

        if (response.mensaje == 'Cliente registrado.') {
          this.closeDialog();
          this.resetForm();
          this.swalSucces();
        }
      },  (err) => {             
        this.swalWarn();                 
        this.errorMsg = err;
        console.log(this.errorMsg, 'errorfront');
        throw err;
      });
  }

 
}
