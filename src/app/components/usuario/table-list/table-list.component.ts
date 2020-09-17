import { Component, OnInit, ViewChild} from '@angular/core';
import { User } from 'app/models/user';
import { DataUser } from 'app/models/dataUser';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { ViewUserComponent } from '../view-user/view-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'], 
})

export class TableListComponent implements OnInit {

  public titulo: string = "Lista de Usuarios"; 
  public userList: User[] = [];
  public dataUserList: DataUser[] = [];
  public user: User = new User();
  public _user: DataUser = new DataUser();
  dataSource: MatTableDataSource<User>;
  displayedColumns =  ['Email', 'Roles', 'Ver','Modificar','Eliminar'];
  spinner;

 @ViewChild (MatPaginator, {static:true }) paginator:MatPaginator;
 @ViewChild(MatSort, { static: true }) sort: MatSort;
 
  constructor
  ( public dialog: MatDialog,
    public userService: UserRegisterService
  ){}

  ngOnInit() {
    setTimeout(function() {
      $("#contenido").fadeOut(6000);
    }, 3000);
    this.dataSource = new MatTableDataSource(this.userList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.userService.getUser().subscribe(response => {
      if(response.length === 0){
        this.swalAlert();
        setTimeout(function() {
          $("#contenido").fadeOut(3000);
        }, 3000);
      }else{
        response.forEach((idUser:User) => {
          this.userList.push(idUser)
          this.dataSource.data=[];
          this.dataSource.data = this.userList.slice(0);
        })
      }
    })
  }

  filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  load() {
    setTimeout(function() {
      $("#contenido").fadeOut(6000);
    }, 3000);
    this.userService.getUser().subscribe(response => {
    this.userList = [];
    response.forEach((idUser:User) => {
    this.userList.push(idUser)
    });
    this.dataSource.data=[];
    this.dataSource.data = this.userList.slice(0);
    })
  }

  public openDataUser(){
    const config = new MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    const dialogRef = this.dialog.open(RegisterUserComponent, config)
    dialogRef.afterClosed().subscribe(result => {
      this.load();
      console.log('The dialog was closed');
    });
  }

  public openSearch(user: User){
  const dialogRef = this.dialog.open(ViewUserComponent, {
    data:{
      id: user.id
    }
  });
  console.log(user);
  dialogRef.afterClosed().subscribe(result => {
   console.log('The dialog was closed');
   });
  }

  public openEdit(user: User){
    const dialogRef =this.dialog.open(EditUserComponent, {
      data:{
        id: user.id
      }
    });
    console.log(user)
    dialogRef.afterClosed().subscribe(result => {
     this.load();
     console.log('The dialog was closed');
    });
  }

  deleteUser(x): void{
    this.user = x;
    console.log(this.user.id)
    this.userService.delete(this.user.id).subscribe(response => console.log(response));
  }

  deleted(x){
    this.user = x;
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
        this.deleteUser(x);
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El usuario ha sido eliminado correctamente.',
          'success'
        )
        this.load();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Estás seguro?',
          'error'
        )
      }
    })
  }
  //////////////////////Swal Alert//////////////////////////////
  swalAlert(){
    let timerInterval
    Swal.fire({
      title: 'No Existe Usuario en la Base de Datos',
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
}
