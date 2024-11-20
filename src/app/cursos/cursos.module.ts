import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearCursoComponent } from './crear-curso/crear-curso.component';
import { DetalleCursoComponent } from './detalle-curso/detalle-curso.component';
import { ListarCursoComponent } from './listar-curso/listar-curso.component';
import { EditarCursoComponent } from './editar-curso/editar-curso.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CursoRoutingModule} from './curso-routing.module';



@NgModule({
  declarations: [
    CrearCursoComponent,
    DetalleCursoComponent,
    ListarCursoComponent,
    EditarCursoComponent
  ],
  exports: [
    ListarCursoComponent
  ],
  imports: [
  ]
})
