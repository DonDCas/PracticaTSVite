import type { Categoria, Question } from "../interfaces/Question";
//import { getImagenPorCategoria } from "../services/Service_Images";

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
        const div : HTMLElement = document.createElement("div");
        div.id = 'divPreguntas';
        const form : HTMLElement = document.createElement("form");
        form.id = 'formPreguntas';
        preguntas.forEach((pregunta, index : number)=> {
            const labelPregunta : HTMLElement = document.createElement("label")
            const leyendPregunta : HTMLElement = document.createElement('legend')
            leyendPregunta.textContent = `Pregunta nº${index+1}`
            labelPregunta.appendChild(leyendPregunta);
            const divPregunta : HTMLElement = document.createElement("div");
            divPregunta.className = 'divPregunta';
            divPregunta.textContent = pregunta.question;
            const divImagenPorCategoria : HTMLElement = document.createElement("div");
            
            const divRespuestas : HTMLElement = document.createElement("div");
            divRespuestas.className = 'divRespuestas';
            const respuestas : string[] = [...pregunta.incorrect_answers];
            respuestas.push(pregunta.correct_answer);
            respuestas.sort(() => Math.random() - 0.5); // Mezclar respuestas
            for (const respuesta of respuestas){
                const inputRespuesta : HTMLInputElement = document.createElement("input");
                inputRespuesta.type = 'radio';
                inputRespuesta.name = `pregunta${index}`;
                inputRespuesta.value = respuesta;
                inputRespuesta.id = `pregunta${index}_respuesta_${respuesta}`;
                inputRespuesta.textContent = respuesta;
                divRespuestas.appendChild(inputRespuesta);
            }
            divImagenPorCategoria.className = 'divImagenCategoria';
            labelPregunta.appendChild(divPregunta);
            labelPregunta.appendChild(divImagenPorCategoria);
            labelPregunta.appendChild(divRespuestas);
            form.appendChild(labelPregunta);
        }); 
        const submitButton : HTMLButtonElement = document.createElement("button");
        submitButton.type = 'button';
        submitButton.id = 'btnEnviarRespuestas';
        submitButton.textContent = 'enviar Respuestas';
        form.appendChild(submitButton);
        div.appendChild(form)
        return div;
    }
}