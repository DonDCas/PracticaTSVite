/*import './style/style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'*/
import { AppControler } from './app/appControler.ts'

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
  let button : HTMLElement | null = document.getElementById('buttonOpciones');
  button?.addEventListener('click', () => cargarPreguntas());
  //body!.appendChild(divFormulario!);
}

async function cargarPreguntas() {
  await appController.generarContenedorPreguntas(contenedor!);
}
