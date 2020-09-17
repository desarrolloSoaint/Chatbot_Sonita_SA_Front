import { Component, OnInit } from '@angular/core';
import { Encuesta } from 'app/models/encuesta';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SoniatService } from 'app/services/soniat/soniat.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  public titulo: string = "Encuesta de Satisfacción";
  public encuestas = new Encuesta(null, '', '', '', null, null);
  public formGroup: FormGroup;
  public result: any;
  idPublic: number;
  idPrivate: number;
  edited;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    public soniatService: SoniatService,
    private dialogRef: MatDialogRef<EncuestaComponent>,) {
    this.formGroup = this.formBuilder.group({
      quiz_one: ['', [Validators.required]],
      quiz_two: ['', [Validators.required]],
      quiz_three: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getClientPublic();
    this.getClientPrivate();
  }

  closeDialog() {
    this.dialogRef.close();
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
      title: 'Encuesta Registrada Exitosamente'
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
      title: 'ERROR vuelva a registrarse'
    })
  }

  getClientPublic() {
    this.idPublic = this.soniatService.getId();
  }

  getClientPrivate() {
    this.idPrivate = this.soniatService.getIdPrivate();
  }

  onSubmit1() {
    var moment = require("moment");
    var current_timestamp = moment().format("ddd MMM D YYYY 00:00:00");
    var current_timestamp = moment(new Date());

    if (this.idPublic !== undefined) {
      this.result = {
        quiz_one: this.encuestas.quiz_one, quiz_two: this.encuestas.quiz_two,
        quiz_three: this.encuestas.quiz_three, created_at: current_timestamp._i,
        id_client: { id: this.idPublic },
      };
    } else {
      this.result = {
        quiz_one: this.encuestas.quiz_one, quiz_two: this.encuestas.quiz_two,
        quiz_three: this.encuestas.quiz_three, created_at: current_timestamp._i,
        id_client_private: { id: this.idPrivate }
      };
    }
    this.authService.guardarEncuesta(this.result).subscribe(
      response => {
        console.log(response)
        if (response.mensaje == 'Encuesta registrada.') {
          this.swalSucces();
          this.closeDialog();
          this.ngOnInit();
          this.sendArray( this.edited = true)
        }
      }, (err) => {
        this.swalWarn();
        throw err;
      });
  }

  sendArray(datos) {
    this.authService.setArray(datos);
  }
}