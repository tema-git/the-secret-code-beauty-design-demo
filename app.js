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
    motionToggle.textContent = reduced ? 'Движение уменьшено' : 'Уменьшить движение';
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
  const clamp = value => Math.max(0, Math.min(1, value));
  function updateScroll() {
    frame = 0;
    const height = window.innerHeight;
    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      const rect = scene.getBoundingClientRect();
      bounds.set(scene, rect);
      const progress = wantsReduced() ? 1 : clamp((height - rect.top) / (height * .65 + Math.min(rect.height * .3, 230)));
      scene.style.setProperty('--scroll', progress.toFixed(3));
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
      if (!finePointer.matches || wantsReduced()) return;
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
  window.addEventListener('resize', () => {scenes.forEach(scene => bounds.set(scene,scene.getBoundingClientRect()));scheduleScroll();}, {passive:true});
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
  document.querySelectorAll('[data-book-service]').forEach(link => link.addEventListener('click', () => {serviceField.value=link.dataset.bookService;}));

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
  document.querySelectorAll('[data-occasion],[data-mood]').forEach(button => {
    button.addEventListener('click', () => {
      const type = button.dataset.occasion ? 'occasion' : 'mood';
      state[type] = button.dataset[type];
      document.querySelectorAll(`[data-${type}]`).forEach(other => other.setAttribute('aria-pressed',String(other === button)));
      if (!codeResult.hidden) {
        codeResult.hidden = true;
        codeCard.classList.remove('complete');
        document.getElementById('code-title').textContent = 'Новый поворот.';
        document.getElementById('code-description').textContent = 'Откройте карточку, чтобы увидеть обновлённое настроение.';
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
    status.textContent = 'Ваш beauty-код готов. Можно обсудить его с мастером или собрать новый.';
    codeCard.focus({preventScroll:true});
    if (window.innerWidth < 801) codeCard.scrollIntoView({behavior:wantsReduced()?'auto':'smooth',block:'center'});
    scheduleScroll();
  });
  document.getElementById('reset-code').addEventListener('click', () => {
    state.occasion = null;state.mood = null;
    document.querySelectorAll('[data-occasion],[data-mood]').forEach(button => button.setAttribute('aria-pressed','false'));
    codeCard.classList.remove('complete');codeCard.style.backgroundColor='';codeResult.hidden=true;
    document.getElementById('code-eyebrow').textContent='Место для вашего настроения';
    document.getElementById('code-title').textContent='Your secret.';
    document.getElementById('code-description').textContent='Один маленький выбор может стать началом нового образа.';
    showChoiceStatus();document.querySelector('[data-occasion]').focus();scheduleScroll();
  });
  document.getElementById('use-code').addEventListener('click', () => {serviceField.value=state.mood==='calm'?'SPA и уход':'Хочу обсудить образ';});

  const form = document.getElementById('booking-form');
  const nameField = document.getElementById('name');
  const phoneField = document.getElementById('phone');
  const success = document.getElementById('booking-success');
  function setError(field,message) {
    field.setAttribute('aria-invalid',String(Boolean(message)));
    document.getElementById(`${field.id}-error`).textContent=message;
  }
  [nameField,phoneField].forEach(field => field.addEventListener('input', () => {setError(field,'');document.getElementById('form-feedback').textContent='';}));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const nameValid = nameField.value.trim().length >= 2 && /[A-Za-zА-Яа-яЁё]/.test(nameField.value);
    const digits = phoneField.value.replace(/\D/g,'');
    const phoneValid = digits.length >= 10 && digits.length <= 15 && /^[+\d\s()\-]+$/.test(phoneField.value);
    setError(nameField,nameValid?'':'Введите имя — минимум 2 символа.');
    setError(phoneField,phoneValid?'':'Введите телефон: от 10 до 15 цифр.');
    if (!nameValid || !phoneValid) {
      document.getElementById('form-feedback').textContent='Проверьте отмеченные поля.';
      (!nameValid?nameField:phoneField).focus();return;
    }
    form.reset();
    document.getElementById('form-feedback').textContent='';
    form.hidden=true;success.hidden=false;success.focus({preventScroll:true});scheduleScroll();
  });
  document.getElementById('booking-reset').addEventListener('click', () => {
    form.reset();form.hidden=false;success.hidden=true;setError(nameField,'');setError(phoneField,'');nameField.focus();scheduleScroll();
  });
  window.addEventListener('pagehide', () => {cancelAnimationFrame(frame);cancelAnimationFrame(pointerFrame);form.reset();});
})();
