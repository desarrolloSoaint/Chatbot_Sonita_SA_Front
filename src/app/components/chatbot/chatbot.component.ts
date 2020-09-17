import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { AvatarSoniat } from 'app/models/avatarSoniat';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AvatarChat } from 'app/models/avatarChat';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Url_Back } from 'app/config/config';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})

export class ChatbotComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['Imágen', 'Eliminar', 'Seleccionar'];
  dataSource: MatTableDataSource<AvatarSoniat>;
  public titulo: string = "Lista de Avatar"
  filedata: any;
  fileEvent(e) {
    this.filedata = e.target.files[0];
  }
  file:any;
  avatar1: AvatarSoniat[] = [];
  public avatar = new AvatarSoniat(null, '');
  img: string;
  img1: string;
  soniat: any;
  public avatarChat = new AvatarChat(null, '');
  avatarChat1: AvatarChat[] = [];
  avatar_chat: string;
  info: any = {};
  authority: string;
  isLogin = false;

  constructor(private authService: AuthService, public http: HttpClient) {
  }

  ngOnInit(): void {
    setTimeout(function() {
      $("#contenido").fadeOut(6000);
    }, 3000);
    this.dataSource = new MatTableDataSource(this.avatar1);
    this.dataSource.paginator = this.paginator;
    this.authService.fotos().subscribe(response => {
      if (response.length === 0) {
        this.swalAlert();
      } else {
        response.forEach((idUser: AvatarSoniat) => {
          this.avatar1.push(idUser)
          this.dataSource.data = [];
          this.dataSource.data = this.avatar1.slice(0);
        })
      }
    })
    this.img =  Url_Back+'avatar/uploads/img/';
    this.authService.getAvatarChat().subscribe(
      data => {
        this.avatarChat1 = data;
        this.avatar_chat = this.avatarChat1[0].avatarChat;
        this.img1 = Url_Back+'avatar/uploads/img/' + this.avatar_chat;
      },
      err => {
        console.log(err);
      }
    );
  }

  swalAlert() {
    let timerInterval
    Swal.fire({
      title: 'NO hay Registros',
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
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

  load() {
    this.authService.fotos().subscribe(response => {
      this.avatar1 = [];
      response.forEach((idUser: AvatarSoniat) => {
        this.avatar1.push(idUser)
      });
      this.dataSource.data = [];
      this.dataSource.data = this.avatar1.slice(0);
    })
  }

  obtener(x) {
    if (x != null) {
      this.soniat = x;
    }
  }

  eliminar(x) {
    this.avatar = x;
    this.authService.deleteAvatar(this.avatar.id).subscribe(
      response => {
        if (response.mensaje == 'Avatar eliminado Exitosamente') {
          this.load();
        }
      }, (err) => {
        throw err;
      });
  }

  elegir() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Estás Seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Elegir Foto',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.editAvatar();
        swalWithBootstrapButtons.fire(
          'Guardado!',
          'Tu Avatar ha sido Guardado Correctamente.',
          'success'
        )
        this.ngOnInit();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu Avatar está seguro :)',
          'error'
        )
      }
    })
  }

  editAvatar() {
    console.log(this.avatarChat, "hola")
    this.avatarChat = new AvatarChat(1, this.soniat.avatar);
    this.authService.editAvatar(this.avatarChat).subscribe(
      response => {
        if (response.mensaje == 'Avatar actualizado') {
          this.swalSucces();
          this.ngOnInit();
          this.load();
        }
      }, (err) => {
        this.swalWarn();
        throw err;
      });
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
      title: 'Avatar Registrado Exitosamente'
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
      title: 'La Extensión debe ser .PNG o la Imágen muy pesada pruebe con otra.'
    })
  }

  onSubmit1() {
    var myFormData = new FormData();
    myFormData.append('file', this.filedata);
    this.authService.avatar(myFormData).subscribe(
      response => {
        if (response.mensaje == 'Avatar registrado exitosamente') {
          this.swalSucces();
          this.load();
        }
      }, (err) => {
        this.swalWarn();
        throw err;
      });
  }

  Borrar(x) {
    this.avatar = x;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Estás Seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.eliminar(x);
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Tu Avatar ha sido eliminado correctamente.',
          'success'
        )
        this.ngOnInit();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu Avatar está seguro :)',
          'error'
        )
      }
    })
  }
}
