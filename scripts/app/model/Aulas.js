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
    this.position = 1;
  }

  learn(infoKey){
    // console.log(infoKey)
    if(infoKey.position){
      this.aulaNotes(infoKey, 'fisico')
      this.aulaDedos(infoKey, 'fisico')
      this.aulaCifras(infoKey, 'fisico')
      this.praticETM(infoKey, 'fisico')
    } else{
      this.aulaNotes(infoKey, 'digital')
      this.aulaDedos(infoKey, 'digital')
      this.aulaCifras(infoKey, 'digital')
      this.praticETM(infoKey, 'digital')
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

  aulaCifras(infoKey){
    if(infoKey.parent=='cifra-teoria'){
      this.showSimple(infoKey.content, infoKey.parent)
    }
    if(infoKey.parent=='cifra-pratica'){
      this.showPratic(infoKey.content, infoKey.parent)
    }
  }

  praticETM(infoKey){
    const note = {
      C: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
      D: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#', 'D'],
      E: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#', 'E'],
      F: ['F', 'G', 'A', 'A#', 'C', 'D', 'E', 'F'],
      G: ['G', 'A', 'B', 'C', 'D', 'E', 'F#', 'G'],
      A: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#', 'A'],
      B: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B']
    }

    let content = infoKey.content; content.length>1? content=content.slice(0,2):''
    const escala = document.querySelector(`#${infoKey.parent} .current`).textContent
    const local = document.querySelector(`#${infoKey.parent} h1`)
    if(infoKey.parent=='pratica-etM'){

      if(content==note[escala][this.position]){
        if(this.position<7){
          local.innerHTML += `${content} - `
          this.position+=1
        } else{
          local.innerHTML += content
          local.classList.add('success');
          setTimeout(()=>{
            local.classList.remove('success');
            local.innerHTML = `${escala} - `
            this.position = 1
          }, 1500)
        }
      }else {
        local.classList.add('fail');
        setTimeout(()=>{
          local.classList.remove('fail');
        }, 500)
      }
    }
  }

  showSimple(content, parent){
    let local = document.querySelector(`#${parent} h1`);
    local.innerHTML = content;
  }

  showPratic(content, parent){
    let level = document.querySelector(`#${parent} .current`)
    let local = document.querySelector(`#${parent} h1`);
    let lesson = parent.slice(0,5);
    let arr = []
    if(content==local.textContent){
      if(level.textContent=='Nível 1'){
        arr = modelAulas[lesson].slice(5,8)
        this.success(arr, local)
      }
      if(level.textContent=='Nível 2'){
        arr = modelAulas[lesson].slice(5)
        this.success(arr, local)
      }
      if(level.textContent=='Nível 3'){
        arr = modelAulas[lesson].slice(0)
        this.success(arr, local)
      }
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

  success(arr, local){
    this.randomize(arr);
    local.classList.add('success');
    setTimeout(()=>{
      local.classList.remove('success');
      local.innerHTML = arr[this.random];
    }, 500)
  }

}
