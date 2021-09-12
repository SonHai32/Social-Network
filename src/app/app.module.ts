import { NzImageService, NzImageModule } from 'ng-zorro-antd/image';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { AppLoadingCompModule } from './social-network/modules/layout/app-loading-comp.module';
import { CoreCompModule } from './social-network/modules/core/core-comp.module';
import { CoreRoutingModule } from './social-network/routing/core/core-routing.module';
import { PostsCompModule } from './social-network/modules/post/posts-comp.module';
import { CovidCoreModule } from './covid-feature/covid-core.module';
import { LoadingModule } from './social-network/modules/loading.module';
import { AppMessageModule } from './social-network/modules/app-message.module';
import { AuthModule } from './social-network/modules/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production, autoPause: true}),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CoreRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    AppMessageModule,
    LoadingModule,
    // PostsCompModule,
    CoreCompModule,
    AppLoadingCompModule,
    NzMessageModule,
    NzNotificationModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
