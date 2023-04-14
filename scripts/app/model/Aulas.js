const modelAulas = {
  notas: [ 'DÓ+ ou RÉ-', 'RÉ+ ou MÍ-', 'FÁ+ ou SOL-', 'SOL+ ou LÁ-', 'LÁ+ ou SÍ-', 'DÓ', 'RÉ', 'MÍ', 'FÁ', 'SOL', 'LÁ', 'SÍ'],

  dedos: [
    ['', '', '', '', '', '1-E', '2-E', '3-E', '4-E', '5-E', '3-E', '4-E'],
    ['', '', '', '', '', '5-E ou 1-D', '2-D', '3-D', '1-D', '2-D', '3-D', '4-D']
  ],

  cifra: ['C# ou Db', 'D# ou Eb', 'F# ou Gb', 'G# ou Ab', 'A# ou Bb', 'C', 'D', 'E', 'F', 'G', 'A', 'B'],

  grau: ['', '', '', '', '', '', '', '1°', '2°', '3°', '4°', '5°', '6°', '7°'],
}

export class Aulas{
  constructor(){
    this.random = 0;
  }

  learn(infoKey){
    console.log(infoKey)
    if(infoKey.position){
      this.aulaNotes(infoKey, 'fisico')
      this.aulaDedos(infoKey, 'fisico')
      this.aulaCifras(infoKey, 'fisico')
    } else{
      this.aulaNotes(infoKey, 'digital')
      this.aulaDedos(infoKey, 'digital')
      this.aulaCifras(infoKey, 'digital')
    }

  }

  aulaNotes(infoKey, tipo){
    if(tipo=='fisico'){
      if(infoKey.parent=='notas-teoria'){
        let i = modelAulas.cifra.indexOf(infoKey.content)
        this.showSimple(modelAulas.notas[i], infoKey.parent)
      }
      if(infoKey.parent=='notas-pratica'){
        let i = modelAulas.cifra.indexOf(infoKey.content)
        this.showPratic(modelAulas.notas[i], infoKey.parent)
      }
    }

    if(tipo=='digital'){
      if(infoKey.parent=='notas-teoria'){
        this.showSimple(infoKey.content, infoKey.parent)
      }
      if(infoKey.parent=='notas-pratica'){
        this.showPratic(infoKey.content, infoKey.parent)
      }
    }

  }

  aulaDedos(infoKey, tipo){
    if(tipo=='fisico'){
      if(infoKey.parent=='dedos-teoria'){
        let i = modelAulas.cifra.indexOf(infoKey.content)
        if(infoKey.position<60){
          this.showSimple(modelAulas.dedos[0][i], infoKey.parent)
        }else{
          this.showSimple(modelAulas.dedos[1][i], infoKey.parent)
        }
      }
    }

    if(tipo=='digital'){
      if(infoKey.parent=='dedos-teoria'){
        this.showSimple(infoKey.content, infoKey.parent)
      }
    }
  }

  aulaCifras(infoKey, tipo){
      if(infoKey.parent=='cifra-teoria'){
        this.showSimple(infoKey.content, infoKey.parent)
      }
      if(infoKey.parent=='cifra-pratica'){
        this.showPratic(infoKey.content, infoKey.parent)
      }

  }

  showSimple(content, parent){
    let local = document.querySelector(`#${parent} h1`);
    local.innerHTML = content;
  }

  showPratic(content, parent){
    let local = document.querySelector(`#${parent} h1`);
    let lesson = parent.slice(0,5);
    if(content==local.textContent){
      this.randomize(modelAulas[lesson]);
      local.classList.add('success');
      setTimeout(()=>{
        local.classList.remove('success');
        local.innerHTML = modelAulas[lesson][this.random];
      }, 500)
    } else{
      local.classList.add('fail');
      setTimeout(()=>{
        local.classList.remove('fail');
      }, 500)
    }
  }

  randomize(arr){
    this.random = Math.floor(Math.random()*arr.length)
  }

}
