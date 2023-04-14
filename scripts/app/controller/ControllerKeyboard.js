import { Midi } from "../model/Midi.js";
import { TecladoVirtual, TecladoFisico, key, position } from "../model/Keyboard.js";
import { Aulas } from "../model/Aulas.js";
import { Repository } from "./Repository.js";


export class ControllerKeyboard{
  constructor(){
    this.midi = new Midi();
    this.teclado_virtual = new TecladoVirtual();
    this.teclado_fisico = new TecladoFisico();
    this.aulas = new Aulas();
    this.repository = new Repository();
  }

  createKeyboardVirtual(element){
    let modelo = element.classList[1];
    let aula = element.classList[2];
    let local = element.id;
    this.teclado_virtual.showTeclado(modelo, aula, local)
  }

  touchMove(infoKey){
    this.touchEnd()
    infoKey.element.classList.add('keyOn');
    this.teclado_virtual.playAudio(infoKey.dataAudio)
    this.aulas.learn(infoKey);
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
      input.addEventListener('midimessage', input=> {
        this.midi.updateKeys(input)
        this.repository.getRepo('_info')
        const infoKey = {
          position: position,
          content: key,
          parent: this.repository.objLocal[0].aula
        }
        if(input.data[0]==144) this.aulas.learn(infoKey)
      });
    })
  }

}

// Mostrar teclado virtual
const aulas = document.querySelectorAll('.aula');
aulas.forEach(element=>{
  new ControllerKeyboard().createKeyboardVirtual(element)
})
