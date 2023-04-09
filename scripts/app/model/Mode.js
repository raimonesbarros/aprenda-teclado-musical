export class Mode{
  constructor(){
    this.element = document.querySelectorAll('.mode');
    this.dark = ['html', 'body', 'footer'];
    this.light = ['h1', 'p'];
  }

  toggle(){
    this.dark.forEach(item=>{
      const local = document.querySelector(item);
      local.classList.toggle('bg-dark');
    })

    this.light.forEach(item=>{
      const local = document.querySelectorAll(item);
      local.forEach(el=>el.classList.toggle('txt-light'));
    })

    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon=>icon.classList.toggle('disable'));

    const nav_button = document.querySelectorAll('nav button');
    nav_button.forEach(el=>el.classList.toggle('txt-dark'));
  }
}