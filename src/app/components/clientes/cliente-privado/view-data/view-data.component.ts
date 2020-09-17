import { Component, OnInit, Optional, Inject } from '@angular/core';
import { PrivateContact } from 'app/models/private-contact';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataPrivate } from 'app/models/data-private';
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import { Country } from 'app/models/country';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {
  public privateData = new DataPrivate;
  public privateContact = new PrivateContact;
  public paises: Country[] = [];
  public title = 'Ver Info Cliente Privado';
  public formGroup: FormGroup;
  public result: any;
  public dataFormGroup: FormGroup;
  minDate: Date;
  maxDate: Date;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public newClient,
    public formBuilder: FormBuilder,
    public userService: UserRegisterService,
    public dialogRef: MatDialogRef<ViewDataComponent>,
  ) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 90, 0, 0);
    this.maxDate = new Date(currentYear - 17, 0 , 0);

    this.formGroup = this.formBuilder.group({
      email: [ '', [Validators.required]],
      id_country: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
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
    this.userService.getContry().subscribe(response => response.forEach((country: Country) => {
      this.paises.push(country)
    }))
    this.getClient();
  }
  swalSucces() {
    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer)
        toast.addEventListener('mouseleave', swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Data Registrada Exitosamente'
    })
  }

  swalWarn() {
    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer)
        toast.addEventListener('mouseleave', swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'warning',
      title: 'Ese Email ya existe'
    })
  }
  saveData(dataFormGroup) {
    console.log(this.dataFormGroup.value, 'prueba1');
    this.result = {
      birth_date: this.privateData.birth_date,
      id_client_private: {
        id: this.privateContact.id,
        email: this.privateContact.email,
        id_country: this.privateContact.id_country,
        password: this.privateContact.password
      },
      identification_card: this.privateData.identification_card,
      last_names: this.privateData.last_names,
      mobile_phone: this.privateData.mobile_phone,
      names: this.privateData.names,
    };
    console.log(111, this.result);
    this.userService.crearDataPrivate(this.result).subscribe(
      response => {
        console.log(114, response);

        if (response.mensaje === 'Data del Usuario registrado.') {
          this.closeDialog();
          this.swalSucces();
        }
        // tslint:disable-next-line: no-unused-expression
      }), (err) => {
        this.swalWarn();
        throw err;
      };
  }

  getClient() {
    const clientId = this.newClient.id;
    this.userService.getIdPrivate().subscribe(privateContacts => {
      const filteredUsers = privateContacts.filter((privateContact) => {
        return privateContact.id === clientId;
      });
      if (filteredUsers.length > 0) {
        this.privateContact = filteredUsers[0];
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
        this.privateData = filteredDataUsers[0];
        this.formCreate(filteredDataUsers[0]);
        console.log(this.dataFormGroup.getRawValue());
        console.log(this.privateData.id);
      } else {
        console.error('El id no fue encontrado');
      }
    })
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
