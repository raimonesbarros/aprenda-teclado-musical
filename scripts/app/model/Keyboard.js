import { aulas } from "../../aulas.js";
export { TecladoVirtual, TecladoFisico }

const audio = {
  bemois: ['Db', 'Eb', 'none', 'Gb', 'Ab', 'Bb', 'none'],
  naturais: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
};

class TecladoVirtual{
  constructor(event, modelo, aula, local){
    this.event  = event  || null;
    this.aula   = aula   || null;
    this.modelo = modelo || null;
    this.local  = document.querySelector(`#${local} .keyboard`) || null;
  }

  showTeclado(){
    if(this.modelo=='tm1' && aulas[this.aula]){
      this.createOctave(this.aula)
    }
    if(this.modelo=='tm2' && aulas[this.aula]){
      this.createOctave(this.aula, 2)
      this.createOctave(this.aula)
    }
  }

  playAudio(dataAudio){
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