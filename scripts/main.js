import { DOM } from "./requestDOM.js";
import { Navigate } from "./app/model/Navigate.js";
import { TecladoVirtual, TecladoFisico } from "./app/model/Keyboard.js";
import { Aulas } from "./aulas.js";

let class_aulas = new Aulas()
let teclado_virtual = new TecladoVirtual()

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

// Tocar com teclado virtual
const btnKeyboard = document.querySelectorAll('.keyboard button');
btnKeyboard.forEach(el=>{
  el.addEventListener('click', evt=>{
    const event = evt.target;
    class_aulas.showNote(event)
    teclado_virtual.touchKey(event);
  })
})

// Eventos de navegação
document.addEventListener('click', evt=>{
  let event = evt.target
  
  const navigate = new Navigate(event)
  navigate.btnMenu()
  navigate.aulas()
})