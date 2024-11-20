import {Component, OnInit} from '@angular/core';
import {Curso} from '../model/curso';
import {ActivatedRoute, Router} from '@angular/router';
import {CursoService} from '../service/curso.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrl: './detalle-curso.component.css'
})
export class DetalleCursoComponent implements OnInit{
    public cursos: Array<Curso> = [];
    curso!: Curso;

    constructor(private route: ActivatedRoute, private router: Router, private cursoService: CursoService) {}

     ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.cursoService.getCurso(id).subscribe(data => this.curso = data);
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
        });
      }
    });
  }

}
