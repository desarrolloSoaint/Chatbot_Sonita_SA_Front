import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Gender } from 'app/models/gender';
import { Rol } from 'app/models/rol';
import { Country } from 'app/models/country';
import { User } from 'app/models/user';
import { DataUser } from 'app/models/dataUser';
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
 
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class EditUserComponent implements OnInit {

  emailPattern:any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  phonePattern:any = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  passPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  numPattern: any = /^([0-9]){6,10}$/;
  
  public generos: Gender[] = [];
  public roleList: Rol[] = [];
  public paises: Country[] = [];
  public userList: User[] = [];
  public dataUser: DataUser[] = [];

  public titulo: string = "Editar Usuario"; 
  public dataFormGroup: FormGroup;
  public formGroup: FormGroup;
  public _user: DataUser = new DataUser ();
  public user: User = new User();
  private currentID: number;

  minDate: Date;
  maxDate: Date;
  isOptional = false;
  current_timestamp: string;
  matcher = new MyErrorStateMatcher();
  
  constructor(
    private dialogRef: MatDialogRef<EditUserComponent>, 
    private formBuilder: FormBuilder, 
    public userService: UserRegisterService,
    @Optional() @Inject(MAT_DIALOG_DATA) public newUser) 
    {
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 90, 0, 0);
      this.maxDate = new Date(currentYear - 17, 0 , 0);
    }

  get names(){return this.dataFormGroup.get("names") }
  get birth_date(){return this.dataFormGroup.get("birth_date") }
  get last_names(){return this.dataFormGroup.get("last_names") }
  get id_gender(){return this.dataFormGroup.get("id_gender") }
  get id_country(){return this.dataFormGroup.get("id_country") }
  get identification_card(){return this.dataFormGroup.get("identification_card") }
  get mobile_phone(){return this.dataFormGroup.get("mobile_phone") }
  get local_telephone(){return this.dataFormGroup.get("local_telephone") }
  get email(){return this.formGroup.get("email") }
  get password(){return this.formGroup.get("password") }
  get roles(){return this.formGroup.get("roles") }

  ngOnInit(): void {
    this.userService.getGender().subscribe(response => response.forEach ((gender:Gender) => {
      this.generos.push(gender)
     }));
     this.userService.getContry().subscribe(response => response.forEach ((country:Country) => {
       this.paises.push(country)
     }));
     this.userService.getRole().subscribe(response => response.forEach ((role:Rol) => {
       this.roleList.push(role)
     }));
    this.getuser();
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

  formCreateUser(user:User){
    this.formGroup = this.formBuilder.group({ 
        id: user.email || {}, 
        email: [user.email ||'', [Validators.required, Validators.pattern(this.emailPattern)]],
        password: [user.password ||'',[Validators.required,Validators.pattern(this.passPattern)]],
        roles: [user.roles.map(r => r.id) ||'', [Validators.required]],
        created_at:['',this.current_timestamp]
    })
  }

  formCreate(dataUser:DataUser){
    this.dataFormGroup = this.formBuilder.group({ 
      id_user: dataUser.id_user || {}, 
      birth_date: [dataUser.birth_date || '',[Validators.required]],
      id_country: [dataUser.id_country.id ||'',[Validators.required]],
      id_gender: [dataUser.id_gender.id ||'',[Validators.required]], 
      identification_card: [dataUser.identification_card ||'',[Validators.required, Validators.pattern(this.numPattern)]],
      image_user: [dataUser.image_user ||''],
      last_names: [dataUser.last_names ||'',[Validators.required]],
      local_telephone: [dataUser.local_telephone ||'',[Validators.pattern(this.phonePattern)]],
      mobile_phone: [dataUser.mobile_phone ||'',[Validators.pattern(this.phonePattern)]],
      names: [dataUser.names ||'',[Validators.required]]
    });

    this.dataFormGroup.setValue({
      birth_date: new Date(dataUser.birth_date)||"",
      id_user: dataUser.id_user||"",
      id_country: dataUser.id_country.id||"",
      id_gender: dataUser.id_gender.id||"", 
      identification_card: dataUser.identification_card||"",
      image_user: dataUser.image_user||"",
      last_names: dataUser.last_names||"",
      local_telephone: dataUser.local_telephone||"",
      mobile_phone: dataUser.mobile_phone||"",
      names: dataUser.names||""
    });
  }

  getuser(){
    const userId = this.newUser.id; 
    this.userService.getUser().subscribe(users  => {
      const filteredUsers = users.filter((user) => {
        return user.id === userId;
      });
      if (filteredUsers.length > 0) {
        this.user = filteredUsers[0];
        this.formCreateUser(filteredUsers[0]);
      }  else {
        console.error("El id no fue encontrado"); 
        this.swalAlert();
      }
    });
    this.userService.getDataUser().subscribe(dataUsers => {
      const filteredDataUsers = dataUsers.filter(_user => {
        return _user.id_user.id === userId;
      });
      if (filteredDataUsers.length > 0) {
        this._user = filteredDataUsers[0];
        this.formCreate(filteredDataUsers[0]);
      }  else {
        console.error("El id no fue encontrado"); 
        this.swalAlert();
      }
    })
  }

  updateUser() {
    if (this.formGroup.valid){
      const result: User = Object.assign({}, this.formGroup.value);
      result.roles = Array.from(result.roles.map((r:number) =>( Object.assign({}, {id:r})))) 
      var moment = require("moment");
      this.current_timestamp = moment().format("ddd MMM D YYYY 00:00:00");
      this.current_timestamp = moment(new Date())
      result.created_at = this.current_timestamp;
      this.userService.update(result,this.newUser.id).subscribe(
      response => {
        this.closeDialog();
        this.swalSucces();
        if (response.mensaje == 'Usuario actualizado exitosamente') {
          console.log(response);
        }
      }, (err) => {
        this.swalWarn();
        this.closeDialog();
        throw err;
      });
    }
  }

  updateData() {
    if (this.formGroup.valid){
      const resultData: DataUser = Object.assign({}, this.dataFormGroup.value);
      resultData.id_country = Object.assign({},{"id":this.dataFormGroup.controls['id_country'].value});
      resultData.id_gender = Object.assign({},{"id":this.dataFormGroup.controls['id_gender'].value});
      this.userService.updateDataUser(resultData,this._user.id).subscribe(
      response => {
        this.closeDialog();
        this.swalSucces();
        if (response.mensaje === 'Data de usuario actualizada') {
          console.log(response);
        }
      }, (err) => {
        this.swalWarn();
        this.closeDialog();
        throw err;
      });
    }
  }

// -------------------------------------------Swal Alert----------------------------------------//
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
      title: 'Usuario Creado Exitosamente'
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
      title: 'El Email ya Existe'
    })
  }

  swalAlert(){
    let timerInterval
    Swal.fire({
      title: 'Este Usuario NO Posee Data',
      //html: 'I will close in <b></b> milliseconds.',
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
}