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
  constructor(private cursoService: CursoService, private routherPath: Router, private router: ActivatedRoute) {}

  //Método que se ejecuta al iniciar el componente
  ngOnInit(): void{
    this.cursoService.getCursos().subscribe(
      (cursos: Array<Curso>) =>{
        this.cursos = cursos;
      }
    );
  }

  //Evento para disparar al seleccionar un curso de la lista
  onSelected(curso: Curso){
    this.cursoSelected = curso;
    this.selected = true;
    this.routherPath.navigate(['/editar/' + this.cursoSelected.id]);  //Dirige a la ruta /editar/:id

  }

  //Método para redireccionar a la ruta /crear
  crearCurso(){
    this.routherPath.navigate(['/crear'])
  }

}
