import { Component, OnInit, Optional, Inject } from '@angular/core';
import { HistoryService } from 'app/services/history/history.service';
import { IconOptions } from '@angular/material/icon';
import { IconsComponent } from '../../icons/icons.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modaltiemres',
  templateUrl: './modaltiemres.component.html',
  styleUrls: ['./modaltiemres.component.css']
})

export class ModaltiemresComponent implements OnInit {
  time: any = {};
  a: any = {};
  constructor(private history: HistoryService,

    private dialogRef: MatDialogRef<ModaltiemresComponent>,

     @Optional() @Inject(MAT_DIALOG_DATA) public newUser)  { }

  ngOnInit(): void {
    this.getid();
  }
  closeDialog() {
    this.dialogRef.close();
  }
getid() {

  this.a = this.newUser;
  this.history.gettimer(this.a.id).subscribe(

    data => {
       this.time = data;

      // //console.log('lo que trae data', data)
      // console.log('time tiempo con id ', this.time)
      // // console.log('el idddddddddd', this.a)
    }
  );
// console.log("aaaaaaaaaaaaa",this.a);
}

}
