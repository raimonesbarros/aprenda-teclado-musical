
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
  // Receber os eventos do dispositivo
  midiAccess.addEventListener('statechange', updateDevices);
  
  // Informações recebidas
  const inputs = midiAccess.inputs;
  // console.log(inputs)
  
  inputs.forEach(input => {
    // console.log(input)
    input.addEventListener('midimessage', handleInput);
  });
}

// Funções de escuta para eventos

function updateDevices(event){
  // console.log(event)
  let nome = event.port.name;; //nome do dispositivo
  let situacao = event.port.state; // conectado | desconectado
  if(situacao=='connected'){
    situacao = 'conectado';
  } else{
    nome = 'Teclado';
    situacao = 'desconectado';
  }
  console.log(nome, situacao) // Saida de info
}

let data = [];

// Pegar informações das teclas
function handleInput(input){
  const comando = input.data[0]; // 144 tocou | 128 soltou
  const nota    = input.data[1]; // Valor da nota que foi tocada
  const forca   = input.data[2]; // Força com que a nota foi tocada
  //console.log( nota, comando, forca);

}
