import { aulas } from "../../aulas.js";
export { TecladoVirtual, TecladoFisico };
import { Aulas } from "../../aulas.js";

const audio = {
  bemois: ['Db', 'Eb', 'none', 'Gb', 'Ab', 'Bb', 'none'],
  naturais: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
};

class TecladoVirtual{
  constructor(){
    this.modelo = '';
    this.aula = '';
    this.local = '';
  }

  showTeclado(modelo, aula, local){
    this.aula   = aula;
    this.modelo = modelo;
    this.local  = document.querySelector(`#${local} .keyboard`);
    if(this.modelo=='tm1' && aulas[this.aula]){
      this.createOctave(this.aula)
    }
    if(this.modelo=='tm2' && aulas[this.aula]){
      this.createOctave(this.aula, 2)
      this.createOctave(this.aula)
    }
  }

  touchKey(event){
    this.playAudio(event)
  }

  playAudio(event){
    let dataAudio = event.dataset.audio;
    let audio = new Audio(`audio/piano-mp3/${dataAudio}.mp3`);
    audio.play()
  }

  createOctave(textContent, numOctave){
    textContent = textContent || null;
    numOctave = numOctave || 3;
    let octave = document.createElement('div');
    let blacks = document.createElement('div');
    let whites = document.createElement('div');
    octave.setAttribute('class', 'octave');
    blacks.setAttribute('class', 'blacks');
    whites.setAttribute('class', 'whites');
    for (let i=0;i<audio.bemois.length;i++) {
      const el = audio.bemois[i];
      let button = document.createElement('button');
      if(el=='none'){
        button.setAttribute('class', 'none') 
      } else{
        button.innerText = aulas[textContent][0][i];
        button.setAttribute('data-audio', el+numOctave);
      }
      blacks.appendChild(button);
    }
    for (let i=0;i<audio.naturais.length;i++) {
      const el = audio.naturais[i];
      let button = document.createElement('button');
      if(el=='none'){
        button.setAttribute('class', 'none') 
      } else{
        button.innerText = aulas[textContent][1][i];
        button.setAttribute('data-audio', el+numOctave);
      }
      whites.appendChild(button);
    }
    octave.appendChild(whites);
    octave.appendChild(blacks);
    this.local.appendChild(octave);
  }
}

let chord = [];
class TecladoFisico{
  constructor(comando, nota, forca){
    this.comando = comando || null;
    this.nota = nota || null;
    this.forca = forca || null;
    this.allKeys = [];
  }
  
  noteTouched(){
    this.arrNotes()
    let note = this.allKeys[this.nota];
    if(this.comando==144){
      chord.push(note);
      console.log(chord)
    } else if(this.comando==128){
      chord = chord.filter(el=>el!=note);
      console.log(chord)
    }
  }

  arrNotes(){
    let notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

    for(let i=0; i<=10; i++){
      this.allKeys.push(...notes)
    }
  }

}