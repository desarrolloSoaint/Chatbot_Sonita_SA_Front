import { Routes } from '@angular/router';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from 'app/components/usuario/table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from 'app/components/historial/icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginComponent } from 'app/components/login/login.component';
import { ChatbotComponent } from 'app/components/chatbot/chatbot.component';
import { RolComponent } from 'app/components/usuario/rol/rol.component';
import { AimlComponent } from 'app/components/aiml/aiml.component';
import { GuardService as guard } from 'app/guards/guard.service';

export const AdminLayoutRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'lists', component: UserProfileComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'users', component: TableListComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'clients', component: TypographyComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'history', component: IconsComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'aiml', component: AimlComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'maps', component: MapsComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'notifications', component: NotificationsComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'upgrade', component: UpgradeComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'chatbot', component: ChatbotComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'rol',        component: RolComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
];
