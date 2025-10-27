import type { Categoria, Question } from "../interfaces/Question";
import { getImagenPorCategoria } from "../services/Service_Images";

export class DOMController{

    static crearSelectTipos(tipos: string[]): HTMLSelectElement {
        const selectTipo : HTMLSelectElement | null  = document.createElement('select');
        selectTipo.id = 'selectTipo';
        const anyOption : HTMLOptionElement | null  = document.createElement('option');
        anyOption.value = ''; // Valor vacío significa "cualquier tipo"
        anyOption.text = 'Any Type';
        selectTipo.appendChild(anyOption);
        for (const tipo of tipos){
            const option : HTMLOptionElement = document.createElement('option');
            option.value = tipo;
            option.text = tipo;
            selectTipo.appendChild(option);
        }
        return selectTipo;
    }

    static crearFormularioPreguntas(categorias: Categoria[]): HTMLElement {
        const selectCategoria : HTMLSelectElement = document.createElement('select');
        selectCategoria.id = 'selectCategoria';
        const anyOption : HTMLOptionElement  = document.createElement('option');
        anyOption.value = ''; // Valor vacío significa "sin categoría"
        anyOption.text = 'Any Category'; 
        selectCategoria.appendChild(anyOption);
        
        for (const categoria of categorias) {
            const option : HTMLOptionElement  = document.createElement('option');
            option.value = categoria.id.toString();
            option.text = categoria.name;
            selectCategoria.appendChild(option);
        }
        
        return selectCategoria;
    }

    static crearSelectDificultades(dificultades: string[]): HTMLElement {
        const selectDificultad: HTMLSelectElement  = document.createElement('select');
        selectDificultad.id = 'selectDificultad';
        const anyOption : HTMLOptionElement = document.createElement('option');
        anyOption.value = ''; // Valor vacío significa "cualquier dificultad"
        anyOption.text = 'Any Difficulty';
        selectDificultad.appendChild(anyOption);
        
        for (const dificultad of dificultades) {
            const option : HTMLOptionElement = document.createElement('option');
            option.value = dificultad;
            option.text = dificultad;
            selectDificultad.appendChild(option);
        }
        return selectDificultad;
    }

    static crearBateriaPreguntas(preguntas: Question[]): HTMLElement {
    const contenedorPreguntas : HTMLElement = document.createElement('div');
    for (const pregunta of preguntas) {
        const divPregunta : HTMLElement = document.createElement('div');
        divPregunta.className = 'pregunta';
        const tituloPregunta : HTMLElement = document.createElement('h3');
        tituloPregunta.textContent = pregunta.question;
        divPregunta.appendChild(tituloPregunta);
        contenedorPreguntas.appendChild(divPregunta);
    }
    return contenedorPreguntas;
}
}