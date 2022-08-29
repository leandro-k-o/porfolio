function criarEventosLinks(){
  
  const userWindowWidth = document.documentElement.getBoundingClientRect();  
  const links = document.querySelectorAll(".nav-link");

  if(userWindowWidth.width <= 576){
    const myOffcanvas = document.getElementById('offcanvasNavbar')
    links.forEach((item)=>{
      item.addEventListener('click',(e)=>{
        e.preventDefault();
        myOffcanvas.addEventListener('hidden.bs.offcanvas', event => {
          const id = e.target.getAttribute('href');
          const to = document.getElementById(id).offsetTop - 30;
          window.scroll(0,to);  
        })       
      })
    })
  }else{
    links.forEach((item)=>{
      item.addEventListener('click',(e)=>{
        e.preventDefault();
          const id = e.target.getAttribute('href');
          const to = document.getElementById(id).offsetTop - 30;
          window.scroll(0,to);        
      })
    })
  }
};

window.addEventListener('load', criarEventosLinks);
window.addEventListener('resize', criarEventosLinks);
