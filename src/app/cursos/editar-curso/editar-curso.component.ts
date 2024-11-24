import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CursoService} from "../service/curso.service";
import {Curso} from "../model/curso";
import Swal from "sweetalert2";

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit{

  //Creamos e inicializamos el formulario editarCursoForm usando un constructor FormGroup
  public editarCursoForm: FormGroup = new FormGroup({
    id: new FormControl('',[Validators.required,Validators.minLength(4)]),
    nombre_curso: new FormControl('', [Validators.required,Validators.minLength(4)]),
    descripcion_curso: new FormControl('', [Validators.required,Validators.minLength(4)]),
    nombre_docente: new FormControl('', [Validators.required,Validators.minLength(4)])

  });

  //Creamos un atributo curso que es el que va a ser editado
  public curso!: Curso;

  //Constructor
  constructor(public router: Router, public formBuilder: FormBuilder, private cursoService: CursoService, private route: ActivatedRoute) {
  }

  //Método para cancelar edicion de un curso
  cancelarEditarCurso(){
    this.router.navigate(['/cursos/listar']);  //Redirecciona a la ruta /listar
  }

  //Método que edita un curso en el servicio
  editarCurso(curso: Curso){
    this.cursoService.editarCurso(curso).subscribe(   //Le decimos que edite el curso
      (curso: Curso) =>{
        Swal.fire(   //Se le dice al usuario que el curso ha sido editado
          'Curso editado',
          `El curso ${curso.nombre_curso} ha sido actualizado con exito`,
          'success'
        );
        this.router.navigate(['/cursos/listar']);  //Redirecciona a la ruta /listar
      });
  }

  //Método que se ejecuta al iniciar
  ngOnInit(): void{
    const idCurso = parseInt(this.route.snapshot.params['id']);   //Se obtiene el id del curso a editar

    this.cursoService.getCurso(idCurso).subscribe((curso) => {  //Llamamos al servicio para editar el curso
      this.curso = curso;   //Obtenemos el curso a editar
      this.editarCursoForm = this.formBuilder.group({    //Se crea el formulario
        id: [this.curso.id, []],   //Mostramos el id del curso, el cual no se puede editar
        nombre_curso: [this.curso.nombre_curso, [Validators.required, Validators.minLength(4)]],   //Mostramos el nombre del curso
        descripcion_curso: [this.curso.descripcion_curso, [Validators.required, Validators.minLength(4)]],   //Mostramos la descripcion del curso
        nombre_docente: [this.curso.nombre_docente, [Validators.required, Validators.minLength(4)]]     //Mostramos el nombre del docente
      });
    });
  }

}
