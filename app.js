const menu = document.querySelector('#menu');
const header = document.querySelector('header');
function toggleMenu(open) {
  header.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
}
menu.addEventListener('click', () => toggleMenu(!header.classList.contains('open')));
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));
const dialog = document.querySelector('#booking');
const form = document.querySelector('#inquiry');
const trip = document.querySelector('#trip');
const date = document.querySelector('#date');
const adults = document.querySelector('#adults');
const kids = document.querySelector('#kids');
const draft = document.querySelector('#draft');
document.querySelectorAll('.book').forEach(button => button.addEventListener('click', () => {
  toggleMenu(false);
  trip.value = button.dataset.trip;
  date.min = new Intl.DateTimeFormat('sv-SE', {timeZone:'America/Cayenne'}).format(new Date());
  draft.hidden = true;
  dialog.showModal();
}));
document.querySelector('#close').addEventListener('click', () => dialog.close());
form.addEventListener('input', () => {
  draft.hidden = true;
  kids.setCustomValidity(Number(adults.value) + Number(kids.value) > 28 ? 'Le bateau accueille au maximum 28 passagers.' : '');
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const subject = trip.value === 'prive' ? 'Demande de devis de privatisation' : 'Demande de traversée';
  const message = ['Bonjour Tony,', '', subject + ' pour le ' + date.value.split('-').reverse().join('/') + '.', trip.selectedOptions[0].text, adults.value + ' adulte(s), ' + kids.value + ' enfant(s).', document.querySelector('#note').value.trim(), '', 'Merci de me confirmer la disponibilité et le tarif.'].join('\n');
  document.querySelector('#send').href = 'mailto:tonycboat@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message);
  draft.hidden = false;
  document.querySelector('#send').focus();
});
const hero = document.querySelector('.hero');
const canvas = document.querySelector('#particles');
const ctx = canvas.getContext('2d');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let frame = 0, visible = true, width, height, start = performance.now();
let grains = [];
function resize() {
  width = hero.clientWidth;
  height = hero.clientHeight;
  const ratio = Math.min(devicePixelRatio, 1.5);
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  // Seed the glints along the actual lettering silhouette for the opening title.
  const mask = document.createElement('canvas');
  const title = document.querySelector('h1');
  const rect = title.getBoundingClientRect();
  const line = parseFloat(getComputedStyle(title).lineHeight);
  mask.width = Math.min(width, 780); mask.height = Math.ceil(line * 2.5);
  const pen = mask.getContext('2d');
  const size = getComputedStyle(title).fontSize;
  pen.fillStyle = '#fff';
  pen.font = size + ' Georgia'; pen.fillText('Les îles', 0, line);
  pen.font = 'italic ' + size + ' Georgia'; pen.fillText('du Salut.', 0, line * 2);
  const pixels = pen.getImageData(0, 0, mask.width, mask.height).data;
  grains = [];
  for(let i=0;i<4800 && grains.length<260;i++) {
    const x = Math.floor(Math.random()*mask.width), y = Math.floor(Math.random()*mask.height);
    if(pixels[(y*mask.width+x)*4+3]>180) grains.push({x:rect.left+x,y:rect.top-hero.getBoundingClientRect().top+y,v:Math.random(),z:Math.random()});
  }
}
function paint(now) {
  frame = 0;
  if(!visible || document.hidden || motion.matches) return;
  ctx.clearRect(0,0,width,height);
  const t = (now-start)/1000;
  const decay = Math.max(0,1-t/3);
  ctx.fillStyle = '#e2ffbe';
  if(decay>0) for(const p of grains){
    ctx.globalAlpha=decay*p.v; const scale=1+p.z*decay*.8;
    ctx.fillRect(p.x+decay*(p.v-.5)*95,p.y-decay*p.z*80,scale*2,scale);
  }
  for(let i=0;i<32;i++){
    const z=(i%5+1)/5;
    const x=(i*137.3+t*(2+z*4))%width, y=height*(.43+((i*31)%54)/100)+Math.sin(t*.35+i)*9;
    ctx.globalAlpha=(.18+.15*Math.sin(t+i))*z;
    ctx.fillRect(x,y,1+z*2,1+z);
  }
  hero.style.setProperty('--offset', Math.min(scrollY*.12, height*.035)+'px');
  frame=requestAnimationFrame(paint);
}
function resume(){if(!frame && visible && !document.hidden && !motion.matches) frame=requestAnimationFrame(paint)}
if(ctx){
  resize(); new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;resume()}).observe(hero);
  motion.addEventListener('change',resume);document.addEventListener('visibilitychange',resume);resume();
  hero.addEventListener('pointermove',event=>{if(event.pointerType==='mouse'&&!motion.matches)hero.style.setProperty('--turn',((event.clientX/width-.5)*2.6)+'deg')});
}
