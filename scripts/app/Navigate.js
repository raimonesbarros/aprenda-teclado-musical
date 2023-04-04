export function btnMenu(){
  const menu = document.querySelector('.navbar')
  menu.classList.toggle('disable')
}

export class Navigate{

  btnMenu(){
    const menu = document.querySelector('.navbar')
    menu.classList.toggle('disable')
  }
  
  aulas(data){
    const aula = document.querySelectorAll('.aula')
    const item = document.querySelector(`#${data}`)
    aula.forEach(el=>el.classList.add('disable'))
    item.classList.remove('disable')
  }
}
