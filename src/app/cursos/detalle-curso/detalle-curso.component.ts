import {Component, Input, OnInit} from '@angular/core';
import {Curso} from '../model/curso';
import {ActivatedRoute, Router} from '@angular/router';
import { CursoService } from '../service/curso.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrl: './detalle-curso.component.css'
})
export class DetalleCursoComponent implements OnInit{
  @Input() curso!: Curso;
  public cursos: Array<Curso> = [];
  public cursoSelected!: Curso;
  public selected: boolean = false;

  constructor(private route: ActivatedRoute,
              private cursoService: CursoService,
              private routherPath: Router
  ) {}

  ngOnInit(): void {
    // Obtener el id de la ruta
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Llamar al servicio para obtener el curso
      this.cursoService.getCurso(+id).subscribe((curso: Curso) => {
        this.curso = curso;
      });
    }
  }

  //Método para eliminar un curso seleccionado de la lista
  borrarCurso(curso: Curso) {
    Swal.fire({
      title: "Esta seguro?",
      text: "Usted no puede revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borra el curso!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoService.borrarCurso(curso.id).subscribe(() => { // Llama al servicio para eliminar el curso
          Swal.fire({
            title: "Eliminado!",
            text: "El curso ha sido eliminado.",
            icon: "success"
          });
          this.cursos = this.cursos.filter((c) => c !== curso); // Actualiza la lista de cursos en la vista
          this.routherPath.navigate(['/cursos/listar']);
        });
      }
    });
  }

  //Evento para llevar al formulario de editar curso
  onSelected(curso: Curso){
    this.cursoSelected = curso;
    this.selected = true;
    this.routherPath.navigate(['/cursos/editar/' + this.cursoSelected.id]);  //Dirige a la ruta /editar/:id

  }

  //Método para redireccionar a la ruta /listar
  onSelectedList(){
    this.routherPath.navigate(['/cursos/listar'])
  }

}
