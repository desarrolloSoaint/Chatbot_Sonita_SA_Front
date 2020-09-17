import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PaisComponent } from './lista/pais/pais.component';
import { MonedaComponent } from './lista/moneda/moneda.component';
import { GeneroComponent } from './lista/genero/genero.component';
import { ProfesionComponent } from './lista/profesion/profesion.component';
import { EstadoCivilComponent } from './lista/estado-civil/estado-civil.component';
import { EstadoComponent } from './lista/estado/estado.component';
import { ClientePublicoComponent } from './clientes/cliente-publico/cliente-publico.component';
import { ClientePrivadoComponent } from './clientes/cliente-privado/cliente-privado.component';
import { ClientePublicoModalComponent } from './clientes/cliente-publico/cliente-publico-modal/cliente-publico-modal.component';
import { ClientePublicoEditarComponent } from './clientes/cliente-publico/cliente-publico-editar/cliente-publico-editar.component';
import { RegisterUserComponent } from './usuario/register-user/register-user.component';
import { EstadoModalComponent } from './lista/estado-modal/estado-modal.component';
import { EstadoCivilModalComponent } from './lista/estado-civil-modal/estado-civil-modal.component';
import { PaisModalComponent } from './lista/pais-modal/pais-modal.component';
import { ProfesionModalComponent } from './lista/profesion-modal/profesion-modal.component';
import { MonedaModalComponent } from './lista/moneda-modal/moneda-modal.component';
import { GeneroModalComponent } from './lista/genero-modal/genero-modal.component';
import { EstadoEditComponent } from './lista/estado-edit/estado-edit.component';
import { EstadoCivilEditComponent } from './lista/estado-civil-edit/estado-civil-edit.component';
import { PaisEditComponent } from './lista/pais-edit/pais-edit.component';
import { ProfesionEditComponent } from './lista/profesion-edit/profesion-edit.component';
import { MonedaEditComponent } from './lista/moneda-edit/moneda-edit.component';
import { GeeneroEditComponent } from './lista/geenero-edit/geenero-edit.component';
import { EditUserComponent } from './usuario/edit-user/edit-user.component';
import { ViewUserComponent } from './usuario/view-user/view-user.component';
import { ImageUserComponent } from './sidebar/image-user/image-user.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { LookAndFeelComponent } from './look-and-feel/look-and-feel.component';
import { RolComponent } from './usuario/rol/rol.component';
import { EditRolComponent } from './usuario/rol/edit-rol/edit-rol.component';
import { RolModalComponent } from './usuario/rol/rol-modal/rol-modal.component';
import { ViewDataComponent } from './clientes/cliente-privado/view-data/view-data.component';
import { EditPrivateComponent } from './clientes/cliente-privado/edit-private/edit-private.component';
import { RegisterClientPrivateComponent } from './clientes/cliente-privado/register-client-private/register-client-private.component';
import { AimlComponent } from './aiml/aiml.component';
import { AimlTablaComponent } from './aiml/aiml-tabla/aiml-tabla.component';
import { AimlIfTablaComponent } from './aiml/aiml-if-tabla/aiml-if-tabla.component';
import { AimlEditarComponent } from './aiml/aiml-tabla/aiml-editar/aiml-editar.component';
import { AimlPostComponent } from './aiml/aiml-tabla/aiml-post/aiml-post.component';
import { AimlIfPostComponent } from './aiml/aiml-if-tabla/aiml-if-post/aiml-if-post.component';
import { AimlIfEditarComponent } from './aiml/aiml-if-tabla/aiml-if-editar/aiml-if-editar.component';
import { ModaltiemresComponent } from './historial/timeresp/modaltiemres/modaltiemres.component';
import { NgFallimgModule } from 'ng-fallimg';
import { EncuestaComponent } from './ChatBot-Soniat/encuesta/encuesta.component';
@NgModule({
  imports: [
    NgFallimgModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTabsModule,
    MatChipsModule,
    MatMenuModule,
    MaterialFileInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatCheckboxModule,

  ],

  declarations: [
    NavbarComponent,
    SidebarComponent,
    PaisComponent,
    MonedaComponent,
    GeneroComponent,
    ProfesionComponent,
    EstadoCivilComponent,
    EstadoComponent,
    ClientePublicoComponent,
    ClientePrivadoComponent,
    RegisterUserComponent,
    EstadoModalComponent,
    EstadoCivilModalComponent,
    PaisModalComponent,
    ProfesionModalComponent,
    MonedaModalComponent,
    GeneroModalComponent,
    EstadoEditComponent,
    EstadoCivilEditComponent,
    PaisEditComponent,
    ProfesionEditComponent,
    MonedaEditComponent,
    GeeneroEditComponent,
    ClientePublicoModalComponent,
    ClientePublicoEditarComponent,
    EditUserComponent,
    ViewUserComponent,
    ImageUserComponent,
    LookAndFeelComponent,
    ChatbotComponent,
    RolComponent,
    EditRolComponent,
    RolModalComponent,
    ModaltiemresComponent,


    ViewDataComponent,
    EditPrivateComponent,
    RegisterClientPrivateComponent,


    AimlComponent,
    AimlTablaComponent,
    AimlIfTablaComponent,
    AimlEditarComponent,
    AimlPostComponent,
    AimlIfPostComponent,
    AimlIfEditarComponent,
    EncuestaComponent,
  ],

  exports: [
    NavbarComponent,
    SidebarComponent,
    LookAndFeelComponent
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class ComponentsModule { }
