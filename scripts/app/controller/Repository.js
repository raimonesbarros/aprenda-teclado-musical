// Guardar cadastro de usuarios no curso
// Guardar progresso do usuario no curso
// Guardar opções e configurações
export class Repository{
  constructor(){
    this._objJSON = {};
    this._objLocal = {};
  }

  get objLocal(){
    return [this._objLocal]
  }

  initRepo(){
    if(!localStorage.getItem('_personList')){
      this._objJSON = JSON.stringify(this._objLocal);
      localStorage.setItem('_personList', this._objJSON);
    }
    if(!localStorage.getItem('_info')){
      this._objLocal.mode = 'dark';
      this._objLocal.aula = 'teclado';
      this._objJSON = JSON.stringify(this._objLocal);
      localStorage.setItem('_info', this._objJSON);
    }

  }

  getRepo(repo){
    this._objJSON = localStorage.getItem(repo);
    this._objLocal = JSON.parse(this._objJSON);
  }

  setRepo(name, key, data){
    this.getRepo(name);
    this._objLocal[key] = data;
    this._objJSON = JSON.stringify(this._objLocal);
    localStorage.setItem(name, this._objJSON);
  }
}
