import { Navigate } from "./app/model/Navigate.js";
import { Teclado } from "./app/model/Aulas.js";

const aulas = document.querySelectorAll('.aula');
const btnKeyboard = document.querySelectorAll('.keyboard button');

aulas.forEach(el=>{
  let modelo = el.classList[1];
  let aula = el.classList[2];
  let local = el.id;
  const teclado = new Teclado('', modelo, aula, local)
  teclado.showTeclado()
})

document.addEventListener('click', evt=>{
  let event = evt.target  
  const navigate = new Navigate(event)
  navigate.btnMenu()
  navigate.aulas()
})

btnKeyboard.forEach(el=>{
  el.addEventListener('click', evt=>{
    const event = evt.target;
    console.log(event)
    new Teclado().touchKey(event)
  })
  // el.addEventListener('touchmove', evt=>{
  //   evt.target
  //   for (let i = 0; i < evt.changedTouches.length; i++) {
  //     const event = evt.changedTouches[i];
  //     touchKey(event)
  //   }
  // })
})
