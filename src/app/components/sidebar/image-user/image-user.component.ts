import { Component, OnInit } from '@angular/core';
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Image } from 'app/models/image';
import { AuthService } from 'app/services/auth.service';
import { DataU } from 'app/models/datau';
import { TokenService } from 'app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-user',
  templateUrl: './image-user.component.html',
  styleUrls: ['./image-user.component.css']
})
export class ImageUserComponent implements OnInit {
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  file:any;
  imagen: Image[] = [];

  imagen1: string;
rutaimagen: any;
  filedata: any;
  icon: any;
  public id: Array<any>;
  dataUser:  DataU []= [];
  variable:any;
  public datid:any;
  public otra: any;
  public ulti:any;
  dato: any;
  idU:any;
  datuserid:any;
  ima:any;
  infos: any = {};
  fileEvent(e) {
    this.filedata = e.target.files[0];
    console.log(this.filedata);
  }
  constructor(private http:HttpClient, 
    private dialogRef: MatDialogRef<ImageUserComponent>,
    private userRegister:UserRegisterService,private authService: AuthService,
    private tokenService: TokenService)

     {}
  get f(){
    return this.myForm.controls;
    
  }
 


  ngOnInit(): void {
    
    this.infos = {
      email: this.tokenService.getUserName(),
      id: this.tokenService.getId(),
      authorities: this.tokenService.getAuthorities()
    };

    this.authService.id().subscribe(response => response.forEach((idUser: DataU) => {
      this.dataUser.push(idUser)
      this.dato = idUser.id_user;
      this.otra = this.dato.id;

      if (this.infos.id==this.otra){
        this.dataUser.push(idUser)
        this.idU = idUser.id

    this.ima= this.idU;

          }
    }));
    

  }
  onSubmit1() {

    var myFormData = new FormData();
    myFormData.append('file', this.filedata);
    this.userRegister.avatar(myFormData,this.idU).subscribe(

      response => {
        
        if (response.mensaje == 'Avatar registrado exitosamente') {
          this.closeDialog();
          this.swalSucces();
        }
      }, (err) => {
        this.swalWarn();
        throw err;
      });
  }

  closeDialog(){
    this.dialogRef.close();
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
      title: 'Avatar Creado Exitosamente'
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
      title: 'la Imágen debe ser PNG'
    })
  }
}