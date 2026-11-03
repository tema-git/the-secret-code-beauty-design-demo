(() => {
  'use strict';
  const config = window.SALON_CONFIG || {};
  document.querySelectorAll('[data-company]').forEach(el => {
    const value = config[el.dataset.company];
    if (value) el.textContent = value;
  });
  document.querySelectorAll('[data-company-link]').forEach(el => {
    const key = el.dataset.companyLink;
    if (config[key]) el.href = `${key === 'phone' ? 'tel' : 'mailto'}:${config[key]}`;
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let manualReduced = false;
  const wantsReduced = () => reducedMotion.matches || manualReduced;
  const motionToggle = document.getElementById('motion-toggle');
  function syncMotion() {
    const reduced = wantsReduced();
    document.documentElement.classList.toggle('motion-reduced', reduced);
    motionToggle.setAttribute('aria-pressed', String(reduced));
    motionToggle.textContent = reducedMotion.matches ? 'Движение снижено на устройстве' : reduced ? 'Включить движение' : 'Уменьшить движение';
    motionToggle.disabled = reducedMotion.matches;
  }
  motionToggle.addEventListener('click', () => {manualReduced = !manualReduced;syncMotion();scheduleScroll();});
  syncMotion();
  const finePointer = window.matchMedia('(pointer: fine)');
  const scenes = Array.from(document.querySelectorAll('[data-scene]'));
  let frame = 0;
  let pointerFrame = 0;
  let pendingScene = null;
  let pointerX = 0;
  let pointerY = 0;
  const bounds = new WeakMap();
  const scrollProgress = new Float64Array(scenes.length);
  const clamp = value => Math.max(0, Math.min(1, value));
  function updateScroll() {
    frame = 0;
    const height = window.innerHeight;
    const reduced = wantsReduced();
    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      const rect = scene.getBoundingClientRect();
      bounds.set(scene, rect);
      scrollProgress[i] = reduced ? 1 : clamp((height - rect.top) / (height * .65 + Math.min(rect.height * .3, 230)));
    }
    for (let i = 0; i < scenes.length; i++) {
      scenes[i].style.setProperty('--scroll', scrollProgress[i].toFixed(3));
    }
  }
  function scheduleScroll() {
    if (!frame) frame = requestAnimationFrame(updateScroll);
  }
  function flushPointer() {
    pointerFrame = 0;
    if (!pendingScene || wantsReduced() || !finePointer.matches) return;
    pendingScene.style.setProperty('--px', pointerX.toFixed(3));
    pendingScene.style.setProperty('--py', pointerY.toFixed(3));
  }
  scenes.forEach(scene => {
    scene.addEventListener('pointerenter', () => bounds.set(scene, scene.getBoundingClientRect()));
    scene.addEventListener('pointermove', event => {
      if (!finePointer.matches || wantsReduced() || event.pointerType === 'touch') return;
      const rect = bounds.get(scene);
      if (!rect) return;
      pointerX = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      pointerY = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
      pendingScene = scene;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(flushPointer);
    });
    scene.addEventListener('pointerleave', () => {
      if (pendingScene === scene) pendingScene = null;
      scene.style.setProperty('--px', '0');
      scene.style.setProperty('--py', '0');
    });
  });
  window.addEventListener('scroll', scheduleScroll, {passive:true});
  window.addEventListener('resize', scheduleScroll, {passive:true});
  window.addEventListener('load', scheduleScroll);
  window.addEventListener('pageshow', scheduleScroll);
  document.fonts.ready.then(scheduleScroll);
  reducedMotion.addEventListener('change', () => {
    syncMotion();
    scenes.forEach(scene => {scene.style.setProperty('--px','0');scene.style.setProperty('--py','0');});
    scheduleScroll();
  });
  scheduleScroll();

  const serviceNames = {hair:'Hair',brows:'Regard',spa:'Slow'};
  document.querySelectorAll('.service-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const wasOpen = button.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.service-toggle').forEach(other => {
        const open = other === button && !wasOpen;
        other.setAttribute('aria-expanded', String(open));
        other.closest('.service-item').classList.toggle('open', open);
        document.getElementById(other.getAttribute('aria-controls')).hidden = !open;
      });
      document.querySelector('.service-art').dataset.view = button.dataset.service;
      document.getElementById('service-word').textContent = serviceNames[button.dataset.service];
      scheduleScroll();
    });
  });
  const serviceField = document.getElementById('service');
  document.querySelectorAll('[data-book-service]').forEach(link => link.addEventListener('click', () => openBooking(link.dataset.bookService)));

  const state = {occasion:null,mood:null};
  const status = document.getElementById('choice-status');
  const codeCard = document.getElementById('code-card');
  const codeResult = document.getElementById('code-result');
  const labels = {everyday:'День для себя',date:'Особенный вечер',change:'Хочу перемен',soft:'Нежность',bold:'Смелость',calm:'Спокойствие'};
  const codeData = {
    soft:{title:'Мягкая сила',description:'Нежные линии, лёгкая укладка, выразительный взгляд. Образ, который не спорит с вами, а продолжает вас.',services:'Волосы / Брови и ресницы',color:'#48213b'},
    bold:{title:'Главная роль',description:'Новая форма, выразительный цвет или смелый акцент во взгляде. Начните с одной детали, которую давно хотелось попробовать.',services:'Волосы / Брови и ресницы',color:'#5c1638'},
    calm:{title:'Тихая роскошь',description:'Уход без спешки и комфортный образ. Оставьте время для SPA и спокойного разговора о том, что подходит именно вам.',services:'SPA и уход / Волосы',color:'#332337'}
  };
  function showChoiceStatus() {
    status.classList.remove('error');
    status.textContent = state.occasion && state.mood ? 'Всё готово. Откройте свою карточку.' : state.occasion ? 'Теперь выберите настроение.' : state.mood ? 'Теперь выберите повод.' : 'Выберите повод и настроение.';
  }
  function invalidateCode() {
    codeResult.hidden = true;
    codeCard.classList.remove('complete');
    codeCard.style.backgroundColor = '';
    document.getElementById('code-eyebrow').textContent = 'Новый выбор';
    document.getElementById('code-title').textContent = 'Новый поворот.';
    document.getElementById('code-description').textContent = 'Откройте карточку, чтобы увидеть обновлённое настроение.';
    document.getElementById('code-services').textContent = '';
    clearAttachedCode();
  }
  document.querySelectorAll('[data-occasion],[data-mood]').forEach(button => {
    button.addEventListener('click', () => {
      const type = button.dataset.occasion ? 'occasion' : 'mood';
      if (state[type] === button.dataset[type]) return;
      state[type] = button.dataset[type];
      document.querySelectorAll(`[data-${type}]`).forEach(other => other.setAttribute('aria-pressed',String(other === button)));
      if (!codeResult.hidden) {
        invalidateCode();
      }
      showChoiceStatus();
    });
  });
  document.getElementById('reveal-code').addEventListener('click', () => {
    if (!state.occasion || !state.mood) {
      status.textContent = 'Сначала выберите повод и настроение — по одному варианту в каждом шаге.';
      status.classList.add('error');
      document.querySelector(state.occasion ? '[data-mood]' : '[data-occasion]').focus();
      return;
    }
    const data = codeData[state.mood];
    codeCard.classList.add('complete');
    codeCard.style.backgroundColor = data.color;
    document.getElementById('code-eyebrow').textContent = `${labels[state.occasion]} / ${labels[state.mood]}`;
    document.getElementById('code-title').textContent = data.title;
    document.getElementById('code-description').textContent = data.description;
    document.getElementById('code-services').textContent = `Ваши направления: ${data.services}`;
    codeResult.hidden = false;
    status.classList.remove('error');
    status.textContent = 'Ваш beauty-код готов. Можно обсудить его с мастером или собрать новый.';
    codeCard.focus({preventScroll:true});
    if (window.innerWidth < 801) codeCard.scrollIntoView({behavior:wantsReduced()?'auto':'smooth',block:'center'});
    scheduleScroll();
  });
  document.getElementById('reset-code').addEventListener('click', () => {
    state.occasion = null;state.mood = null;
    clearAttachedCode();
    document.querySelectorAll('[data-occasion],[data-mood]').forEach(button => button.setAttribute('aria-pressed','false'));
    codeCard.classList.remove('complete');codeCard.style.backgroundColor='';codeResult.hidden=true;
    document.getElementById('code-eyebrow').textContent='Место для вашего настроения';
    document.getElementById('code-title').textContent='Your secret.';
    document.getElementById('code-description').textContent='Один маленький выбор может стать началом нового образа.';
    showChoiceStatus();document.querySelector('[data-occasion]').focus();scheduleScroll();
  });
  document.getElementById('use-code').addEventListener('click', () => {
    if (codeResult.hidden || !state.occasion || !state.mood) return;
    openBooking(state.mood === 'calm' ? 'SPA и уход' : 'Хочу обсудить образ', `${labels[state.occasion]} / ${labels[state.mood]} — ${codeData[state.mood].title}`);
  });

  const form = document.getElementById('booking-form');
  const nameField = document.getElementById('name');
  const phoneField = document.getElementById('phone');
  const success = document.getElementById('booking-success');
  const selectedCode = document.getElementById('selected-code');
  let codeAttached = false;
  function setError(field,message) {
    field.setAttribute('aria-invalid',String(Boolean(message)));
    document.getElementById(`${field.id}-error`).textContent=message;
  }
  function clearAttachedCode() {
    if (codeAttached) serviceField.value = 'Хочу обсудить образ';
    codeAttached = false;
    selectedCode.textContent = '';
    selectedCode.hidden = true;
  }
  function openBooking(service, summary = '') {
    if (form.hidden) form.reset();
    form.hidden = false;
    success.hidden = true;
    setError(nameField, '');
    setError(phoneField, '');
    document.getElementById('form-feedback').textContent = '';
    serviceField.value = service;
    codeAttached = Boolean(summary);
    selectedCode.textContent = summary ? `Ваш beauty-код: ${summary}` : '';
    selectedCode.hidden = !summary;
    scheduleScroll();
  }
  serviceField.addEventListener('change', () => {
    codeAttached = false;
    selectedCode.textContent = '';
    selectedCode.hidden = true;
  });
  [nameField,phoneField].forEach(field => field.addEventListener('input', () => {setError(field,'');document.getElementById('form-feedback').textContent='';}));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = nameField.value.trim();
    const nameValid = (name.match(/\p{L}/gu) || []).length >= 2 && /^[\p{L}\p{M}\s'’\-]+$/u.test(name);
    const phone = phoneField.value.trim();
    const digits = phone.replace(/\D/g,'');
    const phoneValid = digits.length >= 10 && digits.length <= 15 && /^\+?[\d\s()\-]+$/.test(phone);
    setError(nameField,nameValid?'':'Введите имя: минимум 2 буквы; допустимы пробелы, апостроф и дефис.');
    setError(phoneField,phoneValid?'':'Введите 10–15 цифр; знак + допустим только в начале.');
    if (!nameValid || !phoneValid) {
      document.getElementById('form-feedback').textContent='Проверьте отмеченные поля.';
      (!nameValid?nameField:phoneField).focus();return;
    }
    form.reset();
    clearAttachedCode();
    document.getElementById('form-feedback').textContent='';
    form.hidden=true;success.hidden=false;success.focus({preventScroll:true});scheduleScroll();
  });
  document.getElementById('booking-reset').addEventListener('click', () => {
    form.reset();clearAttachedCode();form.hidden=false;success.hidden=true;setError(nameField,'');setError(phoneField,'');document.getElementById('form-feedback').textContent='';nameField.focus();scheduleScroll();
  });
  window.addEventListener('pagehide', () => {cancelAnimationFrame(frame);cancelAnimationFrame(pointerFrame);frame=0;pointerFrame=0;pendingScene=null;form.reset();clearAttachedCode();});
})();
