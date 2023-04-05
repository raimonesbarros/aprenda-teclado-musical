
const aulas = {
  notas: [
    ['DÓ+ ou RÉ-', 'RÉ+ ou MÍ-', ' ', 'FÁ+ ou SOL-', 'SOL+ ou LÁ-', 'LÁ+ ou SÍ-'],
    ['DÓ', 'RÉ', 'MÍ', 'FÁ', 'SOL', 'LÁ', 'SÍ']
  ],

  dedos: [
    ['1-E', '2-E', '3-E', '4-E', '5-E', '3-E', '4-E'],
    ['5-E ou 1-D', '2-D', '3-D', '1-D', '2-D', '3-D', '4-D']
  ],

  cifras: [
    ['C# ou Db', 'D# ou Eb', ' ', 'F# ou Gb', 'G# ou Ab', 'A# ou Bb', ' '],
    ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  ],

  grau: [
    [],
    ['1°', '2°', '3°', '4°', '5°', '6°', '7°']
  ]
}

const audio = {
  bemois: ['Db', 'Eb', 'none', 'Gb', 'Ab', 'Bb', 'none'],
  naturais: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
};


export class Teclado{
  constructor(event, modelo, aula, local){
    this.event = event || null;
    this.local = document.querySelector(`#${local} .keyboard`) || null;
    this.aula = aula || null;
    this.modelo = modelo || null;
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

  touchKey(event){
    // let content = event.textContent;
    let dataAudio = event.dataset.audio;
    playAudio(dataAudio);
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

//Audio Piano
function playAudio(dataAudio){
  let audio = new Audio(`audio/piano-mp3/${dataAudio}.mp3`);
  audio.play()
}
