/* Lógica de la invitación: sobre, música, animaciones, formularios. */
{

const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const C = CONFIG;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = v => Math.max(0, Math.min(1, v));
let lang = "es";
try { const sv = localStorage.getItem("inv-lang"); if (sv === "en" || sv === "es") lang = sv; } catch {}
const L = () => UI[lang];
const T = v => (v && typeof v === "object") ? (v[lang] ?? v.es ?? "") : (v ?? "");
const pareja = () => `${C.novia} ${lang === "en" ? "&" : "y"} ${C.novio}`;
const gid = decodeURIComponent((location.hash || "").slice(1));
const guest = C.invitados[gid];
const maxPases = guest ? guest.pases : C.pasesPorDefecto;

/* Ramos botánicos: eucalipto + gypsophila seca */
const rand = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const ramo = seed => {
  const r = rand(seed * 7 + 3), id = "o" + seed;
  let stems = "", leaves = "", dots = "";
  const n = 7;
  for (let s = 0; s < n; s++) {
    const ang = (8 + s * (74 / (n - 1)) + (r() - .5) * 6) * Math.PI / 180, len = 150 + r() * 140;
    const ex = 8 + Math.cos(ang) * len, ey = 8 + Math.sin(ang) * len;
    const bend = (r() - .5) * 60, cx = 8 + Math.cos(ang) * len * .5 - Math.sin(ang) * bend, cy = 8 + Math.sin(ang) * len * .5 + Math.cos(ang) * bend;
    stems += `<path pathLength="1" d="M8 8Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}"/>`;
    const dried = s % 3 === 1;
    for (let k = 2; k <= 9; k++) {
      const t = k / 10, px = (1 - t) ** 2 * 8 + 2 * (1 - t) * t * cx + t * t * ex, py = (1 - t) ** 2 * 8 + 2 * (1 - t) * t * cy + t * t * ey;
      const nx = -Math.sin(ang), ny = Math.cos(ang), sd = k % 2 ? 1 : -1, off = 9 + r() * 5;
      const lx = px + nx * off * sd, ly = py + ny * off * sd, i = (.25 + s * .12 + k * .07).toFixed(2);
      if (dried) {
        for (let q = 0; q < 3; q++) dots += `<circle class="dt" style="--i:${i}s" cx="${(lx + (r() - .5) * 14).toFixed(1)}" cy="${(ly + (r() - .5) * 14).toFixed(1)}" r="${(1.6 + r() * 2).toFixed(1)}" fill="${r() > .5 ? "#fbf6ee" : "#d9c7ab"}" stroke="#b8a690" stroke-width=".5"/>`;
      } else {
        const rx = (10 + r() * 8) * (1 - t * .35), ry = rx * (.75 + r() * .2);
        leaves += `<ellipse class="lf" style="--i:${i}s" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="url(#${id}${r() > .3 ? "s" : "t"})" opacity="${(.7 + r() * .3).toFixed(2)}"/>`;
      }
    }
  }
  return `<svg viewBox="0 0 320 320" aria-hidden="true"><defs>
    <radialGradient id="${id}s" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#b9c3b3"/><stop offset=".7" stop-color="#8a9886"/><stop offset="1" stop-color="#6f7d6b"/></radialGradient>
    <radialGradient id="${id}t" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#d8c6ad"/><stop offset="1" stop-color="#9a8170"/></radialGradient>
    <filter id="${id}w"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="${seed}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5"/></filter></defs>
    <g fill="none" stroke="#8c705c" stroke-width="1.1" stroke-linecap="round" opacity=".8">${stems}</g><g filter="url(#${id}w)">${leaves}</g><g>${dots}</g></svg>`;
};
document.querySelectorAll("[data-orn]").forEach(el => el.innerHTML = ramo(+el.dataset.orn));

/* Fotos: cada "fotos/x.jpg" del config se sirve como WebP en dos tamaños
   (fotos/x-movil.webp 800 px y fotos/x-pc.webp 1200 px); el navegador elige según la pantalla.
   Mientras carga, se ve una vista previa difuminada (js/fotos-previa.js). */
const SZ = { escena: "(max-aspect-ratio: 2/3) 67vh, 100vw", pol: "(max-width: 600px) 36vw, 230px", print: "(max-width: 600px) 66vw, 330px", visor: "92vw" };
const foto = src => {
  if (!src || /^data:/.test(src) || !/\.jpe?g$/i.test(src)) return { src };
  const b = src.replace(/\.jpe?g$/i, "");
  return { src: b + "-pc.webp", srcset: `${b}-movil.webp 800w, ${b}-pc.webp 1200w` };
};
const previa = src => (typeof PREVIAS !== "undefined" && PREVIAS[src]) || "";
/* las fotos que ya se usan de fondo se reutilizan (misma versión ya descargada) */
const ESCENAS = new Set(["portada", "frase", "itinerario", "vestimenta", "rsvp", "cierre"].map(k => C.fotos[k]).filter(Boolean));
const imgAttrs = (src, sizes) => {
  const f = ESCENAS.has(src) ? { src: foto(src).src } : foto(src), p = previa(src);
  return `src="${esc(f.src)}"` + (f.srcset ? ` srcset="${esc(f.srcset)}" sizes="${esc(sizes)}"` : "") + (p ? ` style="background:url('${esc(p)}') center/cover no-repeat"` : "") + ` decoding="async" onload="this.style.background=''"`;
};
const setImg = (img, src, sizes) => {
  const f = foto(src), p = previa(src);
  if (p) img.style.background = `url("${p}") center/cover no-repeat`;
  img.addEventListener("load", () => { img.style.background = ""; }, { once: true });
  if (f.srcset) { img.sizes = sizes; img.srcset = f.srcset; } else { img.removeAttribute("srcset"); }
  img.src = f.src;
};

/* Fotos por momento */
for (const k of ["portada", "frase", "itinerario", "vestimenta", "rsvp", "cierre"]) {
  const img = $("ph-" + k), src = C.fotos[k];
  if (src) { setImg(img, src, SZ.escena); img.alt = `${C.novia} & ${C.novio}`; } else img.hidden = true;
}

const fillSelect = (sel, from, to, keep) => { sel.innerHTML = ""; for (let i = from; i <= to; i++) sel.add(new Option(i, i)); sel.value = Math.min(Math.max(keep, from), to); };
const copyBtn = (btn, text, label) => btn.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(text); btn.textContent = L().copiado; } catch { btn.textContent = L().copiaManual; }
  setTimeout(() => btn.textContent = label(), 2200);
});
const ICON_IT = ["ring", "glass", "plate", "music", "cake", "moon"];

function render() {
  const U = L();
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i]").forEach(el => { const v = U[el.dataset.i]; if (typeof v === "string") el.textContent = v; });
  document.querySelectorAll("#lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.l === lang));
  document.title = `${C.novia} & ${C.novio}`;
  const both = `${C.novia} & ${C.novio}`;

  $("n1").textContent = C.novia; $("n2").textContent = C.novio; $("sealTxt").textContent = C.iniciales;
  $("letterNames").textContent = both; $("cNames").textContent = both; $("footNames").textContent = both; $("sign").textContent = both;
  $("heroShort").textContent = C.fechaCorta; $("footDate").textContent = C.fechaCorta; $("cDate").textContent = T(C.fechaTexto);
  $("frase").textContent = T(C.frase);
  $("sobreGuest").textContent = guest ? U.para + guest.nombre : U.tienes;
  $("introGuest").textContent = guest ? guest.nombre : ""; $("introGuest").hidden = !guest;
  $("bienv").textContent = T(C.bienvenida);
  $("countOver").textContent = guest ? `${guest.nombre} · ${U.cuentaT}` : U.cuentaT;

  {
    const f = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const st = new Date(C.fecha), en = new Date(st.getTime() + 9 * 3600e3), l0 = C.lugares[0];
    $("calBtn").href = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(`${U.calTitulo} ${pareja()}`) +
      "&dates=" + f(st) + "/" + f(en) + "&location=" + encodeURIComponent(l0.nombre + ", " + l0.dir);
  }

  $("prints").innerHTML = (C.fotos.galeria || []).slice(0, 14).map((src, i) => { const l = i % 2 === 0, rot = (l ? -1 : 1) * (2 + (i * 7 % 5)); return `<button type="button" class="print ${l ? "l" : "r"}" data-p="${i}" data-rot="${rot}" style="transform:rotate(${rot}deg)" aria-label="${esc(U.foto)} ${i + 1}"><img ${imgAttrs(src, SZ.print)} alt="${esc(pareja())}" loading="lazy"></button>`; }).join("");
  $("pol").innerHTML = (C.fotos.bienvenida || C.fotos.galeria || []).slice(0, 3).map((src, i) => `<button type="button" data-g="${i}" aria-label="${esc(U.foto)} ${i + 1}"><img ${imgAttrs(src, SZ.pol)} alt="${esc(pareja())}" loading="lazy"><span>${esc(both)}</span></button>`).join("");

  {
    const grp = p => `<div class="grp"><h3>${esc(T(p.rol))}</h3>${p.nombres.map(n => `<p>${esc(n)}</p>`).join('<span class="amp">&amp;</span>')}</div>`;
    const nm = C.nombramientos;
    $("people").innerHTML = nm.slice(0, 2).map(grp).join("") + (nm.length > 2 ? `<svg class="flour"><use href="#flour"/></svg><div class="grid">${nm.slice(2).map(grp).join("")}</div>` : "");
  }

  $("lugares").innerHTML = C.lugares.map(l => `<div class="card" data-fx><svg class="ico"><use href="#i-${l.icono === "glass" ? "glass" : "ring"}"/></svg>
    <p class="over" style="margin:6px 0 0">${esc(T(l.tipo))}</p><h3>${esc(l.nombre)}</h3><hr class="dots">
    <p class="muted" style="margin:0">${esc(l.dir)}</p><p class="time" style="margin:8px 0 0">${esc(l.hora)}</p>
    <a class="btn solid" href="${esc(l.mapa)}" target="_blank" rel="noopener">${esc(U.llegar)}</a></div>`).join("");

  $("sched").innerHTML = `<span class="prog" id="tlProg"></span>` + C.itinerario.map((i, k) => `<li><span class="dot"><svg><use href="#i-${esc(i.icono || ICON_IT[k % 6])}"/></svg></span><div><time>${esc(i.hora)}</time><b>${esc(T(i.t))}</b><em>${esc(T(i.d))}</em></div></li>`).join("");

  $("info").innerHTML = C.info.map(i => `<div><svg class="ico"><use href="#i-${esc(i.icono)}"/></svg><h3>${esc(T(i.t))}</h3><p class="muted">${esc(T(i.d))}</p></div>`).join("");

  $("dressTitle").textContent = T(C.vestimenta.titulo); $("dressNote").textContent = T(C.vestimenta.nota);
  $("dressColors").innerHTML = C.vestimenta.colores.map(c => `<i style="background:${esc(c)}"></i>`).join("");

  const M = C.mostrar || {};
  $("menu").closest("section").hidden = M.menu === false;
  $("hoteles").closest("section").hidden = M.hospedaje === false;
  $("menu").innerHTML = C.menu.map(m => `<li><span>${esc(T(m.tiempo))}</span><b>${esc(T(m.plato))}</b></li>`).join("");

  $("hospNote").textContent = T(C.hospedaje.nota);
  $("hoteles").innerHTML = C.hospedaje.hoteles.map((h, k) => `<div class="card" data-fx><svg class="ico"><use href="#i-bed"/></svg><h3>${esc(h.nombre)}</h3>
    <p class="muted" style="margin:0">${esc(T(h.dist))}</p>
    ${h.codigo ? `<hr class="dots"><p class="over" style="margin:0 0 6px">${esc(U.codigo)}</p><span class="code">${esc(h.codigo)}</span>
    ${T(h.nota) ? `<p class="muted" style="margin:8px 0 0;font-size:16px;font-style:italic">${esc(T(h.nota))}</p>` : ""}<button class="btn" type="button" data-code="${k}">${esc(U.copiarCod)}</button>` : ""}
    <div class="row" style="margin-top:6px"><a class="btn solid" href="${esc(h.reservar)}" target="_blank" rel="noopener">${esc(U.reservar)}</a><a class="btn" href="${esc(h.mapa)}" target="_blank" rel="noopener">${esc(U.llegar)}</a></div></div>`).join("");
  document.querySelectorAll("[data-code]").forEach(b => copyBtn(b, C.hospedaje.hoteles[b.dataset.code].codigo, () => L().copiarCod));

  {
    const R = C.regalos, b = R.banco;
    $("giftNote").textContent = T(R.nota);
    $("gifts").innerHTML =
      `<div class="card" data-fx><svg class="ico"><use href="#i-env"/></svg><h3>${esc(U.sobresT)}</h3><p class="muted" style="margin:0;font-style:italic">${esc(T(R.sobres))}</p></div>` +
      `<div class="card" data-fx><svg class="ico"><use href="#i-bank"/></svg><h3>${esc(U.transfer)}</h3><hr class="dots"><p style="margin:0">${esc(b.banco)}</p><p style="margin:0">${esc(b.titular)}</p>
        <p class="time" style="font-size:18px;margin-top:6px">${esc(b.cuenta)}</p><button class="btn" id="copyAcc" type="button">${esc(U.copiarCta)}</button></div>` +
      (R.enlaces.length && M.listaRegalos !== false ? `<div class="card" data-fx><svg class="ico"><use href="#i-gift"/></svg><h3>${esc(U.listaT)}</h3>${R.enlaces.map(e => `<a class="btn solid" href="${esc(e.url)}" target="_blank" rel="noopener">${esc(T(e.nombre))}</a>`).join("")}</div>` : "");
    copyBtn($("copyAcc"), b.cuenta, () => L().copiarCta);
  }

  $("rsvpLimit").textContent = U.antes + T(C.confirmarAntes) + "." + (guest ? U.reservados(maxPases) + (guest.mesa ? U.tuMesa(guest.mesa) : "") : "");
  $("adultsNote").hidden = !C.soloAdultos; $("adultsNote").textContent = U.soloAdultosTxt;
  if (C.soloAdultos) $("fAdultos").previousElementSibling.textContent = U.personas;
  if (guest) { $("pass").hidden = false; $("pass").innerHTML = `<p class="over" style="margin:0">${esc(U.pase)}</p><p class="n" style="margin:8px 0 4px">${esc(guest.nombre)}</p><hr class="dots"><div class="nums"><div><b>${esc(guest.pases)}</b><span class="cz" style="font-size:11px">${esc(U.lugaresT)}</span></div>${guest.mesa ? `<div><b>${esc(guest.mesa)}</b><span class="cz" style="font-size:11px">${esc(U.mesa)}</span></div>` : ""}</div>`; }
  $("rsvpOut").textContent = "";
  $("tag").textContent = C.hashtag; $("grupo").href = C.grupoFotos; $("fSong").placeholder = U.cancionPh; $("songOut").textContent = "";
  setBtn(!audio.paused);
  prepare();
}

/* Formularios */
fillSelect($("fAdultos"), 1, maxPases, maxPases);
fillSelect($("fNinos"), 0, Math.max(0, maxPases - 1), 0);
if (C.soloAdultos) { $("fNinos").closest("label").hidden = true; $("countFields").style.gridTemplateColumns = "1fr"; }
if (guest) $("fNombre").value = guest.nombre;
document.querySelectorAll("input[name=asis]").forEach(r => r.addEventListener("change", () => { $("countFields").hidden = r.value === "no" && r.checked; }));
const waLink = (out, msg, txt) => {
  const url = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;
  out.innerHTML = `${esc(txt)}<br><a class="btn solid" style="margin-top:12px" href="${esc(url)}" target="_blank" rel="noopener">${esc(L().abrirWa)}</a>`;
};
$("rsvpForm").addEventListener("submit", e => {
  e.preventDefault();
  const U = L(), out = $("rsvpOut"), nombre = $("fNombre").value.trim();
  out.classList.remove("err");
  if (!nombre) { out.textContent = U.falta; out.classList.add("err"); $("fNombre").focus(); return; }
  const si = document.querySelector("input[name=asis]:checked").value === "si";
  const a = +$("fAdultos").value, k = C.soloAdultos ? 0 : +$("fNinos").value;
  if (si && a + k > maxPases) { out.textContent = U.excede(maxPases); out.classList.add("err"); return; }
  let msg = si ? U.waSi(nombre, a, k, pareja()) : U.waNo(nombre, pareja());
  if (guest && guest.mesa) msg += U.waMesa(guest.mesa);
  if ($("fMsg").value.trim()) msg += " " + U.waMsg + $("fMsg").value.trim();
  waLink(out, msg, U.tocaEnviar);
});
$("songForm").addEventListener("submit", e => {
  e.preventDefault();
  const U = L(), s = $("fSong").value.trim();
  if (!s) { $("songOut").textContent = U.faltaCancion; return; }
  waLink($("songOut"), U.waSong(s), U.tocaCancion);
});
copyBtn($("copyTag"), C.hashtag, () => L().copiarTag);

/* Visor de fotos */
{
  const lb = $("lb"), im = $("lbImg");
  let gl = [], cur = 0;
  const open = (list, i) => { gl = list || []; if (!gl.length) return; show(i); lb.classList.add("on"); $("lbX").focus(); };
  const show = i => { cur = (i + gl.length) % gl.length; setImg(im, gl[cur], SZ.visor); im.alt = pareja(); };
  const close = () => lb.classList.remove("on");
  $("pol").addEventListener("click", e => { const b = e.target.closest("[data-g]"); if (b) open(C.fotos.bienvenida || C.fotos.galeria, +b.dataset.g); });
  $("prints").addEventListener("click", e => { const b = e.target.closest("[data-p]"); if (b) open(C.fotos.galeria, +b.dataset.p); });
  $("lbX").addEventListener("click", close);
  $("lbP").addEventListener("click", () => show(cur - 1)); $("lbN").addEventListener("click", () => show(cur + 1));
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  document.addEventListener("keydown", e => { if (!lb.classList.contains("on")) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); });
}

/* Música */
const audio = $("audio"), mBtn = $("musica");
function setBtn(on) { mBtn.classList.toggle("on", on); mBtn.setAttribute("aria-label", on ? L().pausa : L().play); mBtn.title = mBtn.getAttribute("aria-label"); }
if (C.musica) audio.src = C.musica;
const play = () => audio.play().then(() => { mBtn.style.display = "grid"; setBtn(true); }).catch(() => { if (C.musica && !audio.error) { mBtn.style.display = "grid"; setBtn(false); } });
audio.addEventListener("error", () => { mBtn.style.display = "none"; });
mBtn.addEventListener("click", () => { if (audio.paused) play(); else { audio.pause(); setBtn(false); } });
let wasPlaying = false;
document.addEventListener("visibilitychange", () => { if (document.hidden) { wasPlaying = !audio.paused; audio.pause(); } else if (wasPlaying) play(); });

/* Entradas (una vez) */
let started = false;
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { const t = x.target; (t._kids || [t]).forEach(k => k.classList.add("in")); io.unobserve(t); } }), { threshold: .12 });
const watch = el => { if (el.dataset.a === "write") { const p = el.parentElement; (p._kids ||= []).push(el); io.observe(p); } else io.observe(el); };
function prepare() {
  document.querySelectorAll("[data-a]:not([data-obs]),.corner:not([data-obs])").forEach(el => {
    if (el.dataset.d) el.style.setProperty("--d", el.dataset.d + "s");
    if (reduce) { el.classList.add("in"); return; }
    if (started) { el.dataset.obs = 1; watch(el); }
  });
  fxEls = [...document.querySelectorAll("[data-fx]")];
}

/* Motor de scroll: fotos fijas que se disuelven + contenido que aparece y se desvanece */
const scenes = [...document.querySelectorAll(".scene")];
let fxEls = [], ticking = false;
const big = () => innerWidth > 800;
function frame() {
  ticking = false;
  const vh = innerHeight;
  for (const sc of scenes) {
    const r = sc.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) continue;
    const inO = sc.classList.contains("first") ? 1 : clamp((vh - r.top) / (vh * .7));
    const first = sc.classList.contains("first");
    /* la portada se desvanece mientras sube su texto, sin dejar pantalla vacía */
    const outO = sc.classList.contains("last") ? 1 : first ? clamp(r.bottom / vh * 1.25 - .25) : clamp((r.bottom - vh * .3) / (vh * .7)); /* la foto se disuelve mientras entra la siguiente sección, sin pantalla vacía */
    const o = Math.min(inO, outO), p = clamp(-r.top / Math.max(1, r.height - vh));
    const st = sc.querySelector(".stage");
    st.style.opacity = o.toFixed(3);
    const bg = sc.querySelector(".sbg");
    if (!sc.classList.contains("first") || started) bg.style.transform = `scale(${(1.02 + p * .1).toFixed(4)})`;
    bg.style.filter = o < .995 && big() ? `blur(${((1 - o) * 14).toFixed(1)}px)` : "none";
  }
  for (const el of fxEls) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -80 || r.top > vh + 80) { el.style.opacity = 0; continue; }
    const mode = el.dataset.fx;
    const inO = mode === "out" ? 1 : clamp((vh - r.top) / (vh * .3));
    const outO = clamp((r.bottom - vh * .02) / (vh * .34));
    const o = Math.min(inO, outO);
    el.style.opacity = o.toFixed(3);
    el.style.translate = `0 ${((1 - inO) * 50 - (1 - outO) * 40).toFixed(1)}px`;
    el.style.filter = o < .99 && big() ? `blur(${((1 - o) * 9).toFixed(1)}px)` : "none";
  }
  /* galería: cada foto entra desde su lado y se acomoda girando */
  for (const el of document.querySelectorAll(".print")) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) continue;
    const pp = clamp((vh - r.top) / (vh * .55)), dir = el.classList.contains("l") ? -1 : 1, base = +el.dataset.rot;
    el.style.transform = `translateX(${((1 - pp) * dir * 75).toFixed(1)}vw) rotate(${(base + (1 - pp) * dir * 16).toFixed(2)}deg)`;
    el.style.opacity = (.15 + pp * .85).toFixed(3);
  }
  const tl = $("sched"), pr = $("tlProg");
  if (tl && pr) { const r = tl.getBoundingClientRect(); pr.style.setProperty("--p", clamp((vh * .65 - r.top) / r.height).toFixed(3)); }
}
const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
if (!reduce) { addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll); }

/* Pétalos */
function petals() {
  if (reduce) return;
  const cv = $("petals"), cx = cv.getContext("2d"); let W, H; const dpr = Math.min(2, devicePixelRatio || 1);
  const size = () => { W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr; };
  size(); addEventListener("resize", size);
  const cols = ["#d9c7ab", "#efe4d3", "#9aa596", "#fbf6ee"];
  const P = Array.from({ length: innerWidth < 600 ? 9 : 15 }, () => ({ x: Math.random(), y: Math.random(), s: 5 + Math.random() * 8, v: .0002 + Math.random() * .0005, a: Math.random() * 6, w: .5 + Math.random(), c: cols[Math.random() * 4 | 0] }));
  let run = true; document.addEventListener("visibilitychange", () => { run = !document.hidden; if (run) requestAnimationFrame(f); });
  function f() {
    if (!run) return;
    cx.clearRect(0, 0, W, H);
    for (const p of P) {
      p.y += p.v; p.a += .01 * p.w; if (p.y > 1.05) { p.y = -.05; p.x = Math.random(); }
      const x = (p.x + Math.sin(p.a) * .03) * W, y = p.y * H, s = p.s * dpr;
      cx.save(); cx.translate(x, y); cx.rotate(p.a); cx.scale(1, .55 + .45 * Math.sin(p.a * 1.7));
      cx.globalAlpha = .5; cx.fillStyle = p.c; cx.beginPath(); cx.ellipse(0, 0, s, s * .6, 0, 0, Math.PI * 2); cx.fill(); cx.restore();
    }
    requestAnimationFrame(f);
  }
  requestAnimationFrame(f);
}

/* Abrir sobre */
let opened = false;
const abrir = () => {
  if (opened) return; opened = true;
  $("sobre").classList.add("open");
  if (C.musica) { audio.volume = 0; play(); let v = 0; const fd = setInterval(() => { v = Math.min(1, v + .04); audio.volume = v; if (v >= 1) clearInterval(fd); }, 120); }
  setTimeout(() => {
    document.body.style.overflow = ""; started = true;
    $("hero").classList.add("go");
    document.querySelectorAll("[data-a]:not(.in),.corner:not(.in)").forEach(el => { el.dataset.obs = 1; watch(el); });
    petals(); frame();
  }, reduce ? 0 : 1900);
};
document.body.style.overflow = "hidden";
$("sobreEnv").addEventListener("click", abrir);

/* Idioma */
document.querySelectorAll("#lang button").forEach(b => b.addEventListener("click", () => {
  lang = b.dataset.l; try { localStorage.setItem("inv-lang", lang); } catch {}
  render(); frame();
}));

/* Cuenta regresiva */
const target = new Date(C.fecha).getTime();
const tick = () => {
  const d = Math.max(0, target - Date.now()) / 1000;
  [Math.floor(d / 86400), Math.floor(d % 86400 / 3600), Math.floor(d % 3600 / 60), Math.floor(d % 60)].forEach((v, i) => $("cd-" + "dhms"[i]).textContent = String(v).padStart(2, "0"));
};

render(); tick(); setInterval(tick, 1000); frame();
}
