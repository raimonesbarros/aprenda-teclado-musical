import { Midi } from "../model/Midi.js";
import { TecladoVirtual, TecladoFisico } from "../model/Keyboard.js";
import { Aulas } from "../model/Aulas.js";

export class ControllerKeyboard{
  constructor(){
    this.midi = new Midi();
    this.teclado_virtual = new TecladoVirtual();
    this.aulas = new Aulas();
  }

  createKeyboardVirtual(element){
    let modelo = element.classList[1];
    let aula = element.classList[2];
    let local = element.id;
    this.teclado_virtual.showTeclado(modelo, aula, local)
  }

  touchMove(element){
    this.touchEnd()
    element.classList.add('keyOn');
    this.teclado_virtual.playAudio(element)
    this.aulas.showNote(element);
  }

  touchStart(element){
    this.teclado_virtual.playAudio(element)
    this.aulas.showNote(element);
    element.classList.add('keyOn')
  }

  touchEnd(){
    let buttons = document.querySelectorAll('.keyboard button');
    buttons.forEach(button=>button.classList.remove('keyOn'));
  }

  midiFailure(){ this.midi.failure();}

  midiSuccess(midiAccess){
    midiAccess.addEventListener('statechange', state=> this.midi.updateDevices(state));

    const inputs = midiAccess.inputs;
    inputs.forEach(input => {
      input.addEventListener('midimessage', input=> this.midi.updateKeys(input));
    })
  }

}
