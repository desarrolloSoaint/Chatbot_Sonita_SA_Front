import { Component, OnInit, Optional, Inject } from '@angular/core';
import { User } from 'app/models/user';
import { DataUser } from 'app/models/dataUser';
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import  Swal  from 'sweetalert2';
import { Gender } from 'app/models/gender';
import { Country } from 'app/models/country';
import { Rol } from 'app/models/rol';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  public generos: Gender[] = [];
  public roleList: Rol[] = [];
  public paises: Country[] = [];
  public user: User = new User();
  public _user: DataUser = new DataUser();
  public dataFormGroup: FormGroup;
  public formGroup: FormGroup;
  public titulo: string = "Ver Usuario"; 

  constructor(
    private dialogRef: MatDialogRef<ViewUserComponent>,
    public userService: UserRegisterService,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public newUser)
  {
  }

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
    this.getuser()
  }

  closeDialog(){
    this.dialogRef.close();
  }

  formCreateUser(user:User){
    this.formGroup = this.formBuilder.group({ 
        id: user.email || {}, 
        email: [user.email ||''],
        password: [user.password ||''],
        roles:[user.roles.map(r => r.id)  ||'']
      })
  }

  formCreate(dataUser:DataUser){
    this.dataFormGroup = this.formBuilder.group({ 
      id_user: dataUser.id_user || {}, 
      birth_date: [dataUser.birth_date || ''],
      id_country: [dataUser.id_country.id ||''],
      id_gender: [dataUser.id_gender.id ||''], 
      identification_card: [dataUser.identification_card ||''],
      image_user: [dataUser.image_user || ''],
      last_names: [dataUser.last_names ||''],
      local_telephone: [dataUser.local_telephone ||''],
      mobile_phone: [dataUser.mobile_phone ||''],
      names: [dataUser.names ||'']
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
  /////////////////////Swal Alert /////////////////////////
  swalAlert(){
    let timerInterval
    Swal.fire({
      title: 'Este Usuario NO Posee Data',
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