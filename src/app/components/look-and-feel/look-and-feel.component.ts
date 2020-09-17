import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThemeSoniatService } from 'app/services/themeSoniat/theme-soniat.service';
import { Colors } from 'app/models/colors';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-look-and-feel',
  templateUrl: './look-and-feel.component.html',
  styleUrls: ['./look-and-feel.component.scss']
})
export class LookAndFeelComponent implements OnInit {

  @Output() update = new EventEmitter<boolean>();
  
  public colors;
  public titulo: string = "Cambiar Look And Feel"

  constructor(
    public themeService: ThemeSoniatService) { }

  ngOnInit(): void {}

  saveColor(color: string) {
      const newColor: Colors = {
        color: color,
      };
      this.themeService.updateTheme(newColor).subscribe(res => { 
        this.colors = newColor
        this.update.next(true);
        this.swalSuccess();
      });
  } 
  ////////////////////////////////Swal Alert /////////////////////////////////////
  swalSuccess(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'El Color del Chat Ahora es: ' +this.colors.color
    })
  }
}
