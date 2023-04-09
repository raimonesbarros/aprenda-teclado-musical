import { Navigate } from "../model/Navigate.js";
import { Mode } from "../model/Mode.js";
import { Repository } from "./Repository.js";

export class controllerNavigate{
  constructor(){
    this.repository = new Repository();
    this.mode = new Mode();
  }

  init(){
    this.repository.initRepo();
    this.repository.getRepo('_info')
    let info = this.repository.objLocal[0];
    info.mode=='dark'? this.mode.toggle():'';
    info.aula? new Navigate().irPara(info.aula):'';
  }

  navigateEvent(evt){
    let event = evt.target
    const navigate = new Navigate(event)
    navigate.btnMenu()
    navigate.aulas(event.dataset.aula)
    navigate.conection()
    if(event.dataset.aula){
      this.repository.setRepo('_info', 'aula', event.dataset.aula);
    }
  }
  
  modeToggle(element){
    element.addEventListener('click', ()=>{
      this.mode.toggle();
      this.repository.setRepo('_info', 'mode', element.classList[0]);
    })
  }

}