import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PrivateContact } from 'app/models/private-contact';
import { DataPrivate } from 'app/models/data-private';
import { Country } from 'app/models/country';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from 'app/components/usuario/register-user/register-user.component';

@Component({
  selector: 'app-register-client-private',
  templateUrl: './register-client-private.component.html',
  styleUrls: ['./register-client-private.component.css'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class RegisterClientPrivateComponent implements OnInit {
  emailPattern: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  phonePattern: any = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  passPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.\/])(?=.{8,})/;
  numPattern: any = /^([0-9]){6,10}$/;
  onlyLettersPattern: any = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/;

  public dataFormGroup: FormGroup;
  public formGroup: FormGroup;

  public clientPrivate: PrivateContact = new PrivateContact ();
  public _clientPrivate: DataPrivate = new DataPrivate ();
  public idLists: PrivateContact[] = [];
  public paises: Country[] = [];

  public currentID: any;
  public matcher = new MyErrorStateMatcher();
  public minDate: Date;
  public maxDate: Date;
  public isLinear = false;
  public title = 'Crear cliente privado';
  public result: any;
  public current_timestamp: string;
  errorMsg: string;

  constructor(private dialogRef: MatDialogRef<RegisterClientPrivateComponent>,
    private formBuilder: FormBuilder,
    private userService: UserRegisterService) {

    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.passPattern)]],
      id_country: ['', Validators.required],
      created_at: ['', this.current_timestamp]
    });
    this.dataFormGroup = this.formBuilder.group({
      id_client_private: [],
      names: ['', Validators.required],
      last_names: ['', Validators.required],
      identification_card: ['', Validators.required],
      mobile_phone: ['', Validators.required],
      birth_date: ['', Validators.required],
      created_at: ['', this.current_timestamp]
    });
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 90, 0, 0);
    this.maxDate = new Date(currentYear - 17, 0, 0);
  }
  get names() { return this.dataFormGroup.get('names') }
  get birth_date() { return this.dataFormGroup.get('birth_date') }
  get last_names() { return this.dataFormGroup.get('last_names') }
  get identification_card() { return this.dataFormGroup.get('identification_card') }
  get mobile_phone() { return this.dataFormGroup.get('mobile_phone') }
  get email() { return this.formGroup.get('email') }
  get password() { return this.formGroup.get('password') }
  get id_country() { return this.formGroup.get('id_country') }


  ngOnInit(): void {
    this.userService.getContry().subscribe(response => response.forEach((country: Country) => {
      this.paises.push(country)
    }));
    this.userService.getIdPrivate().subscribe(response => response.forEach((id_client_private: PrivateContact) => {
      this.idLists.push(id_client_private)
    }));
  }
  closeDialog(data?: any) {
    if (data) {
      this.dialogRef.close(data);
    } else {
      this.dialogRef.close();
    }
  }
  create() {
    this.closeDialog();
    this.swalSucces();
  }

  saveClient(): void {
    if (this.formGroup.valid) {
      const resultClient: PrivateContact = Object.assign({}, this.formGroup.value);
      const moment = require('moment');
      this.current_timestamp = moment().format('dd MMM D YYYY 00:00:00');
      this.current_timestamp = moment(new Date());
      resultClient.created_at = this.current_timestamp;
      this.currentID = resultClient.id;
      console.log(resultClient.id, resultClient);
      this.userService.save(resultClient).subscribe(response => {
        this.currentID = response.id
        console.log(response.id, response);
      }, (error) => {
        this.errorMsg = error;
        console.log(this.errorMsg);
        this.swalWarn();
        this.closeDialog();
        throw error;
      });
    } else {
      console.log("No Valido");
      this.closeDialog();
      this.swalWarn();
    }
  }

  saveData(): void {
    if (this.dataFormGroup.valid) {
      const resultData: DataPrivate = Object.assign({}, this.dataFormGroup.value);
      console.log(resultData);
      const moment = require('moment');
      this.current_timestamp = moment().format('dd MMM D YYYY 00:00:00');
      this.current_timestamp = moment(new Date());
      resultData.created_at = this.current_timestamp;
      resultData.id_client_private = {
        id: this.currentID
      }
      console.log(resultData, 'solqlo')
      this.userService.crearDataPrivate(resultData).subscribe(response => {
        console.log(this.currentID)
        console.log(response)
      }, (error) => {
        this.errorMsg = error;
        console.log(this.errorMsg);
        this.swalWarn();
        throw error;
      });
    } else {
      console.log("No Valido");
      this.swalWarn();
      this.closeDialog();
    }
  }
  // ------------------------------------------------------------ SweetAlerts -------------------------------------------------- //

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
      title: 'Usuario Creado Exitosamente'
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
