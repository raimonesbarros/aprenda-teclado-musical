import { DOM } from "./requestDOM.js";
import { Navigate } from "./app/model/Navigate.js";
import { TecladoVirtual, TecladoFisico } from "./app/model/Keyboard.js";
import { Aulas } from "./app/model/Aulas.js"; 

let class_aulas = new Aulas();
let teclado_virtual = new TecladoVirtual();

/* TECLADO FISICO */

// Verifica se o navegador tem acesso MIDI
if(navigator.requestMIDIAccess){
  navigator.requestMIDIAccess().then(success, failure);
}

// Caso não tenha acesso MIDI
function failure(){
  alert('Este navegador não tem acesso ao teclado musical')
}

// Caso tenha acesso MIDI
function success(midiAccess){
  midiAccess.addEventListener('statechange', updateDevices);

  // Informações recebidas
  const inputs = midiAccess.inputs;
  // console.log(inputs)
  
  inputs.forEach(input => {
    // console.log(input)
    input.addEventListener('midimessage', updateKeys);
  });
}

// Funções para escuta de eventos
function updateDevices(event){
  // console.log(event)
  let nome = event.port.name;; //nome do dispositivo
  let situacao = event.port.state; // conectado | desconectado
  if(situacao=='connected'){situacao = 'conectado';
  } else{
    nome = 'Teclado';
    situacao = 'desconectado';
  }
  // Mostrar a conecção do dispositivo
  DOM.device.innerText = nome;
  DOM.conect.innerText = situacao;
}

// Pegar informações das teclas
function updateKeys(input){
  const comando = input.data[0]; // 144 tocou | 128 soltou
  const nota    = input.data[1]; // Valor da nota tocada
  const forca   = input.data[2]; // Força do toque
  new TecladoFisico(comando, nota, forca).noteTouched()

  // console.log(input);
  //console.log( nota, comando, forca);
}


/* TECLADO VIRTUAL */

// Mostrar teclado virtual
const aulas = document.querySelectorAll('.aula');
aulas.forEach(el=>{
  let modelo = el.classList[1];
  let aula = el.classList[2];
  let local = el.id;
  teclado_virtual.showTeclado(modelo, aula, local)
})

// ARRASTAR NO TECLADO

let onTouchLeaveEvents = [];
let onTouchEnterEvents = [];
const onTouchEnter = function (selector, fn) {
  onTouchEnterEvents.push([selector, fn]);
  return function () {
    onTouchEnterEvents.slice().map(function (e, i) {
      if (e[0] === selector && e[1] === fn) {
        onTouchEnterEvents.splice(1, i);
      }
    });
  };
};

const onTouchLeave = function (selector, fn) {
  onTouchLeaveEvents.push([selector, fn]);
  return function () {
    onTouchLeaveEvents.slice().map(function (e, i) {
      if (e[0] === selector && e[1] === fn) {
        onTouchLeaveEvents.splice(1, i);
      }
    });
  };
};

let lastTouchLeave;
let lastTouchEnter;
document.addEventListener('touchmove', function (e) {
  var el = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
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
  
    onTouchEnterEvents.map((event) => {
        if (el.matches(event[0]) && el!==lastTouchEnter) {
            lastTouchEnter = el;
      lastTouchLeave = null;
      event[1](el, e);
     }
    });

});

onTouchEnter('button',function(el,e){
  teclado_virtual.playAudio(el)
  class_aulas.showNote(el);
})
onTouchLeave('button',function(el,e){
  teclado_virtual.playAudio(el)
  class_aulas.showNote(el);
})

//asdfghafsdh

// Tocar com teclado virtual
const btnKeyboard = document.querySelectorAll('.keyboard button');
btnKeyboard.forEach(tecla=>{
  tecla.addEventListener('mousedown', evt=>{
    const event = evt.target;
    teclado_virtual.playAudio(event)
    class_aulas.showNote(event);
  });
  
})

// Eventos de navegação
document.addEventListener('click', evt=>{
  let event = evt.target
  
  const navigate = new Navigate(event)
  navigate.btnMenu()
  navigate.aulas()
})