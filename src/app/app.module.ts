import { PostsModule } from './user_view/modules/posts.module';
import { LoadingModule } from './user_view/modules/loading.module';
import { AppMessageModule } from './user_view/modules/app-message.module';
import { AuthModule } from './user_view/modules/auth.module';
import { ShareViewModule } from './user_view/shared/share-view.module';
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
    ShareViewModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    AppMessageModule,
    LoadingModule,
    PostsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
