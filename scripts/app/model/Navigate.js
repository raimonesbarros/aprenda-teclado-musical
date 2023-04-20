export class Navigate{
  constructor(event){
    this.event = event || null;
    this.menu = document.querySelector('.navbar');
    this.arrPai = ['video', 'whites', 'blacks', 'octave', 'keyboard', 'aula', 'content'];
    event? this.classe = event.classList[0]:'';
    event? this.classePai = event.parentNode.classList[0]:'';
    event? this.data = event.dataset.aula:'';
  }

  btnMenu(){
    if(this.classe=='btn_menu'){  
      this.menu.classList.toggle('disable')
    } else if(this.arrPai.includes(this.classePai)){
      this.menu.classList.add('disable')
    }
  }
  
  aulas(dataAula){
    if(this.classe=='ir'){
      this.irPara(dataAula)
    }
  }

  irPara(dataAula){
    const aula = document.querySelectorAll('.aula')
    const item = document.querySelector(`#${dataAula}`)
    aula.forEach(el=>el.classList.add('disable'))
    item.classList.remove('disable')
  }

  level(evt){
    let event = evt.target
    event.classList.add('current')
  }

  praticaETM(evt){
    let event = evt.target
    let content = event.textContent
    let local = document.querySelector('#pratica-etM h1')
    local.innerHTML = `${content} - `
    event.classList.add('current')
  }



  conection(){
    const info = document.querySelector('.info')
    if(this.classe=='dot-connect'){
      info.classList.toggle('disable');
    } else{
      info.classList.add('disable');
    }
  }

}

let level_notes = document.querySelectorAll('.level-notes button')
level_notes.forEach(el=>{
  el.addEventListener('click', evt=> {
    level_notes.forEach(el=>el.classList.remove('current'))  
    new Navigate().level(evt)
  })
})

let level_cifra = document.querySelectorAll('.level-cifra button')
level_cifra.forEach(el=>{
  el.addEventListener('click', evt=> {
    level_cifra.forEach(el=>el.classList.remove('current'))  
    new Navigate().level(evt)
  })
})

const opCifra = document.querySelectorAll('.op-cifra button')
opCifra.forEach(el=>{
  el.addEventListener('click', evt=>{
    opCifra.forEach(el=>el.classList.remove('current'))
    new Navigate().praticaETM(evt)
  })
})
