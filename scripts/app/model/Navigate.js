export class Navigate{
  constructor(event){
    this.event = event || null;
    this.menu = document.querySelector('.navbar');
    this.arrPai = ['whites', 'blacks', 'octave', 'keyboard', 'aula', 'content'];
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

  conection(){
    const info = document.querySelector('.info')
    if(this.classe=='dot-connect'){
      info.classList.toggle('disable');
    } else{
      info.classList.add('disable');
    }
  }

}
