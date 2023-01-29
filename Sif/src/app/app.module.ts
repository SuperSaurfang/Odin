import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ENV, getEnv } from 'src/environments/environemnt.provider';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: ENV, useFactory: getEnv }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIconPacks(fas, far, fab);
  }
}
