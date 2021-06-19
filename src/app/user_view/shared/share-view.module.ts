import { PostCreateComponent } from './../components/post/post-create/post-create.component';
import { PostContainerComponent } from './../components/post/post-container/post-container.component';
import { HomeComponent } from './../components/home/home.component';
import { PaneMenuComponent } from './layout/pane-menu/pane-menu.component';
import { LoginComponent } from './../components/auth/login/login.component';
import { AuthWithSocialComponent } from './../components/auth/auth-with-social/auth-with-social.component';
import { RegisterComponent } from './../components/auth/register/register.component';
import { ModalComponent } from './layout/modal/modal.component';
import { DrawerComponent } from './layout/drawer/drawer.component';
import { ShareAntUiModule } from './share-ant-ui.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { DefaultComponent } from './../pages/default/default.component';
import { HeaderComponent } from './layout/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AuthWithSocialComponent,
    RegisterComponent,
    DrawerComponent,
    ModalComponent,
    PaneMenuComponent,
    HomeComponent,
    PostContainerComponent,
    PostCreateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ShareAntUiModule,
  ],
  exports: [
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DrawerComponent,
    ModalComponent,
    PaneMenuComponent,
    HomeComponent,
    PostContainerComponent,
    PostCreateComponent,
  ]
})
export class ShareViewModule { }
