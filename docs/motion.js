/* Prism site motion: reveal, tilt, theme switch, tabs, stories, player morph, media fallback */
(function(){
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // reveal
  var rv=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)||rm){rv.forEach(function(e){e.classList.add('in')})}
  else{var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}})},{threshold:.12});rv.forEach(function(e){o.observe(e)})}
  // tilt
  if(!rm&&matchMedia('(hover:hover)').matches){document.querySelectorAll('.tilt').forEach(function(el){
    el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.style.transform='perspective(1200px) rotateX('+(-y*6)+'deg) rotateY('+(x*6)+'deg) translateY(-4px)'});
    el.addEventListener('pointerleave',function(){el.style.transform=''})})}
  // media fallback: if an image/video fails, show the CSS mock
  document.querySelectorAll('.screen').forEach(function(s){
    var m=s.querySelectorAll('img,video');if(!m.length){s.classList.add('nomedia');return}
    var fails=0;m.forEach(function(el){el.addEventListener('error',function(){if(++fails>=m.length)s.classList.add('nomedia')});
      if(el.tagName==='IMG'&&el.complete&&el.naturalWidth===0){if(++fails>=m.length)s.classList.add('nomedia')}
      if(el.tagName==='VIDEO'){var chk=function(){if(el.error||el.networkState===3){if(++fails>=m.length)s.classList.add('nomedia')}};chk();setTimeout(chk,1500)}})});
  // theme pick (data-t) -> swaps page bg + mock bg + screen variant
  var T={ink:'',aurora:'aurora',rose:'rose',mint:'mint',classic:'',violet:'',blue:''};
  document.querySelectorAll('.pick').forEach(function(p){p.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){
    var t=b.dataset.t;p.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    var bg=document.getElementById('page');if(bg){bg.className='bgfx '+(T[t]||'');bg.style.background=t==='rose'?'linear-gradient(160deg,#3a1030,#7a2a52 60%,#c4627a)':t==='mint'?'linear-gradient(160deg,#07302f,#0f6b66 60%,#46c7a8)':t==='violet'?'linear-gradient(160deg,#2a1a5a,#5a2aa8)':t==='blue'?'linear-gradient(160deg,#0a2e8c,#2a7ff0)':t==='classic'?'linear-gradient(160deg,#3a2a1a,#2a2a3a)':''}
    document.querySelectorAll('.mbg').forEach(function(m){m.className='mbg '+(T[t]||'')});
    document.querySelectorAll('[data-theme-img]').forEach(function(img){var src=img.dataset.themeImg.replace('{t}',t);if(img.getAttribute('src')!==src){img.style.opacity=0;setTimeout(function(){img.src=src;img.style.opacity=1},250)}})})})});
  // tabs
  document.querySelectorAll('.tabs').forEach(function(t){t.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){
    t.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-selected',x===b)});
    var scope=t.closest('section')||document;scope.querySelectorAll('.pane').forEach(function(p){p.hidden=p.id!==b.dataset.p})})})});
  // stories: highlight story in view, switch sticky screen
  var stories=document.querySelectorAll('.story');
  if(stories.length&&'IntersectionObserver' in window){var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){
    stories.forEach(function(s){s.classList.remove('on')});e.target.classList.add('on');
    var k=e.target.dataset.screen,sc=document.querySelector('.stories .screen.sw');if(sc&&k){sc.querySelectorAll('[data-k]').forEach(function(x){x.classList.toggle('on',x.dataset.k===k)})}}})},{rootMargin:'-40% 0px -40% 0px'});stories.forEach(function(s){so.observe(s)})}
  // console picker: tapping a tile swaps hero shelf label / image
  document.querySelectorAll('[data-console]').forEach(function(t){t.addEventListener('click',function(){
    document.querySelectorAll('[data-console]').forEach(function(x){x.classList.remove('on')});t.classList.add('on');
    var lbl=document.getElementById('shelf-name');if(lbl)lbl.textContent=t.dataset.console;
    var img=document.getElementById('shelf-img');if(img&&t.dataset.shelf){img.src=t.dataset.shelf}})});
  // player video/music morph
  document.querySelectorAll('[data-morph]').forEach(function(b){b.addEventListener('click',function(){
    var m=b.dataset.morph;document.querySelectorAll('[data-morph]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    document.querySelectorAll('.pm.morph').forEach(function(p){p.classList.remove('video','music');p.classList.add(m)})})});
})();
