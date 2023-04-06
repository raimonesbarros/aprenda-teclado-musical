import { TecladoFisico } from "./app/model/Keyboard.js"
import { DOM } from "./requestDOM.js"

export const aulas = {
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

export class Aulas{
  constructor(){
    this.random = 0;
  }

  showNote(event){
    let content = event.innerText;
    let parent = event.parentNode.parentNode.parentNode.parentNode.id;
    this.showSimple(content, parent)
  }

  showSimple(content, parent){
    let tipo = parent.slice(-6);
    let local = document.querySelector(`#${parent} h1`)
    tipo=='teoria'? local.innerHTML = content:''
  }

  randomize(arr){
    this.random = Math.floor(Math.random()*arr.length)

  }


}
