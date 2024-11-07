import { Component, OnInit } from '@angular/core';
import {Curso} from "../model/curso";
import {CursoService} from "../service/curso.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit{
  public cursos: Array<Curso> = [];
  public nombreCurso!: string;
  public cursoSelected!: Curso;
  public selected: boolean = false;


  //Inyeccion de dependencias del servicio
  constructor(private cursoService: CursoService, private routherPath: Router, private router: ActivatedRoute) {
    this.cursoService.getCursos().subscribe(
      (cursos: Array<Curso>) =>{
        this.cursos = cursos;
      }
    );
  }

  //Método que se ejecuta al iniciar el componente
  ngOnInit(): void{

  }

  //Evento para disparar al seleccionar un curso de la lista
  onSelected(curso: Curso){
    this.cursoSelected = curso;
    this.selected = true;
    this.routherPath.navigate(['/editar/' + this.cursoSelected.id]);  //Dirige a la ruta /editar/:id

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
        //this.cursoService.borrarCurso(curso.id).subscribe(() => { // Llama al servicio para eliminar el curso
        Swal.fire({
          title: "Eliminado!",
          text: "El curso ha sido eliminado.",
          icon: "success"
        });
        this.cursos = this.cursos.filter((c) => c !== curso); // Actualiza la lista de cursos en la vista
        //});
      }
    });
  }

  //Método para redireccionar a la ruta /crear
  crearCurso(){
    this.routherPath.navigate(['/crear'])
  }

}
