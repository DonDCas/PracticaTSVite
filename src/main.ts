import './style/style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { AppControler } from './app/appControler.ts'

const body : HTMLElement = document.body;
const appController : AppControler = new AppControler();
const bottonHacerPregunta : HTMLElement | null = document.getElementById('hacerPregunta');
let contenedor : HTMLElement | null = document.getElementById('contenedor');

bottonHacerPregunta?.addEventListener('click', () => {
  cargarFormularioPreguntas();
});

async function cargarFormularioPreguntas() {
  let divFormulario : HTMLElement | null = document.getElementById('formularioPreguntas');
  divFormulario!.innerHTML = '';
  divFormulario!.appendChild(await appController.generarFomularioPreguntas());
  body!.appendChild(divFormulario!);
}

async function cargarPreguntas() {
  contenedor!.innerHTML = '';
  body.appendChild(await appController.generarContenedorPreguntas(contenedor!));
}
