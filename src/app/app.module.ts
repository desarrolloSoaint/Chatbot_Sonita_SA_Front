import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app/app-routing.module';
import { ComponentsModule } from './components/components.module';
import { APP_INITIALIZER } from '@angular/core';
import { SoniatComponent } from './components/ChatBot-Soniat/soniat/soniat.component';
import { MessageComponent } from './components/ChatBot-Soniat/message/message.component';
import { ConfigService } from './configuration/config.service';
import { environment } from '../environments/environment';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { interceptorProvider } from './components/interceptors/interceptor.service';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { SoniatPublicoComponent } from './components/ChatBot-Soniat/soniat-publico/soniat-publico.component';
import { RegisterUserComponent } from './components/usuario/register-user/register-user.component';
import { EditUserComponent } from './components/usuario/edit-user/edit-user.component';
import { ViewUserComponent } from './components/usuario/view-user/view-user.component';
import { AuthService } from './services/auth.service';
import { ChartsModule } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { NgFallimgModule } from 'ng-fallimg';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    InfiniteScrollModule,
    ChartsModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatTableModule,
    MatTabsModule,
    MatListModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    NgFallimgModule.forRoot({
      default: 'assets/avatar.png'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    HomeComponent,
    SoniatComponent,
    MessageComponent,
    SoniatPublicoComponent,
  ],

  entryComponents: [
    RegisterUserComponent,
    EditUserComponent,
    ViewUserComponent
  ],

  providers: [interceptorProvider, AuthService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    },
   ],
  bootstrap: [AppComponent]
})

export class AppModule { }
export class DemoMaterialModule { }
export function ConfigLoader(configService: ConfigService) {
  return () => configService.load(environment.baseUrl);
}
