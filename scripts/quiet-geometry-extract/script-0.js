
const root=document.body;
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reducedMotion)root.classList.add('motion-on');
const buttons=[...document.querySelectorAll('[data-strength]')];
buttons.forEach(btn=>btn.addEventListener('click',()=>{
 root.classList.remove('line-quiet','line-expressive'); if(btn.dataset.strength!=='line-balanced')root.classList.add(btn.dataset.strength);
 buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
}));
const motion=document.getElementById('motion');
motion.addEventListener('click',()=>{const enabled=root.classList.toggle('motion-on');root.classList.toggle('no-motion',!enabled);motion.setAttribute('aria-pressed',String(enabled));motion.textContent=enabled?'On · draw on scroll':'Off · static lines';});
if(reducedMotion){root.classList.add('no-motion');motion.setAttribute('aria-pressed','false');motion.textContent='Off · static lines';}
document.querySelectorAll('.q-opt').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.q-opt').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');document.getElementById('quiz-note').textContent='Selected: '+btn.textContent+' · Your guided quiz would continue here.';}));
// Use the real SVG path geometry; do not animate the image or continuously float the linework.
document.querySelectorAll('.draw path,.draw circle,.draw ellipse').forEach(shape=>{const length=shape.getTotalLength();shape.style.setProperty('--dash-length',String(length+2));});
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.13});
 document.querySelectorAll('.draw').forEach(el=>observer.observe(el));
}else{document.querySelectorAll('.draw').forEach(el=>el.classList.add('in-view'));}

