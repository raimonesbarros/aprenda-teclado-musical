export { TecladoVirtual, TecladoFisico };

let modelKeyboard = {
  notas: ['DÓ+ ou RÉ-', 'RÉ+ ou MÍ-', ' ', 'FÁ+ ou SOL-', 'SOL+ ou LÁ-', 'LÁ+ ou SÍ-', 'DÓ', 'RÉ', 'MÍ', 'FÁ', 'SOL', 'LÁ', 'SÍ'],

  dedos: [
    ['', '', '', '', '', '', '1-E', '2-E', '3-E', '4-E', '5-E', '3-E', '4-E'],
    ['', '', '', '', '', '', '5-E ou 1-D', '2-D', '3-D', '1-D', '2-D', '3-D', '4-D']
  ],

  cifra: [
    ['C# ou Db', 'D# ou Eb', ' ', 'F# ou Gb', 'G# ou Ab', 'A# ou Bb', 'C', 'D', 'E', 'F', 'G', 'A', 'B'],
  ],

  padrao: ['C# ou Db', 'D# ou Eb', ' ', 'F# ou Gb', 'G# ou Ab', 'A# ou Bb', 'C', 'D', 'E', 'F', 'G', 'A', 'B'],

  grau: ['', '', '', '', '', '', '', '1°', '2°', '3°', '4°', '5°', '6°', '7°']
}

const audio = {
  bemois: ['Db', 'Eb', 'none', 'Gb', 'Ab', 'Bb', 'none'],
  naturais: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
};

class TecladoVirtual{
  constructor(){
    this.modelKeyboardo = '';
    this.aula = '';
    this.local = '';
  }

  showTeclado(modelKeyboardo, aula, local){
    this.modelKeyboardo = modelKeyboardo;
    this.aula   = aula;
    this.local  = document.querySelector(`#${local} .keyboard`);
    if(this.modelKeyboardo=='tm1' && modelKeyboard[this.aula]){
      this.createOctave(modelKeyboard[this.aula], 3)
    }
    if(this.modelKeyboardo=='tm2' && modelKeyboard[this.aula]){
      this.createOctave(modelKeyboard[this.aula], 2)
      this.createOctave(modelKeyboard[this.aula], 3)
    }
    if(this.modelKeyboardo=='tm3' && modelKeyboard[this.aula]){
      this.createOctave(modelKeyboard[this.aula][0], 2)
      this.createOctave(modelKeyboard[this.aula][1], 3)
    }
  }

  playAudio(event){
    let dataAudio = event.dataset.audio;
    let audio = new Audio(`audio/${dataAudio}.mp3`);
    audio.play()
  }

  createOctave(arrModelKeyboard, numOctave){
    arrModelKeyboard = arrModelKeyboard || null;
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
        button.innerText = arrModelKeyboard[i];
        button.setAttribute('data-audio', el+numOctave);
      }
      blacks.appendChild(button);
    }
    for (let i=0;i<audio.naturais.length;i++) {
      const el = audio.naturais[i];
      let button = document.createElement('button');
      button.innerText = arrModelKeyboard[i+6];
      button.setAttribute('data-audio', el+numOctave);
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
    this.createArrNotes()
    let note = this.allKeys[this.nota];
    if(this.comando==144){
      chord.push(note);
    } else if(this.comando==128){
      chord = chord.filter(el=>el!=note);
    }
    console.log(chord)
  }

  createArrNotes(){
    let notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    for(let i=0; i<=10; i++){
      this.allKeys.push(...notes)
    }
  }

}
