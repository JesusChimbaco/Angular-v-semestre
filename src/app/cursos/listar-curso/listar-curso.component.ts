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


  //Inyeccion de dependencias
  constructor(private cursoService: CursoService, private routherPath: Router) {}

  //Método que se ejecuta al iniciar el componente
  ngOnInit(): void{
    this.cursoService.getCursos().subscribe(
      (cursos: Array<Curso>) =>{
        this.cursos = cursos;
      }
    );
  }


  //Evento para llevar a detalle curso
  onSelectedDetail(curso: Curso){
    this.cursoSelected = curso;
    this.selected = true;
    this.routherPath.navigate(['/cursos/detalle/' + this.cursoSelected.id]);  //Dirige a la ruta /detalle/:id

  }

  //Método para redireccionar a la ruta /crear
  crearCurso(){
    this.routherPath.navigate(['/cursos/crear'])
  }

  protected readonly Curso = Curso;

}
