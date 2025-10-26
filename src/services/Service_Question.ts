import type{ Question } from "../interfaces/Question";
import { Difficulty } from '../interfaces/Question';
import { TypeKind } from '../interfaces/Question';
import "../style/style.css";

const URL_QUESTIONS:string = 'https://opentdb.com'
    
export async function getPreguntas(
        cantidad:string = '50',
        categoria? :string, 
        dificultad? : string, 
        tipo? : string
    ): Promise<Question[]>{
    const params = new URLSearchParams({amount: cantidad});
    if (categoria) params.append('category', categoria);
    if (dificultad) params.append('difficulty', dificultad);
    if (tipo) params.append('type', tipo);
    const res = await fetch(URL_QUESTIONS+'/api.php?'+params.toString());
    if (!res.ok) throw new Error('Error al obtener las preguntas');
    const data = await res.json();
    return data.results as Question[];
}

export async function obtenerCategorias(): Promise<string[]> {
    const res = await fetch(`${URL_QUESTIONS}/api_category.php`);
    if (!res.ok) throw new Error('Error al obtener las categorías');
    const data = await res.json();
    return data.trivia_categories.map((cat: { name: string; }) => cat.name);
}


export function obtenerDificultades(): typeof Difficulty {
    return Difficulty
}

export function obtenerTipos(): typeof TypeKind { return TypeKind }