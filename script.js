/*
 * Identidad de marca: comportamiento del componente.
 * Todo el código vive dentro de esta función: no deja variables globales.
 */
(function () {
  // ── Imágenes del componente (carpeta img/ junto a este archivo) ──
  // Para sustituir una imagen: reemplaza el archivo manteniendo el nombre y
  // actualiza `ancho` y `alto`. Los `puntos` son coordenadas relativas (0–1).
  const S = (function () {
    const base = new URL('img/', document.currentScript.src).href;

    const IMAGENES = {
      escudo: {
        archivo: 'escudo.webp', ancho: 560, alto: 560,
        alt: 'Escudo de Manchester City',
        demuestra: 'El identificador visual del club.',
        puntos: { barco: [.60, .40], anio: [.935, .505], rios: [.66, .60], rosa: [.58, .65] }
      },
      equipo1: {
        archivo: 'equipo-1.webp', ancho: 1000, alto: 563,
        alt: 'Jugadores de Manchester City celebrando con la equipación azul celeste',
        demuestra: 'El equipo al que nombra la denominación Manchester City.',
        puntos: { centro: [.5, .42] }
      },
      equipo2: {
        archivo: 'equipo-2.webp', ancho: 1000, alto: 750,
        alt: 'Plantilla de Manchester City celebrando con el trofeo de la UEFA Champions League 2022/23',
        demuestra: 'El club como colectivo reconocible bajo un mismo nombre.',
        puntos: { centro: [.47, .56] }
      }
    };

    Object.keys(IMAGENES).forEach(function (k) { IMAGENES[k].src = base + IMAGENES[k].archivo; });

    function crearImagen(clave) {
      const d = IMAGENES[clave];
      const img = new Image();
      img.src = d.src;
      img.alt = d.alt;
      img.decoding = 'async';
      img.draggable = false;
      return img;
    }

    // Coloca la imagen dentro de su marco como `object-fit: cover`, centrando
    // un punto de interés y aplicando un zoom opcional. Nunca deforma la imagen.
    function encuadrar(marco, img, clave, opciones) {
      const d = IMAGENES[clave];
      const o = opciones || {};
      const p = typeof o.punto === 'string' ? d.puntos[o.punto] : (o.punto || [.5, .5]);
      const cw = marco.clientWidth, ch = marco.clientHeight;
      if (!cw || !ch) return;
      const escala = Math.max(cw / d.ancho, ch / d.alto) * (o.zoom || 1);
      const w = d.ancho * escala, h = d.alto * escala;
      const x = Math.min(0, Math.max(cw - w, cw / 2 - p[0] * w));
      const y = Math.min(0, Math.max(ch - h, ch / 2 - p[1] * h));
      img.style.position = 'absolute';
      img.style.maxWidth = 'none';
      img.style.left = x + 'px';
      img.style.top = y + 'px';
      img.style.width = w + 'px';
      img.style.height = h + 'px';
      img.style.transformOrigin = (p[0] * w) + 'px ' + (p[1] * h) + 'px';
    }

    return { IMAGENES: IMAGENES, crearImagen: crearImagen, encuadrar: encuadrar };
  })();

  /*
   * Contenido de la secuencia. Cada paso tiene su concepto (título),
   * una explicación breve y la animación de su capa.
   * Los datos del escudo proceden de la presentación oficial del club
   * (City Football Group); el resto, del propio análisis.
   * `duracion` es el tiempo (ms) antes de avanzar solo al siguiente paso.
   */

  // Paso 3: la leyenda avanza con la animación, frase a frase.
  const narrativa = [
    'Una identidad no es un solo elemento.',
    'Es la combinación de varios códigos.',
    'Cuando esos códigos se mantienen coherentes y consistentes…',
    '…se vuelven reconocibles, y la marca adquiere una identidad propia.'
  ];

  const pasos = [
    {
      etiqueta: 'Pregunta',
      concepto: '¿Qué hace reconocible a una marca?',
      pregunta: true,
      explicacion: 'No solo su logotipo. Una marca se reconoce por la combinación coherente de su nombre, sus símbolos y su forma de presentarse.',
      duracion: 5500
    },
    {
      etiqueta: '01 · Nombre',
      concepto: 'Nombre',
      explicacion: 'La denominación Manchester City es el componente verbal de la identidad: nombra al club y a su equipo, y sigue siendo reconocible en sus formas cortas, MAN CITY o CITY.',
      duracion: 8500
    },
    {
      etiqueta: '02 · Escudo',
      concepto: 'Escudo',
      explicacion: 'Uno de los principales identificadores visuales del club. Desde 2016 retoma la forma circular y reúne símbolos de Manchester junto al año de fundación.',
      duracion: 12000
    },
    {
      etiqueta: '03 · Identidad',
      concepto: 'Identidad',
      explicacion: narrativa[0],
      resumen: 'Una identidad no es un solo elemento: es la combinación coherente de varios códigos que, al mantenerse reconocibles, dan a la marca una identidad propia.',
      duracion: 11500
    }
  ];

  // Paso 0: lo que se va a explicar (ángulo en grados)
  const orbita = [
    { texto: '01 Nombre', angulo: -90 },
    { texto: '02 Escudo', angulo: 30 },
    { texto: '03 Identidad', angulo: 150 }
  ];

  // Paso 3: códigos que forman la identidad. Antes de ordenarse, cada uno
  // tiene su propia posición (fracción del escenario) y su propio estilo.
  const codigos = [
    { texto: 'Nombre',               ancho: [.2, .2],   estrecho: [.26, .12], tam: 34, peso: 800, anchura: 62,  espaciado: '.01em', color: '--tinta' },
    { texto: 'Símbolos',             ancho: [.78, .18], estrecho: [.74, .28], tam: 26, peso: 300, anchura: 112, espaciado: '.02em', color: '--celeste' },
    { texto: 'Lenguaje visual',      ancho: [.83, .6],  estrecho: [.3, .5],   tam: 12, peso: 600, anchura: 100, espaciado: '.32em', color: '--tinta' },
    { texto: 'Códigos reconocibles', ancho: [.25, .8],  estrecho: [.62, .7],  tam: 20, peso: 700, anchura: 70,  espaciado: '.03em', color: '--celeste' },
    { texto: 'Forma de presentarse', ancho: [.64, .9],  estrecho: [.42, .9],  tam: 21, peso: 400, anchura: 90,  espaciado: '.01em', color: '--gris' }
  ];

  // Paso 2: anatomía del escudo (puntos definidos en IMAGENES, al inicio)
  const anatomia = [
    { punto: 'barco', titulo: 'Barco', detalle: 'Comercio y apertura global de la ciudad' },
    { punto: 'anio', titulo: '1894', detalle: 'Año de fundación del club' },
    { punto: 'rios', titulo: 'Tres ríos', detalle: 'Irwell, Medlock e Irk' },
    { punto: 'rosa', titulo: 'Rosa roja', detalle: 'Herencia temprana del club' }
  ];
  const fuenteEscudo = 'Fuente: City Football Group';

  (function () {
    const NS = 'http://www.w3.org/2000/svg';
    const pieza = document.getElementById('mcp-pieza');
    const lienzo = document.getElementById('mcp-lienzo');
    const texto = document.getElementById('mcp-texto');
    const tPaso = document.getElementById('mcp-texto-paso');
    const tConcepto = document.getElementById('mcp-texto-concepto');
    const tExplicacion = document.getElementById('mcp-texto-explicacion');
    const pista = document.getElementById('mcp-pista');
    const progreso = document.getElementById('mcp-progreso');
    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

    // ── Utilidades ─────────────────────────
    function el(tag, clase, padre, contenido) {
      const n = document.createElement(tag);
      if (clase) n.className = clase;
      if (contenido != null) n.textContent = contenido;
      if (padre) padre.appendChild(n);
      return n;
    }
    function svg(tag, attrs, padre) {
      const n = document.createElementNS(NS, tag);
      for (const k in attrs) n.setAttribute(k, attrs[k]);
      if (padre) padre.appendChild(n);
      return n;
    }
    function vars(n, o) {
      for (const k in o) n.style.setProperty('--' + k, typeof o[k] === 'number' ? o[k] + 'px' : o[k]);
    }
    const acotar = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
    const suave = function (p) { return p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; };
    const salida = function (p) { return 1 - Math.pow(1 - p, 3); };

    // Todo lo programado pertenece a una "generación": cambiar de paso la anula.
    let generacion = 0;
    let temporizadores = [];
    function programar(fn, ms) {
      const g = generacion;
      temporizadores.push(setTimeout(function () { if (g === generacion) fn(); }, ms));
    }
    function animar(duracion, cuadro, fin) {
      const g = generacion;
      const t0 = performance.now();
      (function paso(ahora) {
        if (g !== generacion) return;
        const t = Math.min(ahora - t0, duracion);
        cuadro(t);
        if (t < duracion) requestAnimationFrame(paso);
        else if (fin) fin();
      })(t0);
    }
    function detener() {
      generacion++;
      temporizadores.forEach(clearTimeout);
      temporizadores = [];
    }
    function sinTransicion(n, fn) {
      n.classList.add('sin-transicion');
      fn();
      n.getBoundingClientRect();
      n.classList.remove('sin-transicion');
    }

    function geometria() {
      const W = lienzo.clientWidth, H = lienzo.clientHeight;
      const estrecho = W < 620;
      if (!estrecho) {
        const tw = Math.round(Math.min(300, W * .4));
        return {
          W: W, H: H, estrecho: false, tw: tw, ty: 0,
          vis: { x: tw + 28, y: 0, w: W - tw - 28, h: H - 8 },
          vis5: { x: 0, y: 0, w: W, h: H - 92 }
        };
      }
      const vh = Math.round(H * .55);
      return {
        W: W, H: H, estrecho: true, tw: W, ty: vh + 18,
        vis: { x: 0, y: 0, w: W, h: vh },
        vis5: { x: 0, y: 0, w: W, h: vh + 8 }
      };
    }

    // Imagen con entrada en cortina
    function evidencia(padre, clave, recorte) {
      const fig = el('figure', 'evidencia', padre);
      const marco = el('div', 'evidencia__marco', fig);
      const img = S.crearImagen(clave);
      marco.appendChild(img);
      return {
        fig: fig,
        colocar: function (x, y, w, h) {
          vars(fig, { x: x, y: y, w: w });
          marco.style.height = h + 'px';
          S.encuadrar(marco, img, clave, recorte);
        }
      };
    }

    // Rótulo con línea guía que se dibuja hasta el punto que señala
    function anotacion(padre, capaSvg, titulo, detalle, extra) {
      const n = el('div', 'anotacion' + (extra ? ' ' + extra : ''), padre);
      el('span', 'anotacion__titulo', n, titulo);
      if (detalle) el('span', 'anotacion__detalle', n, detalle);
      const linea = svg('path', { class: 'guia' }, capaSvg);
      const punto = svg('circle', { class: 'guia__punto', r: 2.6 }, capaSvg);
      let visible = false, largo = 0;
      return {
        n: n,
        colocar: function (ax, ay, lx, ly, trazado, alinearDerecha) {
          vars(n, { x: lx, y: ly, ax: alinearDerecha ? '-100%' : '0%' });
          linea.setAttribute('d', trazado);
          punto.setAttribute('cx', ax);
          punto.setAttribute('cy', ay);
          largo = linea.getTotalLength();
          linea.style.strokeDasharray = largo + ' ' + largo;
          linea.style.strokeDashoffset = visible ? 0 : largo;
        },
        mostrar: function () {
          visible = true;
          linea.style.strokeDashoffset = 0;
          punto.classList.add('is-visible');
          n.classList.add('is-visible');
        },
        ocultar: function () {
          visible = false;
          linea.style.strokeDashoffset = largo;
          punto.classList.remove('is-visible');
          n.classList.remove('is-visible');
        }
      };
    }

    // ── Capa 0 · Pregunta ─────────────────
    function capaPregunta(capa) {
      const s = svg('svg', { class: 'capa__svg' }, capa);
      const orb = svg('circle', { class: 'orbita' }, s);
      const halo = svg('circle', { class: 'halo', r: 15 }, s);
      const nucleo = svg('circle', { class: 'nucleo', r: 6 }, s);
      const huecos = orbita.map(function (o) {
        return { o: o, punto: svg('circle', { class: 'hueco', r: 4.5 }, s), rotulo: el('span', 'rotulo hueco-rotulo', capa, o.texto) };
      });
      let L = 0, hecho = false;
      function mostrarHuecos() {
        huecos.forEach(function (h) { h.punto.classList.add('is-visible'); h.rotulo.classList.add('is-visible'); });
      }
      return {
        disponer: function (g) {
          const cx = g.vis.x + g.vis.w / 2, cy = g.vis.y + g.vis.h / 2;
          // el radio deja sitio a los rótulos laterales dentro del lienzo
          const lateral = Math.max.apply(null, huecos.map(function (h) {
            return Math.abs(Math.cos(h.o.angulo * Math.PI / 180)) > .3 ? h.rotulo.offsetWidth : 0;
          }));
          const r = Math.min(g.vis.w * .3, g.vis.h * .32, g.vis.w / 2 - lateral - 16);
          [orb, halo, nucleo].forEach(function (c) { c.setAttribute('cx', cx); c.setAttribute('cy', cy); });
          orb.setAttribute('r', r);
          L = 2 * Math.PI * r;
          orb.style.strokeDasharray = L + ' ' + L;
          orb.style.strokeDashoffset = hecho ? 0 : L;
          huecos.forEach(function (h) {
            const a = h.o.angulo * Math.PI / 180;
            const cos = Math.cos(a), sin = Math.sin(a);
            const x = cx + cos * r, y = cy + sin * r;
            h.punto.setAttribute('cx', x);
            h.punto.setAttribute('cy', y);
            vars(h.rotulo, {
              x: x + (cos > .3 ? 11 : cos < -.3 ? -11 : 0),
              y: y + (sin > .3 ? 11 : sin < -.3 ? -11 : 0),
              ax: cos > .3 ? '0%' : cos < -.3 ? '-100%' : '-50%',
              ay: sin > .3 ? '0%' : sin < -.3 ? '-100%' : '-50%'
            });
          });
        },
        reiniciar: function () {
          hecho = false;
          orb.style.strokeDashoffset = L;
          nucleo.classList.remove('is-latido');
          huecos.forEach(function (h) { h.punto.classList.remove('is-visible'); h.rotulo.classList.remove('is-visible'); });
        },
        entrar: function () {
          // `hecho` se marca al empezar el trazo: si la pieza se recoloca
          // (p. ej. al cargar las fuentes), la órbita no vuelve a ocultarse.
          programar(function () { hecho = true; orb.style.strokeDashoffset = 0; }, 200);
          huecos.forEach(function (h, i) {
            programar(function () { h.punto.classList.add('is-visible'); h.rotulo.classList.add('is-visible'); }, 900 + i * 240);
          });
          programar(function () { nucleo.classList.add('is-latido'); }, 1900);
        },
        completar: function () { hecho = true; orb.style.strokeDashoffset = 0; mostrarHuecos(); }
      };
    }

    // ── Capa 1 · Nombre ───────────────────
    function capaNombre(capa) {
      const cadena = el('p', 'cadena rotulo', capa);
      const formas = ['Manchester City', ' → Man City', ' → City'].map(function (t) {
        return el('span', 'cadena__forma', cadena, t);
      });
      const nombre = el('p', 'nombre', capa);
      nombre.setAttribute('aria-hidden', 'true');
      const linea = el('span', 'nombre__linea', nombre);
      const letras = Array.from('MANCHESTER CITY').map(function (c, i) {
        const s = el('span', 'nombre__letra', linea, c);
        s.style.setProperty('--i', i);
        return s;
      });
      const pliegues = [[3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 10]]; // → MAN CITY → CITY
      // El nombre, junto al equipo al que identifica
      const ev = [
        evidencia(capa, 'equipo1', { punto: 'centro' }),
        evidencia(capa, 'equipo2', { punto: 'centro', zoom: 1.15 })
      ];
      return {
        disponer: function (g) {
          const a = g.vis;
          nombre.classList.add('midiendo');
          nombre.style.fontSize = '50px';
          const ancho = linea.getBoundingClientRect().width || 1;
          nombre.style.fontSize = Math.min(g.estrecho ? 44 : 60, 50 * (a.w * .94) / ancho) + 'px';
          letras.forEach(function (l) { l.style.maxWidth = Math.ceil(l.getBoundingClientRect().width + 1) + 'px'; });
          nombre.classList.remove('midiendo');
          vars(cadena, { x: a.x, y: a.y + a.h * (g.estrecho ? .04 : .07), w: a.w });
          vars(nombre, { x: a.x, y: a.y + a.h * (g.estrecho ? .14 : .16), w: a.w });
          // Composición asimétrica: jugadores en grande, plantilla más pequeña
          const w1 = Math.round((a.w - 14) * .62), w2 = a.w - 14 - w1;
          const h1 = Math.round(Math.min(w1 * .6, a.h * (g.estrecho ? .38 : .4)));
          const h2 = Math.round(h1 * .78);
          const y = a.y + a.h * (g.estrecho ? .43 : .44);
          ev[0].colocar(a.x, y, w1, h1);
          ev[1].colocar(a.x + w1 + 14, y + h1 - h2, w2, h2);
        },
        reiniciar: function () {
          nombre.classList.remove('is-visible');
          letras.forEach(function (l) { l.classList.remove('is-plegada'); });
          formas.forEach(function (f) { f.classList.remove('is-visible'); });
          ev.forEach(function (e) { e.fig.classList.remove('is-visible'); });
        },
        entrar: function () {
          programar(function () { nombre.classList.add('is-visible'); formas[0].classList.add('is-visible'); }, 150);
          pliegues.forEach(function (p, k) {
            const t = 1900 + k * 1900;
            programar(function () {
              p.forEach(function (i) { letras[i].classList.add('is-plegada'); });
              formas[k + 1].classList.add('is-visible');
            }, t);
            programar(function () { ev[k].fig.classList.add('is-visible'); }, t + 250);
          });
        },
        completar: function () {
          nombre.classList.add('is-visible');
          pliegues.forEach(function (p) { p.forEach(function (i) { letras[i].classList.add('is-plegada'); }); });
          formas.forEach(function (f) { f.classList.add('is-visible'); });
          ev.forEach(function (e) { e.fig.classList.add('is-visible'); });
        }
      };
    }

    // ── Capa 2 · Escudo ───────────────────
    function capaEscudo(capa) {
      const s = svg('svg', { class: 'capa__svg' }, capa);
      const trazo = svg('circle', { class: 'trazo' }, s);
      const lapiz = svg('circle', { class: 'lapiz', r: 3, opacity: 0 }, s);
      const escudo = el('div', 'escudo', capa);
      escudo.appendChild(S.crearImagen('escudo'));
      const sobre = svg('svg', { class: 'capa__svg' }, capa);
      const notas = anatomia.map(function (a) {
        return { punto: a.punto, nota: anotacion(capa, sobre, a.titulo, a.detalle) };
      });
      const fuente = el('p', 'fuente rotulo', capa, fuenteEscudo);
      let geo = null;
      return {
        disponer: function (g) {
          const a = g.vis;
          const R = g.estrecho ? Math.min(72, a.h * .3, a.w * .2) : Math.min(94, a.h * .27, a.w * .25);
          const cx = a.x + R + (g.estrecho ? 14 : 22), cy = a.y + a.h * (g.estrecho ? .45 : .47);
          const rt = R + 8;
          geo = { cx: cx, cy: cy, rt: rt, L: 2 * Math.PI * rt };
          vars(escudo, { x: cx - R, y: cy - R, d: 2 * R });
          trazo.setAttribute('cx', cx);
          trazo.setAttribute('cy', cy);
          trazo.setAttribute('r', rt);
          trazo.setAttribute('transform', 'rotate(180 ' + cx + ' ' + cy + ')');
          trazo.style.strokeDasharray = geo.L + ' ' + geo.L;
          if (!escudo.classList.contains('is-visible')) trazo.style.strokeDashoffset = geo.L;

          // Los rótulos se apilan según su altura real, centrados respecto al escudo
          const lx = cx + rt + (g.estrecho ? 18 : 30);
          const hueco = g.estrecho ? 7 : 12;
          notas.forEach(function (n) { n.nota.n.style.width = (a.x + a.w - lx) + 'px'; });
          const altos = notas.map(function (n) { return n.nota.n.offsetHeight; });
          const total = altos.reduce(function (s, h) { return s + h; }, 0) + hueco * (notas.length - 1);
          let arriba = Math.max(a.y + 4, cy - total / 2 - 8);
          const puntos = S.IMAGENES.escudo.puntos;
          notas.forEach(function (n, i) {
            const p = puntos[n.punto];
            const ax = cx - R + p[0] * 2 * R, ay = cy - R + p[1] * 2 * R;
            const ly = arriba + 7;
            const codo = cx + rt + 6;
            n.nota.colocar(ax, ay, lx, ly, 'M' + ax + ',' + ay + ' H' + codo + ' L' + (lx - 7) + ',' + ly);
            arriba += altos[i] + hueco;
          });
          vars(fuente, { x: lx, y: arriba + 2 });
        },
        reiniciar: function () {
          escudo.classList.remove('is-visible');
          trazo.classList.remove('is-tenue');
          if (geo) trazo.style.strokeDashoffset = geo.L;
          lapiz.setAttribute('opacity', 0);
          notas.forEach(function (n) { n.nota.ocultar(); });
          fuente.classList.remove('is-visible');
        },
        entrar: function () {
          animar(1100, function (t) {
            const p = suave(t / 1100);
            trazo.style.strokeDashoffset = geo.L * (1 - p);
            const ang = Math.PI + p * 2 * Math.PI;
            lapiz.setAttribute('cx', geo.cx + Math.cos(ang) * geo.rt);
            lapiz.setAttribute('cy', geo.cy + Math.sin(ang) * geo.rt);
            lapiz.setAttribute('opacity', t > 30 && p < 1 ? 1 : 0);
          });
          programar(function () { escudo.classList.add('is-visible'); }, 700);
          programar(function () { trazo.classList.add('is-tenue'); }, 1300);
          notas.forEach(function (n, i) { programar(function () { n.nota.mostrar(); }, 1900 + i * 520); });
          programar(function () { fuente.classList.add('is-visible'); }, 1900 + 4 * 520);
        },
        completar: function () {
          escudo.classList.add('is-visible');
          trazo.classList.add('is-tenue');
          trazo.style.strokeDashoffset = 0;
          notas.forEach(function (n) { n.nota.mostrar(); });
          fuente.classList.add('is-visible');
        }
      };
    }

    // ── Capa 3 · Identidad: pieza tipográfica, sin imágenes ──
    // IDENTIDAD se abre en varios códigos, cada uno con su propio estilo;
    // luego se alinean con un estilo común (coherencia) y terminan
    // formando la base de MANCHESTER CITY (una identidad propia).
    function capaIdentidad(capa) {
      const s = svg('svg', { class: 'capa__svg' }, capa);
      const radiales = codigos.map(function (c, i) {
        const l = svg('line', { class: 'radial' }, s);
        l.style.setProperty('--i', i);
        return l;
      });
      const reglas = codigos.map(function (c, i) {
        const l = svg('line', { class: 'regla-fila' }, s);
        l.style.setProperty('--i', i);
        return l;
      });
      const fantasma = el('p', 'fantasma', capa, 'Identidad');
      fantasma.setAttribute('aria-hidden', 'true');
      const palabras = codigos.map(function (c, i) {
        const n = el('span', 'codigo', capa, c.texto);
        n.style.setProperty('--i', i);
        vars(n, { fw: String(c.peso), fst: c.anchura + '%', ls: c.espaciado, col: 'var(' + c.color + ')' });
        return n;
      });
      const indices = codigos.map(function (c, i) {
        const n = el('span', 'codigo__indice rotulo', capa, String(i + 1).padStart(2, '0'));
        n.style.setProperty('--i', i);
        return n;
      });
      // separadores entre códigos consecutivos en la línea final
      const puntos = codigos.slice(1).map(function (c, i) {
        const n = el('span', 'codigo__punto', capa, '·');
        n.style.setProperty('--i', i);
        return n;
      });
      const rotulo = el('span', 'marca__rotulo rotulo', capa, 'Identidad de marca');
      const marca = el('p', 'marca', capa);
      marca.setAttribute('aria-hidden', 'true');
      const lineaMarca = el('span', 'marca__linea-texto', marca);
      Array.from('MANCHESTER CITY').forEach(function (c, i) {
        el('span', 'marca__letra', lineaMarca, c).style.setProperty('--i', i);
      });
      const subrayado = el('span', 'marca__subrayado', capa);

      function fase(n) { capa.dataset.fase = String(n); }

      // La leyenda cambia de frase con cada fase
      function narrar(i) {
        tExplicacion.classList.add('is-cambiando');
        programar(function () {
          tExplicacion.textContent = narrativa[i];
          tExplicacion.classList.remove('is-cambiando');
        }, 280);
      }

      return {
        disponer: function (g) {
          const a = g.vis5, est = g.estrecho;
          const W = a.w, H = a.h;
          const cx = a.x + W / 2, cy = a.y + H / 2 - (est ? 2 : 4);
          vars(capa, { cx: cx, cy: cy });
          fantasma.style.setProperty('--fs', (est ? 54 : Math.min(92, W * .13)) + 'px');
          palabras.forEach(function (p, i) {
            vars(p, { fs: Math.round(codigos[i].tam * (est ? .7 : 1)), fs3: est ? 14 : 17, fs4: est ? 9.5 : 10.5 });
          });

          // Ancho de cada código en sus tres estilos
          const actual = capa.dataset.fase || '0';
          const medir = function (n) { fase(n); return palabras.map(function (p) { return p.offsetWidth; }); };
          const w2 = medir(2), w3 = medir(3), w4 = medir(4);
          fase(actual);

          // Fase 2: dispersos, unidos al centro por una línea
          codigos.forEach(function (c, i) {
            const pos = est ? c.estrecho : c.ancho;
            const x = acotar(a.x + pos[0] * W, a.x + w2[i] / 2 + 4, a.x + W - w2[i] / 2 - 4);
            const y = a.y + pos[1] * H;
            vars(palabras[i], { x2: x, y2: y });
            const L = Math.hypot(x - cx, y - cy) * .72;
            const ang = Math.atan2(y - cy, x - cx);
            const r = radiales[i];
            r.setAttribute('x1', cx);
            r.setAttribute('y1', cy);
            r.setAttribute('x2', cx + Math.cos(ang) * L);
            r.setAttribute('y2', cy + Math.sin(ang) * L);
            r.style.setProperty('--L', L + 'px');
          });

          // Fase 3: alineados en columna, con el mismo estilo
          const fila = est ? 26 : 31;
          const bloque = Math.max.apply(null, w3);
          const x0 = cx - bloque / 2 + 14;
          codigos.forEach(function (c, i) {
            const y = cy + (i - (codigos.length - 1) / 2) * fila;
            vars(palabras[i], { x3: x0, y3: y });
            vars(indices[i], { x: x0 - 30, y: y });
            const yr = y + fila / 2;
            reglas[i].setAttribute('x1', x0 - 30);
            reglas[i].setAttribute('y1', yr);
            reglas[i].setAttribute('x2', x0 + bloque + 6);
            reglas[i].setAttribute('y2', yr);
            reglas[i].style.setProperty('--L', (bloque + 36) + 'px');
          });

          // Fase 4: MANCHESTER CITY, con los códigos como base
          marca.style.setProperty('--fs', '50px');
          const ancho50 = lineaMarca.offsetWidth || 1;
          const fsM = Math.min(est ? 40 : 66, 50 * (W * .9) / ancho50);
          const anchoMarca = ancho50 * fsM / 50;
          const yNombre = cy - (est ? 16 : 22);
          vars(marca, { x: a.x, y: yNombre - fsM / 2, w: W, fs: fsM });
          vars(rotulo, { x: cx, y: yNombre - fsM / 2 - 22 });
          vars(subrayado, { x: cx - anchoMarca / 2, y: yNombre + fsM / 2 + 6, w: anchoMarca });

          // Los códigos, en una o dos líneas centradas bajo el nombre
          const sep = 16, maximo = W - 12;
          const lineas = [[]];
          let usado = 0;
          w4.forEach(function (w, i) {
            const linea = lineas[lineas.length - 1];
            if (linea.length && usado + sep + w > maximo) { lineas.push([i]); usado = w; }
            else { usado += (linea.length ? sep : 0) + w; linea.push(i); }
          });
          puntos.forEach(function (p) { p.classList.remove('is-usado'); });
          const y4 = yNombre + fsM / 2 + 28;
          lineas.forEach(function (idx, li) {
            const total = idx.reduce(function (suma, i) { return suma + w4[i]; }, 0) + sep * (idx.length - 1);
            let x = cx - total / 2;
            const y = y4 + li * 17;
            idx.forEach(function (i, j) {
              vars(palabras[i], { x4: x, y4: y });
              x += w4[i];
              if (j < idx.length - 1) {
                vars(puntos[i], { x: x + sep / 2, y: y });
                puntos[i].classList.add('is-usado');
                x += sep;
              }
            });
          });
        },
        reiniciar: function () { fase(0); },
        entrar: function () {
          programar(function () { fase(1); }, 350);
          programar(function () { fase(2); narrar(1); }, 2500);
          programar(function () { fase(3); narrar(2); }, 5600);
          programar(function () { fase(4); narrar(3); }, 8700);
        },
        completar: function () { fase(4); }
      };
    }

    // ── Montaje ───────────────────────────
    const fabricas = [capaPregunta, capaNombre, capaEscudo, capaIdentidad];
    const capas = fabricas.map(function (fabrica) {
      const nodo = el('div', 'capa');
      nodo.setAttribute('aria-hidden', 'true');
      lienzo.insertBefore(nodo, texto);
      return Object.assign({ el: nodo }, fabrica(nodo));
    });

    const tramos = pasos.map(function (p, i) {
      const b = el('button', 'tramo', progreso);
      b.type = 'button';
      b.setAttribute('aria-label', 'Ir a: ' + p.concepto);
      const guia = el('span', 'tramo__pista', b);
      const barra = el('span', 'tramo__barra', guia);
      const nombre = el('span', 'tramo__nombre', b);
      el('span', 'tramo__largo', nombre, i === 0 ? 'Pregunta' : p.concepto);
      el('span', 'tramo__corto', nombre, i === 0 ? '?' : String(i).padStart(2, '0'));
      b.addEventListener('click', function () { ir(i); });
      return { b: b, barra: barra };
    });

    // ── Secuencia ─────────────────────────
    const ULTIMO = pasos.length - 1;
    let actual = -1, terminado = false, arrancado = false;
    let visible = false, encima = false, corriendo = false;
    let avance = null, restante = 0, inicioTramo = 0;
    let g = geometria();

    function aplicarGeometria() {
      g = geometria();
      lienzo.classList.toggle('is-estrecho', g.estrecho);
      pieza.classList.toggle('is-estrecho-pieza', g.estrecho);
      vars(lienzo, { tw: g.tw, ty: g.ty });
      texto.classList.toggle('is-leyenda', actual === ULTIMO);
    }

    function escribir(k) {
      const p = pasos[k];
      tPaso.innerHTML = '';
      const partes = p.etiqueta.split(' · ');
      if (partes.length > 1) { el('b', null, tPaso, partes[0]); tPaso.append(' · ' + partes[1]); }
      else tPaso.textContent = p.etiqueta;
      tConcepto.textContent = p.concepto;
      tConcepto.classList.toggle('is-pregunta', !!p.pregunta);
      tExplicacion.classList.remove('is-cambiando');
      tExplicacion.textContent = sinMovimiento.matches && p.resumen ? p.resumen : p.explicacion;
      texto.classList.toggle('is-leyenda', k === ULTIMO);
    }

    function cambiarTexto(k) {
      texto.classList.add('is-saliendo');
      programar(function () {
        escribir(k);
        texto.classList.remove('is-saliendo');
        texto.classList.add('is-entrando');
        texto.getBoundingClientRect();
        texto.classList.remove('is-entrando');
      }, 240);
    }

    function actualizarPista() {
      if (actual < 0) pista.textContent = '';
      else if (actual === ULTIMO) pista.textContent = terminado ? 'Pulsa para repetir' : '';
      else pista.textContent = encima ? 'En pausa · pulsa para avanzar' : 'Pulsa para avanzar';
    }

    function ir(k) {
      detener();
      clearTimeout(avance);
      corriendo = false;
      terminado = false;
      aplicarGeometria();
      const anterior = actual;
      actual = k;
      capas.forEach(function (c, i) { c.el.classList.toggle('is-activa', i === k); });
      const capa = capas[k];
      sinTransicion(capa.el, function () { capa.reiniciar(); capa.disponer(g); });
      if (anterior < 0) escribir(k); else cambiarTexto(k);

      tramos.forEach(function (t, i) {
        t.barra.style.transition = 'none';
        t.barra.style.transform = 'scaleX(' + (i < k ? 1 : 0) + ')';
        t.b.classList.toggle('is-actual', i === k);
      });

      if (sinMovimiento.matches) {
        capa.completar();
        tramos[k].barra.style.transform = 'scaleX(1)';
        terminado = k === ULTIMO;
      } else {
        capa.entrar();
        if (k < ULTIMO) {
          restante = pasos[k].duracion;
          evaluar();
        } else {
          tramos[k].barra.style.transition = 'transform ' + pasos[k].duracion + 'ms linear';
          tramos[k].barra.getBoundingClientRect();
          tramos[k].barra.style.transform = 'scaleX(1)';
          programar(function () { terminado = true; actualizarPista(); }, pasos[k].duracion);
        }
      }
      actualizarPista();
    }

    function reanudar() {
      corriendo = true;
      inicioTramo = performance.now();
      const barra = tramos[actual].barra;
      barra.style.transition = 'none';
      barra.style.transform = 'scaleX(' + (1 - restante / pasos[actual].duracion) + ')';
      barra.getBoundingClientRect();
      barra.style.transition = 'transform ' + restante + 'ms linear';
      barra.style.transform = 'scaleX(1)';
      avance = setTimeout(function () { ir(actual + 1); }, restante);
    }

    function pausar() {
      corriendo = false;
      clearTimeout(avance);
      restante = Math.max(0, restante - (performance.now() - inicioTramo));
      const barra = tramos[actual].barra;
      const m = getComputedStyle(barra).transform;
      barra.style.transition = 'none';
      barra.style.transform = m === 'none' ? 'scaleX(0)' : m;
    }

    // Avanza solo cuando la pieza está a la vista y el cursor no está encima.
    function evaluar() {
      if (actual < 0 || actual >= ULTIMO || sinMovimiento.matches) return;
      const debe = visible && !encima;
      if (debe && !corriendo) reanudar();
      else if (!debe && corriendo) pausar();
      actualizarPista();
    }

    function siguiente() {
      if (actual < 0) return;
      if (actual < ULTIMO) ir(actual + 1);
      else if (terminado) ir(0);
    }

    lienzo.addEventListener('click', siguiente);
    lienzo.addEventListener('keydown', function (e) {
      if (actual < 0) return;
      if (['ArrowRight', 'ArrowDown', ' ', 'Enter'].indexOf(e.key) >= 0) { e.preventDefault(); siguiente(); }
      else if (['ArrowLeft', 'ArrowUp'].indexOf(e.key) >= 0) { e.preventDefault(); ir(Math.max(0, actual - 1)); }
      else if (e.key === 'Home') { e.preventDefault(); ir(0); }
      else if (e.key === 'End') { e.preventDefault(); ir(ULTIMO); }
    });
    pieza.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { encima = true; evaluar(); } });
    pieza.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { encima = false; evaluar(); } });

    function arrancar() {
      if (arrancado) return;
      arrancado = true;
      ir(0);
    }

    aplicarGeometria();
    escribir(0);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entradas) {
        visible = entradas[entradas.length - 1].intersectionRatio >= .45;
        if (visible) arrancar();
        evaluar();
      }, { threshold: [0, .45, .8] }).observe(lienzo);
    } else {
      visible = true;
      setTimeout(arrancar, 600);
    }

    function recolocar() {
      if (actual < 0) { aplicarGeometria(); return; }
      aplicarGeometria();
      sinTransicion(capas[actual].el, function () { capas[actual].disponer(g); });
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(recolocar);
    if ('ResizeObserver' in window) new ResizeObserver(recolocar).observe(lienzo);
    else window.addEventListener('resize', recolocar);
  })();
})();
