import { TecladoVirtual, TecladoFisico } from "../model/Keyboard.js";
import { Aulas } from "../model/Aulas.js";



export class ControllerKeyboard{
  constructor(){
    this.class_aulas = new Aulas();
    this.teclado_virtual = new TecladoVirtual();
  }

  createKeyboardVirtual(element){
    let modelo = element.classList[1];
    let aula = element.classList[2];
    let local = element.id;
    this.teclado_virtual.showTeclado(modelo, aula, local)
  }

  touchMove(element){
    this.teclado_virtual.playAudio(element)
    this.class_aulas.showNote(element);
  }

  touchStart(evt){
    const event = evt.target;
    this.teclado_virtual.playAudio(event)
    this.class_aulas.showNote(event);
  }

}