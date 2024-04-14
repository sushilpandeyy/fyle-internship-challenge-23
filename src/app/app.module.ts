import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { CardComponent } from './card/card.component';
import { ProfileComponent } from './profile/profile.component';
import { ReposkeltonComponent } from './reposkelton/reposkelton.component';
import { ProfileskeltonComponent } from './profileskelton/profileskelton.component';
import { UserNotFoundComponent } from './user-not-found/user-not-found.component';
import { DefaultComponent } from './default/default.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ProfileComponent,
    ReposkeltonComponent,
    ProfileskeltonComponent,
    UserNotFoundComponent,
    DefaultComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
