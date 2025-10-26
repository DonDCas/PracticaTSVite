import type { Question } from "../interfaces/Question";
import { DOMController } from "./DOMController";
import * as Service_Question from "../services/Service_Question";

export class AppControler{
    async generarContenedorPreguntas(contenedor: HTMLElement): Promise<HTMLElement> {
        const selectCategoria = document.getElementById('selectCategoria') as HTMLSelectElement;
        const selectDificultad = document.getElementById('selectDificultad') as HTMLSelectElement;
        const selectTipo = document.getElementById('selectTipo') as HTMLSelectElement;
        let categoriaSelect : string = selectCategoria?.value ?? '';
        let dificultadSelect : string = selectDificultad?.value ?? '';
        let tipoSelect : string = selectTipo?.value ?? '';
        contenedor.appendChild( 
            await Service_Question.getPreguntas('10', categoriaSelect, dificultadSelect, tipoSelect).
            then( (preguntas: Question[]) => DOMController.crearBateriaPreuntas(preguntas))
        );
        
        return contenedor;
    }
    async generarFomularioPreguntas(): Promise<HTMLElement> {
        const formulario : HTMLElement | null = document.createElement('form');
        formulario.id = 'formularioOpciones';
        // Agregamos al formulario el select de categorias
        formulario.appendChild(await this.obtenerCategorias().then(categorias => DOMController.crearFormularioPreguntas(categorias)));
        formulario.appendChild(document.createElement('br'));
        //Agregamos al formulario el select de dificultades
        formulario.appendChild(DOMController.crearSelectDificultades(this.obtenerDificultades()));
        formulario.appendChild(document.createElement('br'));
        // Agregamos al formulario el select de tipos
        formulario.appendChild(DOMController.crearSelectTipos(this.obtenerTipos()));
        formulario.appendChild(document.createElement('br'));
        const buttonOpciones : HTMLElement | null  = document.createElement('button');
        buttonOpciones.id = 'buttonOpciones';
        buttonOpciones.setAttribute('onclick', 'cargarPreguntas()');
        buttonOpciones.textContent = 'Elegir opciones';
        formulario.appendChild(buttonOpciones);
        formulario.appendChild(document.createElement('br'));
        return formulario;
    }
    
    obtenerDificultades(): string[] {
        return Object.values(Service_Question.obtenerDificultades());
    }

    obtenerTipos(): string []{
        return Object.values(Service_Question.obtenerTipos());
    }

    async obtenerCategorias(): Promise<string[]> {
        return await Service_Question.obtenerCategorias();
    }
}