import type{ Question } from "../interfaces/Question";
import type{ Categoria } from "../interfaces/Question";
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
        const url = `${URL_QUESTIONS.replace(/\/$/, '')}/api.php?${params.toString()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al obtener las preguntas');
        const data = await res.json();
        if (data.response_code !== 0) {
            console.warn('⚠️ Sin resultados para esos filtros. Código:', data.response_code);
            return [];
        }
        return data.results as Question[];
}

export async function obtenerCategorias(): Promise<Categoria[]> {
    const res = await fetch(`${URL_QUESTIONS}/api_category.php`);
    if (!res.ok) throw new Error('Error al obtener las categorías');
    
    const data = await res.json();
    return data.trivia_categories.map((cat: Categoria) => ({
        id: cat.id,
        name: cat.name
    }));
}


export function obtenerDificultades(): typeof Difficulty {
    return Difficulty
}

export function obtenerTipos(): typeof TypeKind { return TypeKind }