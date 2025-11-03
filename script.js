
/* script_modern.js
   Modern JS to replace script.js
   - banner carousel
   - small project carousels
   - hamburger menu toggle
   - dropdown keyboard accessibility
   - fade-in on scroll
*/

document.addEventListener('DOMContentLoaded', function() {
  /* -----------------------
     Banner Carousel (index.html)
     ----------------------- */
  (function() {
    const slidesWrap = document.querySelector('.banner-carousel .slides');
    if(!slidesWrap) return;
    const slides = Array.from(slidesWrap.children);
    let idx = 0;
    const prevBtn = document.querySelector('.banner-carousel .prev');
    const nextBtn = document.querySelector('.banner-carousel .next');
    function show(i){
      slidesWrap.style.transform = `translateX(-${i * 100}%)`;
      idx = i;
    }
    prevBtn?.addEventListener('click', function(){ show((idx>0)? idx-1 : slides.length-1); });
    nextBtn?.addEventListener('click', function(){ show((idx<slides.length-1)? idx+1 : 0); });
    let auto = setInterval(function(){ show((idx+1) % slides.length); }, 2000);
    // pause on hover
    const banner = document.querySelector('.banner-carousel');
    banner?.addEventListener('mouseenter', ()=> clearInterval(auto));
    banner?.addEventListener('mouseleave', ()=> auto = setInterval(function(){ show((idx+1) % slides.length); }, 2000));
  })();

  /* -----------------------
     Project small carousels
     ----------------------- */
  (function(){
    const carousels = document.querySelectorAll('.project-carousel');
    carousels.forEach(function(car){
      const slidesWrap = car.querySelector('.slides');
      const items = car.querySelectorAll('.item');
      const prev = car.querySelector('.prev');
      const next = car.querySelector('.next');
      if(!slidesWrap || items.length===0) return;
      let i=0;
      function show(j){
        slidesWrap.style.transform = `translateX(-${j * 100}%)`;
      }
      prev?.addEventListener('click', function(){ i = (i>0)? i-1 : items.length-1; show(i); });
      next?.addEventListener('click', function(){ i = (i<items.length-1)? i+1 : 0; show(i); });
    });
  })();

  /* -----------------------
     Hamburger menu toggle
     ----------------------- */
  (function(){
    // Create menu toggle button dynamically if not present
    let toggle = document.querySelector('.menu-toggle');
    if(!toggle){
      toggle = document.createElement('button');
      toggle.className = 'menu-toggle';
      toggle.setAttribute('aria-label','Toggle menu');
      toggle.innerHTML = '☰';
      const header = document.querySelector('.site-header');
      header?.appendChild(toggle);
    }
    const menu = document.querySelector('.menu');
    toggle.addEventListener('click', function(){
      menu.classList.toggle('open');
      toggle.classList.toggle('open');
      if(menu.classList.contains('open')){
        toggle.innerHTML = '✕';
        document.body.style.overflow = 'hidden';
      } else {
        toggle.innerHTML = '☰';
        document.body.style.overflow = '';
      }
    });
  })();

  /* -----------------------
     Dropdown keyboard & accessibility
     ----------------------- */
  (function(){
    document.querySelectorAll('.has-dropdown').forEach(function(el){
      const link = el.querySelector('a');
      const dropdown = el.querySelector('.dropdown');
      link.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown'){
          e.preventDefault();
          dropdown.style.display = dropdown.style.display === 'block' ? '' : 'block';
          dropdown.setAttribute('aria-hidden', dropdown.style.display !== 'block');
        }
      });
      el.addEventListener('focusout', function(e){
        // close when focus moves outside
        if(!el.contains(e.relatedTarget)) {
          if(dropdown) dropdown.style.display = '';
        }
      });
    });
  })();

  /* -----------------------
     Fade-in on scroll (intersection observer)
     ----------------------- */
  (function(){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    },{root:null,threshold:0.08});
    document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));
  })();

  /* -----------------------
     Mark active nav link
     ----------------------- */
  (function(){
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.menu a').forEach(a=>{
      const href = a.getAttribute('href');
      if(!href) return;
      if(href === path) a.classList.add('active');
    });
  })();

});
