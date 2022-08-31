class Scroll{
  constructor(name){
      this.elements = document.querySelectorAll(name);
      if(this.elements) this.init();   
  } 

  init(){
      this.verElementos();
      this.elements.forEach((element)=>{
          this.observer.observe(element)
      })
  }

  verElementos(){
      this.options = {
          threshold: '',
          rootMargin: '',
      };
      this.observer = new IntersectionObserver((entries, observer)=>{
          entries.forEach((entry)=>{
              console.log(entry);
          })
      },this.options)
  }
}

class ScrollNav extends Scroll{
  constructor(name, classToAdd){
    super(name)
    this.links = document.getElementById("navbar");
    this.classToAdd = classToAdd
  }

  verElementos(){
    this.options = {
        threshold: '.6',
        rootMargin: '',
    };
    this.observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach((entry)=>{
            const id = entry.target.getAttribute('id')
            const link = this.links.querySelector(`[href='#${id}']`)
            this.ativarLink(entry, link)
        })
    },this.options)
  }

  ativarLink({isIntersecting},link){
    if(isIntersecting){
      link.classList.add(this.classToAdd);
    }else{
      link.classList.remove(this.classToAdd);
    }
}
}

class ScrollIn extends Scroll {

  constructor(name, classAnimated, threshold = .9){
    super(name)
    this.classAnimated = classAnimated
    this.threshold = threshold
  }

  verElementos(){
      this.options = {
          threshold: this.threshold,
          rootMargin: '0% 100%',
      };
      this.observer = new IntersectionObserver((entries, observer)=>{
          entries.forEach((entry)=>{
              this.mostrarElemento(entry);
          })
      },this.options)
  }

  mostrarElemento(entry){
      if(entry.isIntersecting){
          entry.target.classList.add(this.classAnimated);
          this.observer.unobserve(entry.target);
      }
  }
}


function criarEventosLinks(){
   
  const links = document.querySelectorAll(".nav-link");
  const linkHome = document.querySelector("[href^='#']");

  linkHome.addEventListener('click', (e) => {
    e.preventDefault();
    window.scroll(0,0);
  })

  if(windowSize().width <= 576){
    const myOffcanvas = document.getElementById('offcanvasNavbar')
    links.forEach((item)=>{
      item.addEventListener('click',(e)=>{
        e.preventDefault();
        myOffcanvas.addEventListener('hidden.bs.offcanvas', event => {
          window.scroll(0,getElemOffSetTop(e));   
        })       
      })
    })
  }else{
    links.forEach((item)=>{
      item.addEventListener('click',(e)=>{
        e.preventDefault();
        window.scroll(0,getElemOffSetTop(e));        
      })
    })
  }
};

function getElemOffSetTop({target}){
  const id = target.getAttribute('href').replace('#','')
  return document.getElementById(id).offsetTop - 40
}

function windowSize(){
  return document.documentElement.getBoundingClientRect(); 
}

window.addEventListener('load', ()=>{
  let th 

  (windowSize().width <= 576) ? th = .6 : th = .9;
  criarEventosLinks();

  new ScrollNav('[data-scrollNav]','active')

  const scroll = new ScrollIn('[data-animate]','scrolled',th);
} );
window.addEventListener('resize', () => criarEventosLinks());
