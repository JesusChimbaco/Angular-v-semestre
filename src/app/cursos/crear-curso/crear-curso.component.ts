import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Curso} from "../model/curso";
import {CursoService} from "../service/curso.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrl: './crear-curso.component.css'
})
export class CrearCursoComponent implements OnInit{
  public crearCursoForm: FormGroup = new FormGroup({
    nombre_curso: new FormControl('', [Validators.required, Validators.minLength(4)]),
    descripcion_curso: new FormControl('', [Validators.required, Validators.minLength(10)]),
    nombre_docente: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

//Constructor del componente
  constructor(public router: Router, public formBuilder: FormBuilder, private cursoService: CursoService) {

  }

  //Método para cancelar el método crear
  cancelarCrearCurso(){
    this.router.navigate(['/cursos/listar']);   //Redirecciona a la ruta /listar
  }

  //Método para crear un curso en el servicio
  crearCurso(curso: Curso){
    this.cursoService.crearCurso(curso).subscribe(
      (curso: Curso) =>{
        Swal.fire(
          'Curso creado',
          `El curso ${curso.nombre_curso} ha sido creado con exito`,
          'success'
        );
        this.crearCursoForm.reset();   //Reinicia el formulario
        this.router.navigate(['/cursos/listar']);
      });
  }

  ngOnInit(): void{
    this.crearCursoForm = this.formBuilder.group({
      nombre_curso: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      descripcion_curso: ['', [Validators.required, Validators.minLength(4)]],
      nombre_docente: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
}
