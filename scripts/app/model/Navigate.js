export class Navigate{
  constructor(event){
    this.event = event;
    this.menu = document.querySelector('.navbar');
    this.arrPai = ['whites', 'blacks', 'octave', 'keyboard', 'aula', 'content'];
    this.classe = event.classList[0]
    this.classePai = event.parentNode.classList[0]
    this.data = event.dataset.aula;
  }

  btnMenu(){
    if(this.classe=='btn_menu'){  
      this.menu.classList.toggle('disable')
    } else if(this.arrPai.includes(this.classePai)){
      this.menu.classList.add('disable')
    }
  }
  
  aulas(){
    if(this.classe=='ir'){
      const aula = document.querySelectorAll('.aula')
      const item = document.querySelector(`#${this.data}`)
      aula.forEach(el=>el.classList.add('disable'))
      item.classList.remove('disable')
    }
  }

}
