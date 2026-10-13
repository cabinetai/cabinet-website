(function () {
  'use strict';

  var d3 = window.d3, topojson = window.topojson;
  var SRC = window.INDIA_STATES;
  var TABLE = SRC.table;
  var BY = {};
  TABLE.forEach(function (r) { BY[r.slug] = r; });
  var TINY = ['delhi', 'chandigarh', 'puducherry', 'lakshadweep', 'dadra-and-nagar-haveli-and-daman-and-diu', 'andaman-and-nicobar-islands', 'goa', 'sikkim'];
  var UTS = ['andaman-and-nicobar-islands', 'chandigarh', 'dadra-and-nagar-haveli-and-daman-and-diu', 'delhi', 'jammu-and-kashmir', 'ladakh', 'lakshadweep', 'puducherry'];
  var SCRIPT_LANG = { 'Telugu': 'te', 'Assamese': 'as', 'Gujarati': 'gu', 'Kannada': 'kn', 'Malayalam': 'ml', 'Marathi': 'mr', 'Meitei': 'mni', 'Odia': 'or', 'Punjabi': 'pa', 'Tamil': 'ta', 'Bengali': 'bn', 'Konkani': 'kok', 'Nepali': 'ne', 'Kashmiri': 'ur', 'Ladakhi': 'bo', 'Hindi': 'hi' };
  var ROSTER = [
    { slug: 'prafful-garg', name: 'Prafful Garg', makes: 'On-ground videos that debunk misinformation about India', followers: { instagram: '2.5M', x: '84.7K', youtube: '103K' } },
    { slug: 'rj-raunac', name: 'RJ Raunac', makes: 'Radio, prank calls and comedy on everyday life', followers: { instagram: '1.8M', youtube: '4.9M' } },
    { slug: 'nikhil-chandwani', name: 'Nikhil Chandwani', makes: 'Author, industrialist and content creator', followers: { instagram: '2M' } },
    { slug: 'amit-sengupta', name: 'Amit Sengupta', makes: 'Geopolitics and politics, made clear and crisp', followers: { instagram: '65.8K', youtube: '2.15M' } },
    { slug: 'chandana', name: 'Chandana', makes: 'Lifestyle, travel, food and everyday experiences', followers: { instagram: '1.7M' } },
    { slug: 'dr-bro', name: 'Dr. Bro', makes: 'Travel, culture, food and stories', followers: { instagram: '3.1M', youtube: '3.8M' } },
    { slug: 'prem-kumar', name: 'Prem Kumar', makes: 'Travel and lifestyle for a young audience', followers: { instagram: '1.5M', youtube: '543K' } },
    { slug: 'ranit-haldar', name: 'Ranit Haldar', makes: 'Influencer strategist, photographing Israel for tourism', followers: {} }
  ];
  var GREETINGS = [['नमस्ते', 'hi'], ['ನಮಸ್ಕಾರ', 'kn'], ['নমস্কার', 'bn'], ['வணக்கம்', 'ta'], ['నమస్కారం', 'te'], ['നമസ്കാരം', 'ml'], ['नमस्कार', 'mr'], ['નમસ્તે', 'gu'], ['ନମସ୍କାର', 'or'], ['ਨਮਸਕਾਰ', 'pa'], ['שלום', 'he'], ['Welcome', 'en']];
  var LENSES = [['creators', 'Creators', 'var(--rani)'], ['regions', 'Regions', 'var(--turmeric)'], ['ai', 'AI in India', 'var(--peacock)']];
  var LOOP = 'M-5.5 -17.5 C16 -2 11 12.5 0 12.5 C-11 12.5 -16 -2 5.5 -17.5';
  var ICONS = {
    play: '<path d="M8 5.5v13l10.5-6.5z"/>',
    pause: '<path d="M8.5 5.5v13M15.5 5.5v13"/>',
    sound: '<path d="M4 9.5v5h3.5l4.5 4v-13l-4.5 4z"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11"/>',
    mute: '<path d="M4 9.5v5h3.5l4.5 4v-13l-4.5 4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
    ext: '<path d="M10 6H6v12h12v-4"/><path d="M13 5h6v6M19 5l-8 8"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    next: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

  var $ = function (id) { return document.getElementById(id); };
  var field = $('field'), stageMain = $('stage-main'), dossierEl = $('dossier'), labelEl = $('maplabel');

  function h(tag, attrs) {
    var e = document.createElement(tag), k, v;
    for (k in (attrs || {})) {
      v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    add(e, Array.prototype.slice.call(arguments, 2));
    return e;
  }
  function add(e, kids) {
    kids.forEach(function (c) {
      if (c == null || c === false || c === '') return;
      if (Array.isArray(c)) add(e, c);
      else e.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
    });
  }
  function icon(name) {
    var s = h('span');
    s.innerHTML = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + '</svg>';
    return s.firstChild;
  }
  function str(v) { return (v == null || v === 'None' || v === 'null') ? '' : String(v).trim(); }
  function arr(v) { return Array.isArray(v) ? v.filter(function (x) { return x != null && x !== ''; }) : []; }
  function compact(n) {
    n = Number(n);
    if (!isFinite(n)) return '';
    function f(x, s) { var t = x >= 100 ? x.toFixed(0) : x.toFixed(1); return t.replace(/\.0$/, '') + s; }
    if (n >= 1e9) return f(n / 1e9, 'B');
    if (n >= 1e6) return f(n / 1e6, 'M');
    if (n >= 1e3) return f(n / 1e3, 'K');
    return String(Math.round(n));
  }
  function sig3(n) {
    n = Number(n);
    if (!isFinite(n)) return '';
    function f(x, s) { return (x >= 100 ? x.toFixed(0) : x >= 10 ? x.toFixed(1) : x.toFixed(2)) + s; }
    if (n >= 1e6) return f(n / 1e6, 'M');
    if (n >= 1e3) return f(n / 1e3, 'K');
    return String(Math.round(n));
  }
  function cleanTitle(t) {
    var full = clean(t), cut = full.replace(/\s*#\S+/g, '').trim();
    return cut || full;
  }
  function fmtDate(s) {
    s = str(s);
    var m = /^(\d{4})-?(\d{2})-?(\d{2})/.exec(s);
    if (!m) return s;
    return Number(m[3]) + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Number(m[2]) - 1] + ' ' + m[1];
  }
  function clean(t) {
    return str(t).replace(/[\p{Extended_Pictographic}️‍]/gu, '').replace(/\s{2,}/g, ' ').trim();
  }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
  function ext(url, text, cls) {
    return h('a', { href: url, target: '_blank', rel: 'noopener', class: cls || null }, text, ' ', icon('ext'));
  }
  function slugOf(name) { return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  var DATA = { creators: {}, regions: {}, ai: null };
  var state = { lens: 'creators', pinned: null, regionSlug: null, clipIdx: 0, hub: null, creator: null, sound: false };
  var M = {};

  /* On a phone the map sits above the stage and the page scrolls, so a tap that fills the stage brings it into view. */
  function narrow() { return window.matchMedia('(max-width: 820px)').matches; }
  /* Inside another page (the Welcome page) the map cannot scroll that page itself, so it asks. */
  var embedded = window.parent !== window;
  if (embedded) document.documentElement.classList.add('embedded');
  function tell(msg) { if (embedded) { try { window.parent.postMessage(msg, '*'); } catch (e) { /* no parent to tell */ } } }
  function tellSize() { tell({ type: 'india-map:size', narrow: narrow(), height: narrow() ? document.documentElement.scrollHeight : 0 }); }
  function toStage() {
    if (embedded && narrow()) { tell({ type: 'india-map:scroll', top: $('stage').offsetTop }); return; }
    if (narrow()) $('stage').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }

  /* ---------- seam ---------- */
  function drawSeam() {
    var H = window.innerHeight, n = Math.max(1, Math.round(H / 30)), u = H / n, s = '', i, y;
    for (i = 0; i < n; i++) {
      y = i * u;
      s += '<path d="M15 ' + y + 'C30 ' + (y + u * 0.25) + ' 30 ' + (y + u * 0.75) + ' 15 ' + (y + u) + '"/>' +
        '<path d="M15 ' + y + 'C0 ' + (y + u * 0.25) + ' 0 ' + (y + u * 0.75) + ' 15 ' + (y + u) + '"/>' +
        '<circle cx="15" cy="' + (y + u / 2) + '" r="1.9"/>';
    }
    $('seam').innerHTML = s;
  }

  /* ---------- map ---------- */
  function buildMap(withIntro) {
    var W = field.clientWidth, H = field.clientHeight;
    var svg = d3.select('#map');
    svg.selectAll('*').remove();
    svg.attr('viewBox', '0 0 ' + W + ' ' + H);
    var topo = SRC.topology;
    var fc = topojson.feature(topo, topo.objects.states);
    var whole = topojson.merge(topo, topo.objects.states.geometries);
    var top = $('head').getBoundingClientRect().bottom - field.getBoundingClientRect().top;
    var proj = d3.geoMercator().fitExtent(narrow()
      ? [[14, top + 18], [W - 14, H - 150]]
      : [[W * 0.34, Math.max(120, H * 0.16)], [W - 30, H - 36]], whole);
    var path = d3.geoPath(proj);
    M = { W: W, H: H, proj: proj, path: path, feats: {}, d: {}, cent: {}, dots: {}, groups: {} };

    var gDots = svg.append('g'), gBorders = svg.append('g');
    var outline = svg.append('path').attr('id', 'outline').attr('d', path(whole)).attr('pathLength', 1).style('opacity', 0);
    M.hot = svg.append('path').attr('id', 'hot').attr('pathLength', 1).style('opacity', 0);
    var gHit = svg.append('g');
    M.gOver = svg.append('g');

    var ctx = document.createElement('canvas').getContext('2d');
    var PITCH = 13, minY = Infinity, maxY = -Infinity;
    fc.features.forEach(function (f) {
      var slug = slugOf(f.properties.st_nm), d = path(f), b = path.bounds(f), c = path.centroid(f);
      M.feats[slug] = f; M.d[slug] = d; M.cent[slug] = c;
      var p2 = new Path2D(d), pts = [], x, y;
      for (y = Math.ceil(b[0][1] / PITCH) * PITCH; y <= b[1][1]; y += PITCH) {
        for (x = Math.ceil(b[0][0] / PITCH) * PITCH; x <= b[1][0]; x += PITCH) {
          if (ctx.isPointInPath(p2, x, y)) pts.push([x, y]);
        }
      }
      if (!pts.length) pts.push([c[0], c[1]]);
      pts.forEach(function (p) { if (p[1] < minY) minY = p[1]; if (p[1] > maxY) maxY = p[1]; });
      M.dots[slug] = pts;
    });
    Object.keys(M.dots).forEach(function (slug) {
      var g = gDots.append('g').attr('class', 'dots').attr('data-slug', slug);
      M.groups[slug] = g.node();
      M.dots[slug].forEach(function (p) {
        var c = g.append('circle').attr('class', 'dot').attr('cx', p[0]).attr('cy', p[1]).attr('r', 1.7);
        if (withIntro) c.style('--i', Math.round(1400 + (maxY - p[1]) / (maxY - minY || 1) * 580) + 'ms');
      });
      gBorders.append('path').attr('class', 'border').attr('d', M.d[slug]);
      gHit.append('path').attr('class', 'hit').attr('d', M.d[slug]).datum(slug);
    });
    TINY.forEach(function (slug) {
      if (!M.cent[slug]) return;
      gHit.append('circle').attr('class', 'hit').attr('cx', M.cent[slug][0]).attr('cy', M.cent[slug][1]).attr('r', 14).datum(slug);
    });
    gHit.selectAll('.hit')
      .on('pointerenter', function (ev, slug) { onStateEnter(slug, d3.pointer(ev, field)); })
      .on('pointermove', function (ev) { moveLabel(d3.pointer(ev, field)); })
      .on('pointerleave', function () { onStateLeave(); });

    if (withIntro) {
      document.body.classList.add('intro-ui');
      svg.classed('intro', true);
      outline.style('opacity', 1);
      var a = outline.node().animate([{ strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDasharray: '1 1', strokeDashoffset: 0 }], { duration: 1400, easing: 'cubic-bezier(0.45, 0, 0.2, 1)', fill: 'both' });
      a.onfinish = function () {
        outline.node().animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' });
        document.body.classList.remove('intro-ui');
      };
      setTimeout(function () { svg.classed('intro', false); svg.selectAll('.dot').style('--i', null); }, 2500);
    }
  }

  var litKey = '';
  function light(slugs, hotSlug, pt) {
    var set = {}, key;
    (slugs || []).forEach(function (s) { if (s && M.groups[s]) set[s] = 1; });
    key = Object.keys(set).sort().join('|') + '>' + (hotSlug || '');
    if (key === litKey) return;
    litKey = key;
    Object.keys(M.groups).forEach(function (slug) {
      var g = M.groups[slug], on = !!set[slug];
      if (on && !g.classList.contains('on')) {
        var o = pt || M.cent[hotSlug] || M.cent[slug], kids = g.childNodes, i, c, dist;
        for (i = 0; i < kids.length; i++) {
          c = kids[i];
          dist = Math.hypot(c.cx.baseVal.value - o[0], c.cy.baseVal.value - o[1]);
          c.style.setProperty('--d', Math.min(180, Math.round(dist * 1.1)) + 'ms');
        }
      }
      g.classList.toggle('on', on);
    });
    var hot = M.hot.node();
    if (hotSlug && M.d[hotSlug]) {
      if (hot.getAttribute('data-slug') !== hotSlug) {
        hot.setAttribute('d', M.d[hotSlug]);
        hot.setAttribute('data-slug', hotSlug);
        hot.getAnimations().forEach(function (a) { a.cancel(); });
        if (!REDUCED) hot.animate([{ strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDasharray: '1 1', strokeDashoffset: 0 }], { duration: 520, easing: EASE });
      }
      hot.style.opacity = 1;
    } else {
      hot.style.opacity = 0;
      hot.removeAttribute('data-slug');
    }
  }

  function showLabel(pt, main, small) {
    labelEl.textContent = '';
    add(labelEl, [main, small ? h('small', null, small) : null]);
    labelEl.hidden = false;
    moveLabel(pt);
  }
  function moveLabel(pt) {
    if (labelEl.hidden || !pt) return;
    labelEl.style.left = pt[0] + 'px';
    labelEl.style.top = pt[1] + 'px';
  }
  function hideLabel() { labelEl.hidden = true; }

  function onStateEnter(slug, pt) {
    var r = BY[slug];
    if (state.lens === 'regions') {
      hideLabel();
      state.pinned = slug;
      light([slug], slug, pt);
      if (state.regionSlug !== slug) { state.regionSlug = slug; state.clipIdx = 0; renderRegion(); toStage(); }
      return;
    }
    light([slug], slug, pt);
    if (r) showLabel(pt, r.native || r.name, r.native ? r.name : null);
  }
  function onStateLeave() {
    hideLabel();
    restore();
  }
  function restore() {
    if (state.lens === 'regions') { light(state.pinned ? [state.pinned] : [], state.pinned); return; }
    if (state.lens === 'ai') {
      var hub = currentHub();
      markHub(hub ? hub.slug : null);
      light(hub ? [hub.state] : [], hub ? hub.state : null);
      return;
    }
    if (state.creator) lightCreator(state.creator); else { light([], null); markLamp(null); }
  }

  /* ---------- data ---------- */
  function loadScript(src) {
    return new Promise(function (res) {
      var s = document.createElement('script');
      s.src = src + '?v=' + Date.now();
      s.onload = s.onerror = function () { res(); };
      document.head.appendChild(s);
    });
  }
  function loadAll() {
    var jobs = [];
    TABLE.forEach(function (r) { jobs.push(loadScript('data/regions/' + r.slug + '.js')); });
    ROSTER.forEach(function (r) { jobs.push(loadScript('../creators/' + r.slug + '/creator.js')); });
    jobs.push(loadScript('data/ai-hubs.js'));
    return Promise.all(jobs).then(function () {
      var I = window.INDIA || {};
      DATA.creators = I.creators || {};
      DATA.regions = I.regions || {};
      DATA.ai = (I.ai && I.ai.hubs) || null;
    });
  }
  function clipsOf(slug) {
    var r = DATA.regions[slug];
    return r ? arr(r.clips).filter(function (c) { return c && (c.file || c.url); }) : [];
  }

  /* ---------- media ---------- */
  var tubes = [];
  function stopMedia(root) {
    Array.prototype.forEach.call(root.querySelectorAll('video,audio'), function (m) {
      try { m.pause(); m.removeAttribute('src'); m.load(); } catch (e) { /* element already gone */ }
    });
    tubes.forEach(function (t) { if (root.contains(t.el)) t.stop(); });
  }
  function soloPlay(m) {
    Array.prototype.forEach.call(document.querySelectorAll('video,audio'), function (o) { if (o !== m && !o.paused) o.pause(); });
    tubes.forEach(function (t) { if (t !== m) t.stop(); });
  }
  function ytOf(c) { return c && c.platform === 'youtube' ? str(c.id) : ''; }
  function progressBar(m) {
    var fill = h('i'), bar = h('div', { class: 'bar', role: 'slider', 'aria-label': 'Position', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': 0, tabindex: 0 }, fill);
    m.addEventListener('timeupdate', function () {
      var p = m.duration ? m.currentTime / m.duration : 0;
      fill.style.transform = 'scaleX(' + p + ')';
      bar.setAttribute('aria-valuenow', Math.round(p * 100));
    });
    bar.addEventListener('click', function (ev) {
      var b = bar.getBoundingClientRect();
      if (m.duration) m.currentTime = (ev.clientX - b.left) / b.width * m.duration;
    });
    bar.addEventListener('keydown', function (ev) {
      if (!m.duration) return;
      if (ev.key === 'ArrowRight') m.currentTime = Math.min(m.duration, m.currentTime + 3);
      if (ev.key === 'ArrowLeft') m.currentTime = Math.max(0, m.currentTime - 3);
    });
    return bar;
  }
  function shaper(frame, el, o) {
    return function (w, hh) {
      if (!w || !hh) return;
      var land = w > hh;
      frame.style.aspectRatio = w + ' / ' + hh;
      el.classList.toggle('land', land);
      el.classList.toggle('vert', !land);
      if (o.onShape) o.onShape(land);
    };
  }
  /* A clip we hold no copy of (the public site keeps none): its picture, and the way to the original. */
  function linkPlayer(o) {
    var img = o.poster ? h('img', { src: o.poster, alt: '' }) : null;
    var frame = h('a', { class: 'frame out', href: o.link, target: '_blank', rel: 'noopener', 'aria-label': 'Play on YouTube' }, img, h('span', { class: 'go' }, icon('play')));
    var el = h('div', { class: 'player vert' + (o.short ? ' short' : '') }, frame);
    var shape = shaper(frame, el, o);
    if (img) {
      img.addEventListener('load', function () { shape(img.naturalWidth, img.naturalHeight); });
      img.addEventListener('error', function () { img.remove(); });
    }
    return el;
  }
  /* A clip we hold no copy of, played from YouTube in YouTube's own player. The picture stays until it starts.
     A clip that starts by itself starts muted and loops; one started by hand plays with sound. */
  function tubePlayer(o) {
    var img = o.poster ? h('img', { src: o.poster, alt: '' }) : null;
    var frame = h('div', { class: 'frame tube', role: 'button', tabindex: 0, 'aria-label': 'Play' }, img, h('span', { class: 'go' }, icon('play')));
    var el = h('div', { class: 'player vert' + (o.short ? ' short' : '') }, frame);
    var shape = shaper(frame, el, o), fr = null, me = { el: el, stop: stop };
    if (img) {
      img.addEventListener('load', function () { shape(img.naturalWidth, img.naturalHeight); });
      img.addEventListener('error', function () { img.remove(); });
    }
    function start(byHand) {
      if (fr) return;
      tubes = tubes.filter(function (t) { return t === me || document.contains(t.el); });
      soloPlay(me);
      fr = h('iframe', {
        src: 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(o.yt) + '?autoplay=1&playsinline=1&rel=0' + (byHand ? '' : '&mute=1&loop=1&playlist=' + encodeURIComponent(o.yt)),
        title: 'YouTube video player', allow: 'autoplay; encrypted-media; picture-in-picture; fullscreen', allowfullscreen: true,
        referrerpolicy: 'strict-origin-when-cross-origin'
      });
      frame.appendChild(fr);
      frame.classList.add('playing');
      frame.removeAttribute('tabindex');
      if (o.onPlaying) o.onPlaying(true);
    }
    function stop() {
      if (!fr) return;
      fr.remove(); fr = null;
      frame.classList.remove('playing');
      frame.setAttribute('tabindex', 0);
      if (o.onPlaying) o.onPlaying(false);
    }
    tubes.push(me);
    frame.addEventListener('click', function () { start(true); });
    frame.addEventListener('keydown', function (ev) { if (!fr && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); start(true); } });
    if (o.auto) el._timer = setTimeout(function () { if (document.contains(el)) start(false); }, 450);
    return el;
  }
  /* opts: src, poster, auto (muted loop autoplay), short (creator sizing), onShape(isLandscape), onPlaying(bool),
     and for a clip with no src: yt (its YouTube id), embed (false when YouTube will not play it on other sites), link (the original's address) */
  function player(o) {
    if (!str(o.src)) return str(o.yt) && o.embed !== false ? tubePlayer(o) : linkPlayer(o);
    var v = h('video', { playsinline: true, preload: 'none' });
    var img = o.poster ? h('img', { src: o.poster, alt: '' }) : null;
    var frame = h('div', { class: 'frame' }, v, img);
    var playB = h('button', { class: 'ibtn', type: 'button', 'aria-label': 'Play' }, icon('play'));
    var muteB = h('button', { class: 'ibtn', type: 'button', 'aria-label': 'Sound' }, icon('sound'));
    var el = h('div', { class: 'player vert' + (o.short ? ' short' : '') }, frame, h('div', { class: 'pc' }, playB, muteB, progressBar(v)));
    var armed = false, shape = shaper(frame, el, o);
    v.loop = !!o.auto;
    v.muted = o.auto ? !state.sound : false;
    if (img) {
      img.addEventListener('load', function () { shape(img.naturalWidth, img.naturalHeight); });
      img.addEventListener('error', function () { img.remove(); });
    }
    v.addEventListener('loadedmetadata', function () { shape(v.videoWidth, v.videoHeight); });
    function arm() { if (!armed) { armed = true; v.src = o.src; } }
    function go() {
      arm();
      soloPlay(v);
      var p = v.play();
      if (p && p.catch) p.catch(function () { /* autoplay refused or file missing: the poster stays */ });
    }
    function toggle() { if (v.paused) go(); else v.pause(); }
    function sync() {
      var playing = !v.paused;
      playB.replaceChildren(icon(playing ? 'pause' : 'play'));
      playB.setAttribute('aria-label', playing ? 'Pause' : 'Play');
      muteB.replaceChildren(icon(v.muted ? 'mute' : 'sound'));
      muteB.setAttribute('aria-label', v.muted ? 'Turn sound on' : 'Turn sound off');
      if (o.onPlaying) o.onPlaying(playing);
    }
    v.addEventListener('playing', function () { frame.classList.add('playing'); sync(); });
    v.addEventListener('pause', sync);
    v.addEventListener('volumechange', sync);
    frame.addEventListener('click', toggle);
    playB.addEventListener('click', toggle);
    muteB.addEventListener('click', function () {
      v.muted = !v.muted;
      if (o.auto) state.sound = !v.muted;
    });
    sync();
    if (o.auto) el._timer = setTimeout(go, 110);
    return el;
  }
  function audioPlayer(src) {
    var a = h('audio', { preload: 'none' });
    var b = h('button', { class: 'rbtn', type: 'button', 'aria-label': 'Play their voice' }, icon('play'));
    var armed = false;
    function sync() {
      b.replaceChildren(icon(a.paused ? 'play' : 'pause'));
      b.setAttribute('aria-label', a.paused ? 'Play their voice' : 'Pause');
    }
    b.addEventListener('click', function () {
      if (!armed) { armed = true; a.src = src; }
      if (a.paused) { soloPlay(a); var p = a.play(); if (p && p.catch) p.catch(function () { /* file missing */ }); } else a.pause();
    });
    a.addEventListener('play', sync); a.addEventListener('pause', sync); a.addEventListener('ended', sync);
    return h('div', { class: 'audio' }, b, progressBar(a), h('p', { class: 'cap' }, 'Their own voice, from their own video'), a);
  }

  function setStage(kids) {
    stopMedia(stageMain);
    Array.prototype.forEach.call(stageMain.querySelectorAll('.player'), function (p) { clearTimeout(p._timer); });
    stageMain.replaceChildren();
    add(stageMain, kids);
    stageMain.scrollTop = 0;
  }
  function stateNames(r) {
    var lang = r.native ? (r.slug === 'jammu-and-kashmir' ? 'ur' : r.slug === 'ladakh' ? 'bo' : SCRIPT_LANG[r.languages[0]] || null) : 'en';
    var big = r.native || r.name;
    return [
      h('h2', { class: 'display' + (big.length > 16 ? ' long' : ''), lang: lang }, big),
      h('p', { class: 'names' }, h('span', { lang: 'hi' }, r.hindi), r.native ? ', ' + r.name : null),
      h('p', { class: 'meta dim', style: 'color:var(--flour)' }, r.languages.join(', '))
    ];
  }

  /* ---------- Regions ---------- */
  function renderRegionsRest() {
    setStage([
      h('h2', { class: 'heading' }, 'Move across the map. Every state answers with a clip filmed there.'),
      h('div', { class: 'terr' }, TINY.map(function (slug) {
        function on() { onStateEnter(slug, M.cent[slug]); }
        return h('button', { class: 'tbtn', type: 'button', onpointerenter: on, onfocus: on, onclick: on }, BY[slug].name);
      }))
    ]);
  }
  function renderRegion() {
    var slug = state.regionSlug, r = BY[slug];
    if (!r) return renderRegionsRest();
    var clips = clipsOf(slug), reg = DATA.regions[slug] || {};
    var kids = stateNames(r);
    if (!clips.length) {
      kids.push(h('p', { class: 'vibe' }, 'No clips from here yet. The trend scout fills this in on its next run.'));
      return setStage(kids);
    }
    var i = state.clipIdx % clips.length, c = clips[i];
    var now = h('span', { class: 'now label' }, 'Playing');
    var wrap = h('div', { class: 'clip' });
    var p = player({
      src: c.file, poster: c.poster, link: c.url, yt: ytOf(c), embed: c.embed, auto: true,
      onShape: function (land) { wrap.classList.toggle('land', land); },
      onPlaying: function (on) { now.classList.toggle('on', on); }
    });
    var views = Number(c.views);
    add(wrap, [p, h('div', { class: 'info' },
      h('p', { class: 'title' }, cleanTitle(c.title)),
      str(c.channel) ? h('p', null, clean(c.channel)) : null,
      isFinite(views) && views >= 1000 ? h('p', null, compact(views) + ' views') : null,
      str(c.hashtag) ? h('p', null, c.hashtag) : null,
      h('p', null, now),
      clips.length > 1 ? h('p', null, h('button', { class: 'tbtn', type: 'button', onclick: function () { state.clipIdx = (i + 1) % clips.length; renderRegion(); } }, (i + 1) + ' of ' + clips.length, icon('next'))) : null,
      str(c.url) ? h('p', null, ext(c.url, 'Open on YouTube')) : null
    )]);
    kids.push(wrap);
    if (str(reg.vibe)) kids.push(h('p', { class: 'vibe' }, reg.vibe));
    setStage(kids);
  }

  /* ---------- Creators ---------- */
  function creator(slug) {
    var base = ROSTER.filter(function (r) { return r.slug === slug; })[0];
    var c = DATA.creators[slug] || {};
    return { slug: slug, base: base, c: c, name: str(c.displayName) || base.name, loaded: !!DATA.creators[slug], dir: '../creators/' + slug + '/' };
  }
  function followersLine(cr) {
    var f = cr.c.followers || cr.base.followers || {}, out = [];
    [['instagram', 'Instagram'], ['youtube', 'YouTube'], ['x', 'X']].forEach(function (k) {
      if (str(f[k[0]])) out.push(k[1] + ' ' + str(f[k[0]]));
    });
    return out.join(', ');
  }
  function placed(cr) {
    var hm = cr.c.home;
    return !!(hm && (hm.status === 'confirmed' || hm.status === 'likely') && isFinite(Number(hm.lat)) && isFinite(Number(hm.lon)) && str(hm.lat) && str(hm.lon));
  }
  function reach(cr) {
    var slugs = [], lines = [];
    arr(cr.c.languages).forEach(function (lang) {
      var l = str(lang).toLowerCase();
      if (!l || l === 'english') return;
      var hit = TABLE.filter(function (r) { return r.languages.some(function (x) { return x.toLowerCase() === l; }); });
      if (!hit.length) return;
      var ut = hit.filter(function (r) { return UTS.indexOf(r.slug) >= 0; }).length, st = hit.length - ut;
      var what = ut && st ? hit.length + ' states and territories' : ut ? plural(ut, 'territory', 'territories') : plural(st, 'state', 'states');
      lines.push(str(lang) + ' is a main language in ' + what + '.');
      hit.forEach(function (r) { if (slugs.indexOf(r.slug) < 0) slugs.push(r.slug); });
    });
    return { slugs: slugs, text: lines.join(' ') };
  }
  function markLamp(slug) {
    Array.prototype.forEach.call(document.querySelectorAll('.lamp'), function (l) { l.classList.toggle('on', l.dataset.slug === slug); });
    Array.prototype.forEach.call(document.querySelectorAll('.row'), function (l) { l.classList.toggle('on', l.dataset.slug === slug); });
  }
  function lightCreator(slug) {
    var cr = creator(slug), home = placed(cr) ? cr.c.home.state : null;
    markLamp(slug);
    light(reach(cr).slugs, home);
  }
  function homeLine(cr) {
    var hm = cr.c.home || {}, city = str(hm.city);
    if (!city || /unverified/i.test(city) && !city.replace(/\(?unverified\)?/i, '').trim()) return 'Home city not confirmed yet';
    city = city.replace(/\s*\(unverified\)/i, '');
    var st = BY[hm.state] ? BY[hm.state].name : '';
    var place = city + (st && st.toLowerCase() !== city.toLowerCase() && city.toLowerCase().indexOf(st.toLowerCase()) < 0 ? ', ' + st : '');
    return place + (hm.status === 'confirmed' ? '' : hm.status === 'likely' ? ' (likely)' : ' (home unverified)');
  }
  function lampEl(cr) {
    var b = h('button', { class: 'lamp', type: 'button', 'data-slug': cr.slug, 'aria-label': cr.name },
      h('img', { src: cr.dir + 'photo.jpg', alt: '' }));
    var s = h('span');
    s.innerHTML = '<svg viewBox="-20 -24 40 44" aria-hidden="true"><path d="' + LOOP + '"/></svg>';
    b.appendChild(s.firstChild);
    function on() {
      lightCreator(cr.slug);
      var fr = field.getBoundingClientRect(), r = b.getBoundingClientRect();
      var hm = cr.c.home || {};
      showLabel([r.left - fr.left + r.width / 2 + 22, r.top - fr.top - 6], cr.name, placed(cr) ? homeLine(cr) : (hm.status ? 'home unverified' : null));
    }
    function off() { hideLabel(); restore(); }
    b.addEventListener('pointerenter', on); b.addEventListener('focus', on);
    b.addEventListener('pointerleave', off); b.addEventListener('blur', off);
    b.addEventListener('click', function () { openDossier(cr.slug); });
    return b;
  }
  function drawLamps() {
    var box = $('lamps'), row = $('parked-row');
    box.replaceChildren(); row.replaceChildren();
    M.gOver.selectAll('.creators-only').remove();
    var on = [], off = [];
    ROSTER.forEach(function (r) {
      var cr = creator(r.slug);
      if (!cr.loaded) return;
      if (placed(cr)) on.push(cr); else off.push(cr);
    });
    var groups = [];
    on.forEach(function (cr) {
      var p = M.proj([Number(cr.c.home.lon), Number(cr.c.home.lat)]);
      var g = groups.filter(function (q) { return Math.hypot(q.x - p[0], q.y - p[1]) < 56; })[0];
      if (!g) { g = { x: p[0], y: p[1], items: [] }; groups.push(g); }
      g.items.push({ cr: cr, p: p });
    });
    var gl = M.gOver.append('g').attr('class', 'creators-only');
    groups.forEach(function (g) {
      var n = g.items.length, R = n === 1 ? 0 : Math.max(46, n * 66 / (2 * Math.PI));
      g.items.forEach(function (it, i) {
        var a = -Math.PI / 2 + (n === 2 ? (i ? 0.35 : Math.PI - 0.35) + Math.PI / 2 : i * 2 * Math.PI / n);
        var x = g.x + R * Math.cos(a), y = g.y + R * Math.sin(a);
        if (n > 1) {
          gl.append('line').attr('class', 'leader').attr('x1', it.p[0]).attr('y1', it.p[1]).attr('x2', x).attr('y2', y);
          gl.append('circle').attr('class', 'homept').attr('cx', it.p[0]).attr('cy', it.p[1]).attr('r', 2.5);
        }
        var el = lampEl(it.cr);
        el.style.left = x + 'px'; el.style.top = y + 'px';
        box.appendChild(el);
      });
    });
    off.forEach(function (cr) { row.appendChild(lampEl(cr)); });
    $('parked').hidden = !off.length;
  }
  function renderRoster() {
    setStage([h('ul', { class: 'roster' }, ROSTER.map(function (r) {
      var cr = creator(r.slug);
      var bits = [arr(cr.c.niche).join(', ') || r.makes, arr(cr.c.languages).join(', '), followersLine(cr)].filter(Boolean);
      var line = h('span', { class: 'ln' }, bits.join('. ') + (bits.length ? '.' : ''));
      function on() { lightCreator(r.slug); }
      function off() { restore(); }
      return h('li', null, h('button', {
        class: 'row', type: 'button', 'data-slug': r.slug,
        onpointerenter: on, onfocus: on, onpointerleave: off, onblur: off,
        onclick: function () { openDossier(r.slug); }
      }, h('img', { src: cr.dir + 'photo.jpg', alt: '' }), h('span', null, h('span', { class: 'nm' }, cr.name), line)));
    }))]);
  }
  function accountLabel(key, a) {
    return str(a.label) || ({ youtube: 'YouTube', instagram: 'Instagram', x: 'X' })[key] || key;
  }
  function openDossier(slug) {
    var cr = creator(slug), c = cr.c, v = c.voice || {}, kids = [];
    state.creator = slug;
    hideLabel();
    kids.push(h('button', { class: 'tbtn back', type: 'button', onclick: closeDossier }, icon('back'), 'All eight'));

    var langs = arr(c.languages).join(', '), niche = arr(c.niche).join(', ') || cr.base.makes, rc = reach(cr).text;
    var hm = c.home || {};
    var links = [];
    Object.keys(c.accounts || {}).forEach(function (k) {
      var a = c.accounts[k];
      if (!a) return;
      // A handle someone suggested but the creator has not confirmed: shown as a question, never as theirs.
      var sg = a.suggested;
      if (sg && str(sg.url) && a.status !== 'confirmed' && a.status !== 'likely') {
        links.push(h('li', null, ext(sg.url, accountLabel(k, a) + (str(sg.handle) ? ' ' + sg.handle : '')), h('span', { class: 'st' }, 'to confirm')));
        return;
      }
      if (!str(a.url) || (a.status !== 'confirmed' && a.status !== 'likely')) return;
      var subs = Number(a.subscribers);
      links.push(h('li', null, ext(a.url, accountLabel(k, a) + (str(a.handle) ? ' ' + a.handle : '')),
        // Only YouTube counts were read from the platform itself; the rest come from trackers.
        isFinite(subs) && subs > 0 ? (/^youtube/i.test(k) ? ' ' + sig3(subs) + ' today' : ' about ' + compact(subs)) : null, h('span', { class: 'st' }, a.status)));
    });
    kids.push(h('div', { class: 'who' },
      h('img', { src: cr.dir + 'photo.jpg', alt: 'Portrait of ' + cr.name }),
      h('div', null,
        h('h2', { class: 'heading' }, cr.name),
        h('p', { class: 'meta' }, [niche, langs].filter(Boolean).join('. ') + '.'),
        cr.loaded ? h('p', { class: 'meta' }, homeLine(cr), str(hm.source) ? ext(hm.source, 'source', 'src') : null) : null,
        str(hm.note) ? h('p', { class: 'note' }, hm.note) : null,
        followersLine(cr) ? h('p', { class: 'meta' }, followersLine(cr) + ' (from the delegation brief)') : null,
        rc ? h('p', { class: 'meta' }, rc) : null,
        links.length ? h('ul', { class: 'links' }, links) : null)));
    if (str(c.bio)) kids.push(h('p', { style: 'margin-top:26px' }, c.bio));

    kids.push(h('hr', { class: 'rule' }), h('h3', { class: 'sec' }, 'How they sound'));
    if (str(v.oneLine)) {
      kids.push(h('p', { class: 'oneline' }, v.oneLine));
      var rows = [];
      [['Traits', arr(v.traits).join(' \u00b7 ')], ['Language', str(v.languageMix)], ['Pace', str(v.pace)], ['Opens with', arr(v.hooks).join(' ')], ['Based on', str(v.basedOn)]].forEach(function (p) {
        if (p[1] && !/^unverified\.?$/i.test(p[1])) rows.push(h('dt', { class: 'label' }, p[0]), h('dd', null, p[1]));
      });
      if (rows.length) kids.push(h('dl', { class: 'kv' }, rows));
      var sig = arr(v.signature).filter(function (s) { return s && str(s.text); });
      if (sig.length) kids.push(h('ul', { class: 'phrases' }, sig.map(function (s) {
        return h('li', null, h('p', { class: 'ph' }, s.text), str(s.meaning) ? h('p', { class: 'mn' }, s.meaning) : null);
      })));
      if (str(v.sample)) kids.push(audioPlayer(cr.dir + v.sample));
      else if (str(v.sampleNote)) kids.push(h('p', { style: 'margin-top:18px' }, v.sampleNote));
      else kids.push(h('p', { style: 'margin-top:18px' }, 'No voice sample yet. We only clip a voice from a video we are sure is theirs.'));
    } else {
      kids.push(h('p', null, 'No voice notes yet. We only describe a voice after watching videos we are sure are theirs.'));
    }

    kids.push(h('hr', { class: 'rule' }), h('h3', { class: 'sec' }, 'Their videos'));
    var vids = arr(c.videos).filter(function (x) { return x && (str(x.file) || str(x.url)); });
    if (!vids.length) kids.push(h('p', null, 'No videos yet. We could not confirm an account that is certainly theirs.'));
    vids.forEach(function (x) {
      var b = x.breakdown || {}, wrap = h('div', { class: 'clip video' });
      var stats = [];
      if (Number(x.views) > 0) stats.push(compact(x.views) + ' views');
      if (Number(x.likes) > 0) stats.push(compact(x.likes) + ' likes');
      if (str(x.uploaded)) stats.push(fmtDate(x.uploaded));
      var p = player({ src: str(x.file) ? cr.dir + x.file : '', poster: str(x.poster) ? cr.dir + x.poster : null, link: x.url, yt: ytOf(x), embed: x.embed, short: true, onShape: function (land) { wrap.classList.toggle('land', land); } });
      add(wrap, [p, h('div', { class: 'info' },
        h('p', { class: 'title' }, clean(x.title)),
        str(x.titleGloss) ? h('p', null, x.titleGloss) : null,
        stats.length ? h('p', null, stats.join(', ')) : null,
        str(x.url) ? h('p', null, ext(x.url, 'Open the original')) : null)]);
      kids.push(wrap);
      var bd = [];
      if (str(b.hook)) bd.push(h('h4', null, 'Hook'), h('p', null, b.hook));
      if (arr(b.beats).length) bd.push(h('h4', null, 'Beats'), h('ol', { class: 'beats' }, arr(b.beats).map(function (t) { return h('li', null, h('span', null, t)); })));
      if (str(b.whyItWorks)) bd.push(h('h4', null, 'Why it works'), h('p', null, b.whyItWorks));
      if (Number(b.cutsPerMin) > 0) bd.push(h('h4', null, 'Cuts per minute'), h('p', null, String(Math.round(Number(b.cutsPerMin) * 10) / 10)));
      if (bd.length) kids.push(h('div', { class: 'bd' }, bd));
    });

    kids.push(h('hr', { class: 'rule' }), h('h3', { class: 'sec' }, 'For this trip'));
    var ideas = arr(c.israelIdeas).filter(function (x) { return x && str(x.title); });
    if (!ideas.length) kids.push(h('p', null, 'No ideas written yet. They come after we have heard the voice.'));
    ideas.forEach(function (x) {
      kids.push(h('div', { class: 'idea' },
        h('h4', null, x.title),
        str(x.place) ? h('p', { class: 'meta' }, x.place) : null,
        str(x.hook) ? h('blockquote', null, x.hook) : null,
        str(x.why) ? h('p', null, x.why) : null));
    });
    if (str(c.aiAssist)) kids.push(h('hr', { class: 'rule' }), h('h3', { class: 'sec' }, 'Where AI helps'), h('p', null, c.aiAssist));
    kids.push(h('p', { class: 'foot' }, 'This is a folder in the cabinet: creators/' + slug));

    stopMedia(dossierEl);
    dossierEl.replaceChildren();
    add(dossierEl, kids);
    dossierEl.hidden = false;
    dossierEl.scrollTop = 0;
    dossierEl.classList.remove('in');
    void dossierEl.offsetWidth;
    dossierEl.classList.add('in');
    stageMain.inert = true;
    toStage();
    dossierEl.querySelector('.back').focus({ preventScroll: true });
    lightCreator(slug);
  }
  function closeDossier() {
    if (dossierEl.hidden) return;
    var slug = state.creator;
    stopMedia(dossierEl);
    dossierEl.hidden = true;
    dossierEl.replaceChildren();
    stageMain.inert = false;
    state.creator = null;
    restore();
    var row = stageMain.querySelector('.row[data-slug="' + slug + '"]');
    if (row) row.focus({ preventScroll: true });
    restore();
  }

  /* ---------- AI ---------- */
  function hubs() { return DATA.ai ? arr(DATA.ai.hubs).filter(function (x) { return x && str(x.slug); }) : []; }
  function currentHub() { return hubs().filter(function (x) { return x.slug === state.hub; })[0] || null; }
  function markHub(slug) {
    M.gOver.selectAll('.hub').classed('on', function () { return this.getAttribute('data-slug') === slug; });
  }
  function drawHubs() {
    M.gOver.selectAll('.ai-only').remove();
    var g = M.gOver.append('g').attr('class', 'ai-only');
    var pts = hubs().map(function (x) { return { x: x, p: M.proj([Number(x.lon), Number(x.lat)]) }; }).filter(function (o) { return o.p && isFinite(o.p[0]); });
    pts.forEach(function (o) {
      var left = pts.some(function (q) { return q !== o && q.p[0] > o.p[0] && q.p[0] - o.p[0] < 130 && Math.abs(q.p[1] - o.p[1]) < 16; });
      var n = g.append('g').attr('class', 'hub').attr('data-slug', o.x.slug).attr('transform', 'translate(' + o.p[0] + ',' + o.p[1] + ')');
      n.append('path').attr('class', 'hl').attr('d', LOOP).attr('transform', 'scale(0.82)').attr('vector-effect', 'non-scaling-stroke');
      n.append('circle').attr('class', 'hd').attr('r', 5);
      n.append('text').attr('x', left ? -16 : 16).attr('y', 4).attr('text-anchor', left ? 'end' : 'start').text(str(o.x.city));
      n.append('circle').attr('r', 16).attr('fill', 'transparent');
      n.on('pointerenter', function () { selectHub(o.x.slug); }).on('click', function () { selectHub(o.x.slug); });
    });
  }
  function selectHub(slug) {
    if (state.hub === slug) { restore(); return; }
    state.hub = slug;
    renderHub();
    restore();
    toStage();
  }
  function factList(list) {
    return h('ul', { class: 'facts' }, arr(list).filter(function (f) { return f && str(f.text); }).map(function (f) {
      return h('li', null, f.text, str(f.source) ? ext(f.source, 'source', 'src') : null);
    }));
  }
  function renderAiRest() {
    if (!DATA.ai) return setStage([h('h2', { class: 'heading' }, 'The AI desk has not filed yet.')]);
    var n = DATA.ai.national || {};
    setStage([
      str(n.headline) ? h('h2', { class: 'heading', style: 'font-size:clamp(1.6rem,2.2vw,2.3rem)' }, n.headline) : null,
      factList(n.facts),
      h('hr', { class: 'rule' }),
      h('div', { class: 'hublist' }, hubs().map(function (x) {
        function on() { markHub(x.slug); light([x.state], x.state); }
        return h('button', { class: 'tbtn', type: 'button', onpointerenter: on, onfocus: on, onpointerleave: restore, onblur: restore, onclick: function () { selectHub(x.slug); } }, str(x.city));
      }))
    ]);
  }
  function renderHub() {
    var x = currentHub();
    if (!x) return renderAiRest();
    var kids = [
      h('button', { class: 'tbtn back', type: 'button', onclick: function () { state.hub = null; renderAiRest(); restore(); } }, icon('back'), 'All hubs'),
      h('h2', { class: 'display' + (str(x.city).length > 11 ? ' long' : '') }, str(x.city)),
      str(x.tagline) ? h('p', { class: 'tag' }, x.tagline) : null
    ];
    var pl = arr(x.players).filter(function (p) { return p && str(p.name); });
    if (pl.length) kids.push(h('hr', { class: 'rule' }), h('ul', { class: 'players' }, pl.map(function (p) {
      return h('li', null, h('b', null, p.name), str(p.what) ? '. ' + p.what : null, str(p.source) ? ext(p.source, 'source', 'src') : null);
    })));
    if (arr(x.facts).length) kids.push(h('hr', { class: 'rule' }), factList(x.facts));
    var c = arr(x.clips).filter(function (q) { return q && (str(q.file) || str(q.url)); })[0];
    if (c) {
      var wrap = h('div', { class: 'clip' });
      add(wrap, [player({ src: c.file, poster: str(c.poster) || null, link: c.url, yt: ytOf(c), embed: c.embed, auto: true, onShape: function (land) { wrap.classList.toggle('land', land); } }),
        h('div', { class: 'info' }, h('p', { class: 'title' }, cleanTitle(c.title)), str(c.channel) ? h('p', null, clean(c.channel)) : null,
          Number(c.views) >= 1000 ? h('p', null, compact(c.views) + ' views') : null, str(c.url) ? h('p', null, ext(c.url, 'Open on YouTube')) : null)]);
      kids.push(h('hr', { class: 'rule' }), wrap);
    }
    setStage(kids);
  }

  /* ---------- lens + status ---------- */
  function statusText() {
    var n = 0, st = 0, upd = '', k;
    function later(d) { d = str(d); if (d > upd) upd = d; }
    if (state.lens === 'regions') {
      TABLE.forEach(function (r) { var c = clipsOf(r.slug).length; n += c; if (c) { st++; later(DATA.regions[r.slug].updatedAt); } });
      if (!n) return 'Regions feed: no clips yet.';
      return 'Regions feed: ' + plural(n, 'clip', 'clips') + ' across ' + plural(st, 'state or territory', 'states and territories') + '.' + (upd ? ' Updated ' + fmtDate(upd) + '.' : '');
    }
    if (state.lens === 'ai') {
      if (!DATA.ai) return 'AI desk: nothing filed yet.';
      var srcs = {};
      arr((DATA.ai.national || {}).facts).forEach(function (f) { if (f && str(f.source)) srcs[f.source] = 1; });
      hubs().forEach(function (x) { arr(x.players).concat(arr(x.facts)).forEach(function (f) { if (f && str(f.source)) srcs[f.source] = 1; }); });
      later(DATA.ai.updatedAt);
      return 'AI desk: ' + plural(hubs().length, 'hub', 'hubs') + ', ' + plural(Object.keys(srcs).length, 'source', 'sources') + ' opened.' + (upd ? ' Updated ' + fmtDate(upd) + '.' : '');
    }
    for (k in DATA.creators) { st++; n += arr(DATA.creators[k].videos).length; later(DATA.creators[k].updatedAt); }
    if (!st) return 'Creators: ' + ROSTER.length + ' folders, not studied yet.';
    return 'Creators: ' + plural(st, 'folder', 'folders') + ', ' + plural(n, 'video', 'videos') + ' studied.' + (upd ? ' Updated ' + fmtDate(upd) + '.' : '');
  }
  function setLens(lens, force) {
    if (lens === state.lens && !force) return;
    if (!dossierEl.hidden) { stopMedia(dossierEl); dossierEl.hidden = true; dossierEl.replaceChildren(); stageMain.inert = false; }
    state.lens = lens; state.creator = null;
    document.body.dataset.lens = lens;
    Array.prototype.forEach.call(document.querySelectorAll('.lens'), function (b) { b.setAttribute('aria-pressed', String(b.dataset.lens === lens)); });
    Object.keys(M.groups).forEach(function (slug) { M.groups[slug].classList.toggle('alive', lens === 'regions' && clipsOf(slug).length > 0); });
    hideLabel();
    litKey = '~';
    if (lens === 'creators') renderRoster();
    else if (lens === 'regions') { if (state.regionSlug) renderRegion(); else renderRegionsRest(); }
    else renderHub();
    restore();
    $('status-text').textContent = statusText();
  }
  var tour = null;
  function stopTour() {
    if (!tour) return;
    clearTimeout(tour.timer);
    tour = null;
    $('tour').textContent = 'Tour';
    $('status-text').textContent = statusText();
  }
  function tourStep() {
    if (!tour) return;
    var slug = tour.list[tour.i];
    onStateEnter(slug, M.cent[slug]);
    $('status-text').textContent = 'Tour: ' + BY[slug].name + ', ' + (tour.i + 1) + ' of ' + tour.list.length + '.';
    tour.timer = setTimeout(function () {
      if (!tour) return;
      tour.i = (tour.i + 1) % tour.list.length;
      tourStep();
    }, 5000);
  }
  function startTour() {
    stopTour();
    var list = TABLE.map(function (r) { return r.slug; }).filter(function (s) { return clipsOf(s).length > 0 && M.cent[s]; });
    if (!list.length) return;
    setLens('regions');
    tour = { list: list, i: 0, timer: null, t0: Date.now(), at: null };
    $('tour').textContent = 'Stop tour';
    tourStep();
  }
  function buildChrome() {
    var g = $('greeting');
    GREETINGS.forEach(function (x, i) {
      g.appendChild(h('span', { class: 'display' + (i === 0 ? ' on' : ''), lang: x[1], dir: x[1] === 'he' ? 'rtl' : null, 'aria-hidden': 'true' }, x[0]));
    });
    var gi = 0;
    setInterval(function () {
      g.children[gi].classList.remove('on');
      gi = (gi + 1) % GREETINGS.length;
      var next = g.children[gi];
      setTimeout(function () { next.classList.add('on'); }, 320);
    }, 4000);
    var nav = $('lenses');
    LENSES.forEach(function (l) {
      var b = h('button', { class: 'lens', type: 'button', 'data-lens': l[0], 'aria-pressed': String(l[0] === state.lens), style: '--lc:' + l[2], onclick: function () { setLens(l[0]); } });
      b.innerHTML = '<svg viewBox="-20 -24 40 44" aria-hidden="true"><path class="ll" d="' + LOOP + '"/><circle class="ld" r="5.5"/></svg>';
      b.appendChild(document.createTextNode(l[1]));
      nav.appendChild(b);
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      if (tour) { stopTour(); return; }
      if (ev.key === 't' || ev.key === 'T') { startTour(); return; }
      if (ev.key === '1') setLens('creators');
      else if (ev.key === '2') setLens('regions');
      else if (ev.key === '3') setLens('ai');
      else if (ev.key === 'Escape') {
        if (!dossierEl.hidden) closeDossier();
        else if (state.lens === 'ai' && state.hub) { state.hub = null; renderAiRest(); restore(); }
      }
    });
    field.addEventListener('pointerleave', hideLabel);
    $('tour').addEventListener('click', function (ev) {
      ev.stopPropagation();
      if (tour) stopTour(); else startTour();
    });
    document.addEventListener('click', function () { stopTour(); }, true);
    field.addEventListener('pointermove', function (ev) {
      if (!tour || Date.now() - tour.t0 < 800) return;
      if (!tour.at) { tour.at = [ev.clientX, ev.clientY]; return; }
      if (Math.hypot(ev.clientX - tour.at[0], ev.clientY - tour.at[1]) > 8) stopTour();
    });
  }
  function overlays() { drawLamps(); drawHubs(); }

  drawSeam();
  buildChrome();
  buildMap(!REDUCED);
  renderRoster();
  $('status-text').textContent = '';
  loadAll().then(function () {
    overlays();
    setLens(state.lens, true);
    var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 600); };
    idle(function () {
      TABLE.forEach(function (r) { clipsOf(r.slug).forEach(function (c) { if (str(c.poster)) { new Image().src = c.poster; } }); });
    });
  });
  var rz;
  window.addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () {
      drawSeam();
      litKey = '~';
      buildMap(false);
      overlays();
      Object.keys(M.groups).forEach(function (slug) { M.groups[slug].classList.toggle('alive', state.lens === 'regions' && clipsOf(slug).length > 0); });
      restore();
    }, 150);
  });
  if (embedded) {
    tell({ type: 'india-map:ready' });
    tellSize();
    if (window.ResizeObserver) new ResizeObserver(tellSize).observe(document.body);
    window.addEventListener('load', tellSize);
  }
})();
