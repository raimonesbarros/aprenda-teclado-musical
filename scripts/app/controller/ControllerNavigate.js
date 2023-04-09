import { Navigate } from "../model/Navigate.js";
import { Mode } from "../model/Mode.js";

export class controllerNavigate{
  constructor(){
    this.mode = new Mode();
  }

  navigateEvent(evt){
    let event = evt.target
    const navigate = new Navigate(event)
    navigate.btnMenu()
    navigate.aulas()
  }
  
  modeToggle(element){this.mode.toggle(element);}

}