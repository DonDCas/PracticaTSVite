import type { Categoria, Question } from "../interfaces/Question";

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

    static crearBateriaPreuntas(preguntas: Question[]): HTMLElement {
        const contenedorPreguntas : HTMLElement = document.createElement('div');
        contenedorPreguntas.id = 'contenedorPreguntas';
        preguntas.forEach( (pregunta: Question, index: number) => {
            const preguntaDiv : HTMLElement = document.createElement('div');
            preguntaDiv.className = 'pregunta';
            preguntaDiv.innerHTML = `<h3>Pregunta ${index + 1}:</h3>
                                     <p>${pregunta.question}</p>
                                     <p><strong>Respuesta correcta:</strong> ${pregunta.correct_answer}</p>`;
            contenedorPreguntas.appendChild(preguntaDiv);
        })
        return contenedorPreguntas
    }
}