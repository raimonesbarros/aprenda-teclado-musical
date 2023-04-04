import { Navigate } from "./app/Navigate.js"
import { showContent, playAudio, grau, notas, dedos1, dedos2, cifras } from "./app/Negocios.js"
const navigate = new Navigate()

const btnKeyboard = document.querySelectorAll('.keyboard button');

document.addEventListener('click', evt=>{
  let event = evt.target
  let classe = event.classList[0]
  let data = event.dataset.aula
  // console.log(event.dataset.aula)
  classe=='ir'? navigate.aulas(data):
  classe=='btn_menu'? navigate.btnMenu():''
})

btnKeyboard.forEach(el=>{
  el.addEventListener('click', evt=>{
    const event = evt.target;
    let content = event.textContent;
    let dataAudio = event.dataset.audio;
    
    notas.includes(content)? showContent('#notas', content, dataAudio, 3):
    grau.includes(content)? showContent('#grau', content, dataAudio, 3):
    cifras.includes(content)? showContent('#cifra-teoria', content, dataAudio, 3):
    dedos1.includes(content)? showContent('#dedos', content, dataAudio, 2):
    dedos2.includes(content)? showContent('#dedos', content, dataAudio, 3): playAudio(dataAudio, 3)
  })
})
