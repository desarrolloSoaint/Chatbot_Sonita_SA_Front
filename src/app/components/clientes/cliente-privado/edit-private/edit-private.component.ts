import { Component, OnInit, Optional, Inject } from '@angular/core';
import { PrivateContact } from 'app/models/private-contact';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Country } from 'app/models/country';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import Swal from 'sweetalert2';
import { DataPrivate } from 'app/models/data-private';
import { MyErrorStateMatcher } from 'app/components/usuario/register-user/register-user.component';
@Component({
  selector: 'app-edit-private',
  templateUrl: './edit-private.component.html',
  styleUrls: ['./edit-private.component.css']
})
export class EditPrivateComponent implements OnInit {
  emailPattern: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  phonePattern: any = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  passPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  numPattern: any = /^([0-9]){6,10}$/;

  public title = 'Editar Cliente Privado';
  public clientes = new PrivateContact;
  public _clientes = new DataPrivate;
  public formGroup: FormGroup;
  public dataFormGroup: FormGroup;
  public paises: Country[] = [];
  public minDate: Date;
  public maxDate: Date;
  matcher = new MyErrorStateMatcher();


  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditPrivateComponent>,
    public userService: UserRegisterService,
    @Optional() @Inject(MAT_DIALOG_DATA) public newClient) {

      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 90, 0, 0);
      this.maxDate = new Date(currentYear - 17, 0 , 0);

    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      id_country: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  this.dataFormGroup = this.formBuilder.group({
    id_private: {},
    birth_date: ['', [Validators.required]],
    identification_card: ['', [Validators.required]],
    last_names: [ '', [Validators.required]],
    mobile_phone: [ '', [Validators.required]],
    names: [ '', [Validators.required]],
  });
  }

  formCreateClient(clientPrivate: PrivateContact) {
    this.formGroup = this.formBuilder.group({
      id: clientPrivate.id || {},
      email: [clientPrivate.email || ''],
      password: [clientPrivate.password || ''],
      id_country: [clientPrivate.id_country.id || ''],
    })
  }

  formCreate(dataPrivate: DataPrivate) {
    this.dataFormGroup = this.formBuilder.group({
      id_client_private: dataPrivate.id_client_private || {},
      birth_date: [dataPrivate.birth_date || '', [Validators.required]],
      identification_card: [dataPrivate.identification_card || '', [Validators.required]],
      last_names: [dataPrivate.last_names || '', [Validators.required]],
      mobile_phone: [dataPrivate.mobile_phone || '', [Validators.required]],
      names: [dataPrivate.names || '', [Validators.required]],
    });
    this.dataFormGroup.setValue({
      id_client_private: dataPrivate.id_client_private || {},
      birth_date: new Date(dataPrivate.birth_date) || '',
      identification_card: dataPrivate.identification_card || '',
      last_names: dataPrivate.last_names || '',
      mobile_phone: dataPrivate.mobile_phone || '',
      names: dataPrivate.names || ''
    });
  }

  get email() { return this.formGroup.get('email') }
  get id_country() { return this.formGroup.get('id_country') }
  get password() { return this.formGroup.get('password') }


  get birth_date() { return this.dataFormGroup.get('birth_date') }
  get identification_card() { return this.dataFormGroup.get('identification_card') }
  get names() { return this.dataFormGroup.get('names') }
  get mobile_phone() { return this.dataFormGroup.get('mobile_phone') }
  get last_names() { return this.dataFormGroup.get('last_names') }

  ngOnInit(): void {
    this.userService.getContry().subscribe(response => response.forEach ((country: Country) => {
      this.paises.push(country)
    }));

    this.getClient();
  }


  closeDialog() {
    this.dialogRef.close();
  }

  getClient() {
    const clientId = this.newClient.id;
    this.userService.getIdPrivate().subscribe(privateContacts => {
      const filteredUsers = privateContacts.filter((privateContact) => {
        return privateContact.id === clientId;
      });
      if (filteredUsers.length > 0) {
        this.clientes = filteredUsers[0];
        this.formCreateClient(filteredUsers[0]);
      } else {
        console.error('El id no fue encontrado');
      }
    });
    this.userService.getDataPrivate().subscribe(dataClient => {
      const filteredDataUsers = dataClient.filter(privateData => {
        return privateData.id_client_private.id === clientId;
      });
      console.log(dataClient)


      if (filteredDataUsers.length > 0) {
        this._clientes = filteredDataUsers[0];
        this.formCreate(filteredDataUsers[0]);
        console.log(this.dataFormGroup.getRawValue());
        console.log(this._clientes.names);
      } else {
        console.error('El id no fue encontrado');
        this.swalAlert();
      }
    })
  }

  editData(_clientes: DataPrivate) {
    if (this.dataFormGroup.valid) {
    console.log(this._clientes.id)
    const _result: DataPrivate = Object.assign({},this.dataFormGroup.value);
    this.userService.updateDataPrivate(_result, this._clientes.id).subscribe(
      response => {
        console.log(response.mensaje);
        console.log(this._clientes,'hh');

        if (response.mensaje === 'Usuario actualizado') {
          this.closeDialog();
          this.swalSucces();
          this.ngOnInit();
        }
      }, (err) => {
        this.swalWarn();
        this.closeDialog();
        throw err;
      });
    }
  }


  edit() {
    if (this.formGroup.valid) {
      const result: PrivateContact = Object.assign({}, this.formGroup.value);
      this.userService.edit(result, this.newClient.id).subscribe(
        response => {
          console.log(response);
          this.closeDialog();
          this.swalSucces();
          if (response.mensaje === 'Cliente actualizado exitosamente') {
            console.log(response);
          }
        }, (err) => {
          this.swalWarn();
          this.closeDialog();
          throw err;
        });
      }
    }


  // --------------------------------------------- SeetAlert ------------------------------------------------------- //
  swalAlert() {
    let timerInterval
    Swal.fire({
      title: 'Este Usuario NO Posee Data',
      // html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              Swal.getTimerLeft()
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }


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
}
