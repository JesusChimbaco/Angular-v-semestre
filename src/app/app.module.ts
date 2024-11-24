import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FacultadesComponent } from './facultades/facultades.component';
import {RouterModule} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {CursoService} from './cursos/service/curso.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FacultadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: [provideHttpClient(), CursoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
