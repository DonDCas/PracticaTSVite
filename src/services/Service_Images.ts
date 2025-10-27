import type { Imagen } from "../interfaces/imagen"

const apiKey = 'ql0AYP3K6QwEnD6CRKtCthMPmKnldIBUcnH339DIPsCZv1IHJOahIk7x'
const urlBase = 'https://api.pexels.com/v1/search?query='

export async function getImagenPorCategoria(categoria: string): Promise<string> {
    const urlFinal = `${urlBase}${encodeURIComponent(categoria)}&per_page=1`;
    const response = await fetch(urlFinal, {
        headers:{
            Authorization: apiKey
        }
    });
    if (!response.ok) {
        throw new Error('Error al obtener la imagen');
    }
    const data = await response.json();
    const imagenes: Imagen[] = data.photos;
    if (imagenes.length === 0) {
        throw new Error('No se encontraron imágenes para la categoría especificada');
    }

    return imagenes[0].src.medium;
}