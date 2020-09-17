import { Component, OnInit } from '@angular/core';
import { Gender } from 'app/models/gender';
import { Rol } from 'app/models/rol';
import { Country } from 'app/models/country';
import { User } from 'app/models/user';
import { DataUser } from 'app/models/dataUser';
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class RegisterUserComponent implements OnInit {

  emailPattern: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  phonePattern: any = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  passPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.\/])(?=.{8,})/;
  numPattern: any = /^([0-9]){6,10}$/;
  creteAt: any = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})(\s)([0-1][0-9]|2[0-3])(:)([0-5][0-9])(:)([0-5][0-9])$/;

  public generos: Gender[] = [];
  public roleList: Rol[] = [];
  public paises: Country[] = [];
  public userList: User[] = [];

  public dataFormGroup: FormGroup;
  public formGroup: FormGroup;
  public user: DataUser = new DataUser();
  public _user: User = new User();
  private currentID: number;
  public titulo: string = "Crear Usuario";

  current_timestamp: string;
  minDate: Date;
  maxDate: Date;
  isLinear = false;
  matcher = new MyErrorStateMatcher();
  errorMsg: string;

  constructor(
    private dialogRef: MatDialogRef<RegisterUserComponent>,
    private formBuilder: FormBuilder,
    public userService: UserRegisterService) {
    this.dataFormGroup = this.formBuilder.group({
      id_user: [],
      birth_date: ['', [Validators.required]],
      id_country: ['', [Validators.required]],
      id_gender: ['', [Validators.required]],
      identification_card: ['', [Validators.required, Validators.pattern(this.numPattern)]],
      image_user: [],
      last_names: ['', [Validators.required]],
      local_telephone: ['', [Validators.pattern(this.phonePattern)]],
      mobile_phone: ['', [Validators.pattern(this.phonePattern)]],
      names: ['', [Validators.required]]
    })
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.passPattern)]],
      roles: ['', [Validators.required]],
      created_at: ['', this.current_timestamp]
    })
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 90, 0, 0);
    this.maxDate = new Date(currentYear - 17, 0, 0);
  }

  get names() { return this.dataFormGroup.get("names") }
  get birth_date() { return this.dataFormGroup.get("birth_date") }
  get last_names() { return this.dataFormGroup.get("last_names") }
  get id_gender() { return this.dataFormGroup.get("id_gender") }
  get id_country() { return this.dataFormGroup.get("id_country") }
  get identification_card() { return this.dataFormGroup.get("identification_card") }
  get mobile_phone() { return this.dataFormGroup.get("mobile_phone") }
  get local_telephone() { return this.dataFormGroup.get("local_telephone") }
  get email() { return this.formGroup.get("email") }
  get password() { return this.formGroup.get("password") }
  get roles() { return this.formGroup.get("roles") }

  ngOnInit(): void {
    this.userService.getGender().subscribe(response => response.forEach((gender: Gender) => {
      this.generos.push(gender)
    }))
    this.userService.getContry().subscribe(response => response.forEach((country: Country) => {
      this.paises.push(country)
    }))
    this.userService.getUser().subscribe(response => response.forEach((id_user: User) => {
      this.userList.push(id_user)
    }))
    this.userService.getRole().subscribe(response => response.forEach((role: Rol) => {
      this.roleList.push(role)
    }))
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

  saveUser(): void {
    if (this.formGroup.valid) {
      const result: User = Object.assign({}, this.formGroup.value);
      result.roles = Array.from(result.roles.map((r: number) => (Object.assign({}, { id: r }))))
      var moment = require("moment");
      this.current_timestamp = moment().format("ddd MMM D YYYY 00:00:00");
      this.current_timestamp = moment(new Date())
      result.created_at = this.current_timestamp;
      this.currentID = result.id;
      this.userService.create(result).subscribe(response => {
        this.currentID = response.id;
      }, (error) => {
        this.errorMsg = error;
        console.log(this.errorMsg);
        this.swalWarning();
        this.closeDialog();
        throw error;
      });
    } else {
      console.log("No Valido");
      this.closeDialog();
      this.swalWarning();
    }
  }

  saveData(): void {
    if (this.dataFormGroup.valid) {
      const resultData: DataUser = Object.assign({}, this.dataFormGroup.value);
      resultData.id_country = Object.assign({}, { 'id': this.dataFormGroup.controls['id_country'].value });
      resultData.id_gender = Object.assign({}, { 'id': this.dataFormGroup.controls['id_gender'].value });
      resultData.id_user = {
        id: this.currentID
      };
      this.userService.crearData(resultData).subscribe(response => {
      }, (error) => {
        this.errorMsg = error;
        console.log(this.errorMsg);
        this.swalWarning();
        this.closeDialog();
        throw error;
      });
    } else {
      console.log("No Valido");
      this.swalWarning();
      this.closeDialog();
    }
  }

  // ------------------------------Swal Alert ------------------------------------
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

  swalWarning() {
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
      title: 'El Email ya Existe'
    })
  }
}
