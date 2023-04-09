import { ControllerKeyboard } from "./app/controller/ControllerKeyboard.js";
import { controllerNavigate } from "./app/controller/ControllerNavigate.js";

const controller_keyboard = new ControllerKeyboard();
const controller_navigate = new controllerNavigate();

controller_navigate.init()

/* TECLADO FISICO */

// Verifica se o navegador tem acesso MIDI
if(navigator.requestMIDIAccess){
  navigator.requestMIDIAccess().then(evt=>{
    controller_keyboard.midiSuccess(evt)
  }, ()=>{
    controller_keyboard.midiFailure()
  });
}

/* TECLADO VIRTUAL */

// Mostrar teclado virtual
const aulas = document.querySelectorAll('.aula');
aulas.forEach(element=>{
  controller_keyboard.createKeyboardVirtual(element)
})

// Arrastar dedo no teclado
let onTouchLeaveEvents = [];
let onTouchEnterEvents = [];
const onTouchEnter = (selector, fn)=>{
  onTouchEnterEvents.push([selector, fn]);
  return function() {
    onTouchEnterEvents.slice().map((e, i)=>{
      if (e[0] === selector && e[1] === fn) {
        onTouchEnterEvents.splice(1, i);
      }
    });
  };
};

let lastTouchLeave;
let lastTouchEnter;
document.addEventListener('touchmove', e=>{
  let el = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
  if (!el) return;
  
  onTouchLeaveEvents.map((event) => {
    if (el!=lastTouchEnter && lastTouchEnter && lastTouchEnter.matches(event[0])) {
      if (lastTouchEnter !== lastTouchLeave ) {
        event[1](lastTouchEnter, e);
        lastTouchLeave = lastTouchEnter;
        lastTouchEnter = null
      }
    }
  });
  
  onTouchEnterEvents.map(event=>{
    if (el.matches(event[0]) && el!==lastTouchEnter) {
      lastTouchEnter = el;
      lastTouchLeave = null;
      event[1](el, e);
    }
  });

});

onTouchEnter('.keyboard button', element=> controller_keyboard.touchMove(element));

// Tocar 
const btnKeyboard = document.querySelectorAll('.keyboard button');
btnKeyboard.forEach(tecla=>{
  tecla.addEventListener('mousedown', evt=>{controller_keyboard.touchMove(evt.target);});
  tecla.addEventListener('mouseleave', ()=>{controller_keyboard.touchEnd();});
  tecla.addEventListener('mouseup', ()=>{controller_keyboard.touchEnd();});
  tecla.addEventListener('touchstart', evt=>{evt.target.classList.add('keyOn');});
  tecla.addEventListener('touchend', ()=>{controller_keyboard.touchEnd();});
})


/* EVENTOS DE NAVEGAÇÃO */
document.addEventListener('click', evt=>{
  controller_navigate.navigateEvent(evt);
})


/* MODE | THEME */
const mode = document.querySelectorAll('.mode');
mode.forEach(element=> { controller_navigate.modeToggle(element)});

