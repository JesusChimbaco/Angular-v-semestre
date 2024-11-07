import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ListarCursoComponent} from './listar-curso/listar-curso.component';
import {CrearCursoComponent} from './crear-curso/crear-curso.component';
import {DetalleCursoComponent} from './detalle-curso/detalle-curso.component';
import {EditarCursoComponent} from './editar-curso/editar-curso.component';

const routes: Routes = [
  {
    path: '',
    component: ListarCursoComponent
  },
  {
    path: 'listar',
    component: ListarCursoComponent
  },
  {
    path: 'crear',
    component: CrearCursoComponent
  },
  {
    path: 'detalle/:id',
    component: DetalleCursoComponent
  },
  {
    path: 'editar/:id',
    component: EditarCursoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursoRoutingModule { }
