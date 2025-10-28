import type { Categoria, Question } from "../interfaces/Question";
import { DOMController } from "./DOMController";
import * as Service_Question from "../services/Service_Question";

// Cuando se elijan las opciones para las preguntas y se pulse el botón de las preguntas se generá una bateria de preguntas con estas opciones
export class AppControler{
    async generarContenedorPreguntas(contenedor: HTMLElement): Promise<void> {
        const selectCategoria = document.getElementById('selectCategoria') as HTMLSelectElement;
        const selectDificultad = document.getElementById('selectDificultad') as HTMLSelectElement;
        const selectTipo = document.getElementById('selectTipo') as HTMLSelectElement;
        let categoriaSelect : string = selectCategoria?.value ?? '';
        let dificultadSelect : string = selectDificultad?.value ?? '';
        let tipoSelect : string = selectTipo?.value ?? '';
        let preguntas : Question[] = await Service_Question.getPreguntas(
        '10',
        categoriaSelect,
        dificultadSelect,
        tipoSelect
        )
        contenedor.appendChild(DOMController.crearBateriaPreguntas(preguntas));
        let buttonEnviarRespuestas : HTMLElement | null = document.getElementById('btnEnviarRespuestas');
        buttonEnviarRespuestas?.addEventListener('click', () => {
            alert('Respuestas enviadas. ¡Gracias por participar!');
            let formPreguntas : HTMLElement | null = document.getElementById('formPreguntas');
            if (formPreguntas) {
                const respuestas: { [key: string]: string } = {};
                const radios: HTMLInputElement[] = Array.from(formPreguntas.querySelectorAll('input[type="radio"]:checked'));;
                radios.forEach(radio => {
                    const preguntaId = radio.name;
                    const respuesta = radio.value;
                    respuestas[preguntaId] = respuesta;
                });
                let puntuacion : number = 0;
                preguntas.forEach((pregunta, index) => {
                    if (respuestas[`pregunta${index}`] === pregunta.correct_answer) puntuacion++;
                });
                alert(`Has obtenido una puntuación de ${puntuacion} sobre ${preguntas.length}`);
            }
        });
    }
    //Cuando se pulse el botón "Hacer preguntas" se genera un formulario para elegir, categoria, dificultad y tipo de pregunta
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
        const buttonOpciones : HTMLButtonElement | null  = document.createElement('button');
        buttonOpciones.type= 'button'
        buttonOpciones.id = 'buttonOpciones';
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

    async obtenerCategorias(): Promise<Categoria[]> {
        return await Service_Question.obtenerCategorias();
    }
}