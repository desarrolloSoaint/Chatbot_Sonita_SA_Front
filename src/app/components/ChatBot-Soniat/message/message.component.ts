import { Component, OnInit, Input } from '@angular/core';
import Message from './message';
import { ThemeSoniatService } from 'app/services/themeSoniat/theme-soniat.service';
import { Colors } from 'app/models/colors';
import { AuthService } from 'app/services/auth.service';
import { AvatarChat } from 'app/models/avatarChat';
import { Url_Back } from 'app/config/config';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  img: string;
  avatarChat: AvatarChat[] = [];
  prueba: string;
  avatar_chat: string;
  colors: Colors[] = [];
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

  @Input() messageInput:Message;

  constructor(
    public themeService: ThemeSoniatService,
    private authService: AuthService) { }
 
  ngOnInit() {
    this.setThemeChatbot('theme-blue');
    this.authService.getAvatarChat().subscribe(
      data => {
        this.avatarChat = data;
        this.avatar_chat = this.avatarChat[0].avatarChat;
        this.img =  Url_Back+'avatar/uploads/img/'+ this.avatar_chat;
      },
      err => {
        console.log(err);
      }
    );
  }

  private setThemeChatbot(theme: string) {
    const themesKeys = Object.keys(this.themeChatbot);
    for (const k of themesKeys) {
      this.themeChatbot[k] = false;
    }
    if (this.themeChatbot[theme] !== undefined) {
      this.themeChatbot[theme] = true;
    } else {
      //Tema por defector si no existe el temea que se pase 
      this.themeChatbot['theme-blue'] = true;
    }
  }
}


  

     
  