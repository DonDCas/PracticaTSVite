import type{ Question } from "../interfaces/Question";
import type{ Categoria } from "../interfaces/Question";
import { Difficulty } from '../interfaces/Question';
import { TypeKind } from '../interfaces/Question';
import "../style/style.css";

const URL_QUESTIONS:string = 'https://opentdb.com'
    
export async function getPreguntas(
    cantidad: string = '50',
    categoria?: string, 
    dificultad?: string, 
    tipo?: string
): Promise<Question[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.append('amount', cantidad);
    if (categoria) params.append('category', categoria);
    if (dificultad) params.append('difficulty', dificultad);
    if (tipo) params.append('type', tipo);
    let urlFinal : string = `${URL_QUESTIONS}/api.php?${params.toString()}`;
    let res: Response;
    try{
        res = await fetch(urlFinal);
        if (!res.ok) throw new Error('Error al obtener las preguntas');

    } catch (error) {
        alert("No se han podido cargar las preguntas. Inténtelo de nuevo más tarde.");
        return [];
    }
    const data = await res.json();
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