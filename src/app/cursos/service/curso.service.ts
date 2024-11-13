import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Curso} from "../model/curso";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private baseUrl: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {

  }

  //Método para obtener los cursos

  getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(this.baseUrl + "/api/v1/curso-service/cursos")
      .pipe(
        map((result: any) => {
          //console.log(result._embedded./*directorio*/);
          return result;
        }));
  }


  //Método para obtener un curso por id

  getCurso(idCurso: number): Observable<Curso> {
    return this.httpClient.get<Curso>(this.baseUrl + '/api/v1/curso-service/cursos/{id}' + idCurso);
  }

  //Metodo para eliminar curso por id
  borrarCurso(idCurso: number): Observable<any>{
    return this.httpClient.delete(this.baseUrl + "/api/v1/curso-service/cursos/{id}" + idCurso);
  }

  //Metodo para crear curso
  crearCurso(curso: Curso): Observable<Curso>{
    return this.httpClient.post<Curso>(`${this.baseUrl}/api/v1/curso-service/curso`, curso);
  }
}
