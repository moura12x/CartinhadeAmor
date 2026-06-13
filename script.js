/* ══════════════════════════════════════
   ✦  CONFIGURAÇÕES — edite aqui  ✦
══════════════════════════════════════ */

// Data de início do relacionamento (Ano, Mês-1, Dia)
// Exemplo: new Date(2024, 8, 15) = 15 de setembro de 2024
const START_DATE = new Date(2024, 0, 1); // ← EDITE AQUI

// Músicas — coloque o link do YouTube Music e o nome
const SONGS = [
  {
    name: "A thousand years",
    artist: "Christine Perri",
    url: "https://music.youtube.com/watch?v=TA1W-pHNKl8&si=E1s5pQf4njOldIuH",   // ← EDITE AQUI
    note: "Porque pode passar mil anos, eu estaria esperando por você"
  },
  {
    name: "Velha infancia",
    artist: "Tribalistas",
    url: "https://music.youtube.com/watch?v=iyJDuJggiEM&list=PLwzGYhf1wmIUg-1xuCzsJCwOQbtbjaLk_",   // ← EDITE AQUI
    note: "Tu és, simplesmente, um sonho pra mim."
  },
  {
    name: "Tenessee whiskey",
    artist: "Chris Stapleton",
    url: "https://music.youtube.com/watch?v=l6_w3887Rwo&si=6A16p8xmqgnGoVvu",   // ← EDITE AQUI
    note: "Seus lábios, seu cheiro, seu jeito de ser... São suaves como o Whiskey de tennesse."
  },
];

// Declaração (escreva entre as aspas, use \n para pular linha)
const DECLARACAO = "Clarice, quem diria que estaríamos juntos. Bom, na verdade, muitos diziam. 🤣 \n Talvez a gente era tchongo de mais para enxergar isso, de toda forma, talvez foi melhor assim.\n  Eu só tenho a agradecer a Deus pela oportunidade de cada dia me tornar um homem melhor e poder te fazer feliz da melhor maneira.\n Dentre todas as minhas orações, meu amor, uma delas é a permisão de Deus de poder envelhecer ao seu lado e aproveitar cada segundo concedido. \n Você é o tipo de pessoa que me cativa sabe? Inteligente, simpática e com uma visão de mundo incrivelmente autêntica. Todos esses detalhes, cada olhar, cada gesto, me faz ser perdidamente cativo e talvez se perder seja o melhor caminho. Se por dentro você é maginífica, o exterior não poderia ser diferente. Você é toda linda meu amor, em você não há defeito algum. Seus olhos, seu sorriso, seu cabelo e cada curva do seu corpo são como um evento cósmico e , de certo, todo o universo para pra te aplaudir. \n Eu falei, falei e falei mas acho que tudo isso pode se resumir com um Eu te amo Clarice       "; // ← EDITE AQUI

/* ════════════════════════════════════ */


// ── Declaração ──
if (DECLARACAO !== "DECLARAÇÃO_AQUI") {
  document.getElementById('letterText').textContent = DECLARACAO;
  document.querySelector('.letter-placeholder').style.display = 'none';
}

// ── Envelope ──
function openEnvelope() {
  const env  = document.getElementById('envelope');
  const card = document.getElementById('letterCard');
  if (env.classList.contains('open')) return;
  env.classList.add('open');
  card.classList.add('show');
  setTimeout(() => card.classList.add('animate'), 50);
}

// ── QR Codes ──
function buildMusics() {
  const grid = document.getElementById('musicsGrid');
  SONGS.forEach(song => {
    const card = document.createElement('div');
    card.className = 'music-card';
    const qrId = 'qr-' + song.name.replace(/\s/g, '_');
    card.innerHTML = `
      <div class="music-qr" id="${qrId}"></div>
      <div class="music-name">${song.name}</div>
      <div class="music-artist">${song.artist}</div>
      <div class="music-note">${song.note}</div>
    `;
    card.onclick = () => window.open(song.url, '_blank');
    grid.appendChild(card);
    setTimeout(() => {
      new QRCode(document.getElementById(qrId), {
        text: song.url,
        width: 120,
        height: 120,
        colorDark: "#8b3a52",
        colorLight: "#fdf0f3",
        correctLevel: QRCode.CorrectLevel.M
      });
    }, 300);
  });
}
buildMusics();

// ── Contador ──
function pad(n) { return String(n).padStart(2, '0'); }

function updateCounter() {
  const now  = new Date();
  const diff = now - START_DATE;
  if (diff < 0) return;

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  document.getElementById('cnt-days').textContent  = d;
  document.getElementById('cnt-hours').textContent = pad(h);
  document.getElementById('cnt-min').textContent   = pad(m);
  document.getElementById('cnt-sec').textContent   = pad(s);

  const months = [
    'janeiro','fevereiro','março','abril','maio','junho',
    'julho','agosto','setembro','outubro','novembro','dezembro'
  ];
  document.getElementById('cnt-since').textContent =
    `${START_DATE.getDate()} de ${months[START_DATE.getMonth()]} de ${START_DATE.getFullYear()}`;
}
updateCounter();
setInterval(updateCounter, 1000);

// ── Scroll reveal ──
const revealSections = document.querySelectorAll('section');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
revealSections.forEach(s => io.observe(s));

// ── Pétalas ──
const canvas = document.getElementById('petals-canvas');
const ctx    = canvas.getContext('2d');
let W, H;

function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

const petalColors = ['#f2c4ce', '#e8a0b0', '#f9dce5', '#d4879a', '#fae0e7'];

const petals = Array.from({ length: 28 }, () => ({
  x:        Math.random() * window.innerWidth,
  y:        Math.random() * window.innerHeight - window.innerHeight,
  r:        4 + Math.random() * 5,
  speed:    0.6 + Math.random() * 0.9,
  wind:     -0.3 + Math.random() * 0.6,
  rot:      Math.random() * Math.PI * 2,
  rotSpeed: (Math.random() - 0.5) * 0.04,
  color:    petalColors[Math.floor(Math.random() * petalColors.length)],
  opacity:  0.5 + Math.random() * 0.5
}));

function drawPetal(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle   = p.color;
  ctx.beginPath();
  ctx.ellipse(0, 0, p.r * 1.4, p.r * 0.7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function animatePetals() {
  ctx.clearRect(0, 0, W, H);
  petals.forEach(p => {
    p.y += p.speed; p.x += p.wind; p.rot += p.rotSpeed;
    if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
    if (p.x > W + 20) p.x = -20;
    if (p.x < -20)    p.x = W + 20;
    drawPetal(p);
  });
  requestAnimationFrame(animatePetals);
}
animatePetals();

// ── Cursor coração ──
const hc = document.getElementById('heartCursor');

document.addEventListener('mousemove', e => {
  hc.style.left    = e.clientX + 'px';
  hc.style.top     = e.clientY + 'px';
  hc.style.opacity = 1;
  if (Math.random() < 0.15) spawnTrail(e.clientX, e.clientY);
});

function spawnTrail(x, y) {
  const el = document.createElement('div');
  el.className   = 'burst-heart';
  el.textContent = '♡';
  el.style.left     = x + 'px';
  el.style.top      = y + 'px';
  el.style.fontSize = (10 + Math.random() * 8) + 'px';
  el.style.color    = petalColors[Math.floor(Math.random() * petalColors.length)];
  el.style.setProperty('--tx', `translate(${(Math.random() - 0.5) * 60}px, ${-40 - Math.random() * 40}px)`);
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

// ── Burst coração no footer ──
function heartBurst(e) {
  const x = e.clientX, y = e.clientY;
  const symbols = ['♡', '❤', '♥', '❀'];
  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div');
    el.className   = 'burst-heart';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left     = x + 'px';
    el.style.top      = y + 'px';
    el.style.fontSize = (14 + Math.random() * 16) + 'px';
    el.style.color    = petalColors[Math.floor(Math.random() * petalColors.length)];
    const angle = (i / 12) * Math.PI * 2;
    const dist  = 60 + Math.random() * 80;
    el.style.setProperty('--tx', `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 40}px)`);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
}

// ── Estrelinhas fundo ──
const bg = document.getElementById('bgOrnament');
for (let i = 0; i < 30; i++) {
  const s = document.createElement('span');
  s.style.left  = Math.random() * 100 + '%';
  s.style.top   = Math.random() * 100 + '%';
  s.style.setProperty('--d', (2 + Math.random() * 4) + 's');
  s.style.animationDelay = (Math.random() * 4) + 's';
  bg.appendChild(s);
}

// ── Lightbox ──
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <span class="lightbox-close" id="lightbox-close">✕</span>
  <img id="lightbox-img" src="" alt="">
  <span class="lightbox-caption" id="lightbox-caption"></span>
`;
document.body.appendChild(lightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

function openLightbox(src, caption) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-caption').textContent = caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
