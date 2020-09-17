import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { uuid } from 'uuidv4';
import { Colors } from 'app/models/colors';
import { ThemeSoniatService } from 'app/services/themeSoniat/theme-soniat.service';
import { TokenService } from 'app/services/token.service';
import { UserRegisterService } from 'app/services/usuario/user-register.service';
import { MessageComponent } from 'app/components/ChatBot-Soniat/message/message.component'
import { AuthService } from 'app/services/auth.service';
import { AvatarChat } from 'app/models/avatarChat';
import Message from 'app/components/ChatBot-Soniat/message/message';
import { Clientes } from 'app/models/clientes';
import { SoniatService } from 'app/services/soniat/soniat.service';
import Swal from 'sweetalert2';
import { EncuestaComponent } from '../encuesta/encuesta.component';
import { MatDialog } from '@angular/material/dialog';
import { Url_Back } from 'app/config/config';

@Component({
  selector: 'app-soniat',
  templateUrl: './soniat.component.html',
  styleUrls: [
    '../soniat/soniat.component.scss'
  ]
})

export class SoniatComponent implements OnInit {
  @ViewChild('resetset', { static: false }) resetset: ElementRef;
  @ViewChildren(MessageComponent) childrenMessages: QueryList<MessageComponent>
  public clientes = new Clientes('', null, null,null);
  public  color: Colors = new Colors();
  public result: any;
  colors: Colors[] = [];
  messages: Message[] = [];
  matchedMessages: string[] = [];
  avatarChat: AvatarChat[] = [];
  soniatForm: FormGroup;
  mostrar: boolean = false;
  filterSearch: string = '';
  writes: string;
  img: string;
  errorMsg: string;
  idPublic: number;
  idPrivate: number;
  avatar_chat: string;
  public edited = false;
  public arrayDesdeService: boolean;

  public themeChatbot = {
    'theme-yellow': false,
    'theme-blue': false,
    'theme-orange': false,
    'theme-green': false,
    'theme-purple': false,
    'theme-red': false,
    'theme-yellowDark': false,
    'theme-blueDark': false,
    'theme-orangeDark': false,
    'theme-greenDark': false,
    'theme-purpleDark': false,
    'theme-redDark': false
  };
  x:any;
  constructor(private formBuilder: FormBuilder, private router: Router,
    public themeService: ThemeSoniatService,
    public tokenService: TokenService,
    public userService: UserRegisterService,
    private authService: AuthService,
    public soniatService: SoniatService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.soniatForm = this.formBuilder.group({
      message: ['', Validators.required]
    })
    this.saveMessage('Hola me llamo SONIAT y seré tu asesor tecnológico durante la consulta, por favor coméntame ¿De que país nos escribes?', false);
    this.getThemeChatbot();
    this.authService.getAvatarChat().subscribe(
      data => {
        this.avatarChat = data;
        this.avatar_chat = this.avatarChat[0].avatarChat;
        this.img =  Url_Back+'avatar/uploads/img/' + this.avatar_chat;
      },
      err => {
        console.log(err);
      }
    );
    this.getClientPublic();
    this.getClientPrivate();
  }

  ngAfterViewInit(): void {
    this.childrenMessages.changes.subscribe((messages: QueryList<MessageComponent>) => {
      if (messages && messages.last && messages.last.messageInput) {
        this.scrollToMessage('last-message', 'end');
      }
    })
  }

  openDialog(obj) {
    const dialogRef = this.dialog.open(EncuestaComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
     this.arrayDesdeService = this.authService.getArray();
     this.edited = this.arrayDesdeService
    });
  }

  scrollToMessage(id: string, blockString: ScrollLogicalPosition) {
    const messageElem: HTMLElement = document.getElementById(`${id}`)
    if (messageElem) messageElem.scrollIntoView({ behavior: 'smooth', block: blockString })
  }

  reset() {
    this.resetset.nativeElement.value = '';
  }

  onSubmit() {
    let question = this.soniatForm.controls.message.value;
    if (question != null) {
      this.saveMessage(question, true);
      setTimeout(() => {
        this.mostrarEscribiendo();
      }, 1000);
      setTimeout(() => {
        this.borrarEscribiendo(false);
        if (this.idPublic == undefined) {
          this.questionPrivate(question);
        } else {
          this.questionPublic(question);
        }
      }, 3000);
    }
  }

  saveMessage(question: string, userMessage: boolean): void {
    this.messages.push({
      userMessage: userMessage,
      value: question,
      id: uuid()
    })
  }

  filterChanged(input: string) {
    if (input.length < 3) return
    this.matchedMessages = this.messages
      .filter(m => (m.value.toLowerCase().indexOf(input.toLowerCase()) > -1))
      .map(m => (m.id)).reverse()
    const lastElem: HTMLElement = document.getElementById(`${this.matchedMessages[0]}`)
    if (lastElem) lastElem.scrollIntoView({
      block: "center"
    })
  }

  toggleBox() {
    this.mostrar = !this.mostrar;
  }

  mostrarEscribiendo() {
    this.writes = 'escribiendo...';
  }

  borrarEscribiendo(mostrar: boolean) {
    if (mostrar === false) {
      delete this.writes;
    }
    return true;
  }

  public getThemeChatbot() {
    this.themeService.getTheme().subscribe(response => response.forEach((color: Colors) => {
      this.colors.push(color);
      this.setThemeChatbot(response[0].color);
      console.log(response);
    }))
  }

  private setThemeChatbot(theme: string) {
    const themesKeys = Object.keys(this.themeChatbot);
    for (const k of themesKeys) {
      this.themeChatbot[k] = false;
    }
    if (this.themeChatbot[theme] !== undefined) {
      this.themeChatbot[theme] = true;
    } else {
      //Tema por defecto
      this.themeChatbot['theme-blue'] = true;
    }
  }

  questionPublic(question: string) {
    this.soniatService.questionPublic(this.idPublic, question).subscribe(response => {
      this.saveMessage(response.response_soniat, false);
      // console.log(response)
    }, (error) => {
      this.errorMsg = error;
      this.swalWarning()
      throw error;
    });
  }

  getClientPublic() {
    this.idPublic = this.soniatService.getId();
  }

  questionPrivate(question: string) {
    this.soniatService.questionPrivate(this.idPrivate, question).subscribe(response => {
      this.saveMessage(response.response_soniat, false);
      // console.log(response)
    }, (error) => {
      this.errorMsg = error;
      this.swalWarning()
      throw error;
    });
  }

  getClientPrivate() {
    this.idPrivate = this.soniatService.getIdPrivate();
  }
  //////////////////////Swal Alert/////////////////////////////
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
      title: 'Por Favor Vuelva a Ingresar'
    })
  }
}


