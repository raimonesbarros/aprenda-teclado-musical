import { TecladoFisico } from "./Keyboard.js";

export class Midi{
  constructor(){
    this.teclado_fisico = new TecladoFisico();
    this.device = document.querySelector('.conection .info .device');
    this.state = document.querySelector('.conection .info .state');
    this.dot = document.querySelector('.conection .dot');
  }

  failure(){
    alert('Este navegador não tem acesso ao teclado musical');
  }

  updateDevices(state){
    // console.log(state)
    let nome = state.port.name;; //nome do dispositivo
    let situacao = state.port.state; // conectado | desconectado
    if(situacao=='connected'){
      situacao = 'conectado';
      this.dot.classList.remove('disable')
    } else{
      nome = 'Teclado';
      situacao = 'desconectado';
      this.dot.classList.add('disable')
    }
    // Mostrar a conecção do dispositivo
    this.device.innerText = nome;
    this.state.innerText = situacao;
  }

  updateKeys(input){
    const comando = input.data[0]; // 144 tocou | 128 soltou
    const nota    = input.data[1]; // Valor da nota tocada
    const forca   = input.data[2]; // Força do toque
    this.teclado_fisico.noteTouched(comando, nota, forca)
  }

}
