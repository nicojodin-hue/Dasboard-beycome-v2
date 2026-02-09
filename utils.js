// ============================================================
// utils.js — Beycome Dashboard Utility & Helper Functions
// ============================================================

// ── Products Catalog ─────────────────────────────────────────
export const products = {
  packages: [
    { id: 'basic', name: 'Basic', price: 99 },
    { id: 'enhanced', name: 'Enhanced', price: 399 },
    { id: 'concierge', name: 'Concierge', price: 999 },
  ],
  alacarte: [
    { id: 'title', name: 'Title/Escrow', price: 99, hideFor: ['concierge'], badge: 'Most added', physical: false, nowOrNever: false },
    { id: 'photos', name: '25 Professional HD Photos', price: 189, hideFor: ['enhanced', 'concierge'], badge: null, physical: false, nowOrNever: false },
    { id: 'support', name: 'Access to Pro Support', price: 199, hideFor: ['concierge'], badge: 'Now or never', physical: false, nowOrNever: true },
    { id: 'cma', name: 'Comparative Market Analysis', price: 65, hideFor: ['concierge'], badge: null, physical: false, nowOrNever: false },
    { id: 'dual-mls', name: 'Double your MLS reach', price: 79, hideFor: ['concierge'], badge: null, physical: false, nowOrNever: false },
    { id: 'warranty', name: 'Home Warranty', price: 19, hideFor: [], badge: null, physical: false, nowOrNever: false },
    { id: 'sign', name: '1x Pro Yard Sign', price: 35, hideFor: ['concierge'], badge: null, physical: true, nowOrNever: false },
    { id: 'openhouse', name: '1x Open House Signage Kit', price: 45, hideFor: ['concierge'], badge: null, physical: true, nowOrNever: false },
    { id: 'lockbox', name: '1x Keylock Box', price: 30, hideFor: ['concierge'], badge: null, physical: true, nowOrNever: false },
    { id: 'spotlight', name: 'beycome Spotlight Listing', price: 29, hideFor: ['concierge'], badge: null, physical: false, nowOrNever: false },
  ],
};

// ── Package Includes Descriptions ────────────────────────────
export const pkgIncludes = {
  basic: [
    'Listing on your local MLS',
    'Syndication to 100+ top real estate sites',
    'Maximum photos allowed by the MLS',
    'Direct online offers & messaging dashboard',
    'Free, unlimited updates and changes',
    'Free, unlimited open house scheduler',
    'Free ShowingTime℠ (when available)',
    'Free Home Visit Manager tool',
    '24-month MLS listing',
    'Cancel anytime for free',
    '$0 due at closing — no hidden fees, ever',
    'Free access to all legal forms/disclosures',
    'Call, chat, and email support (6 days a week in English & Spanish)',
  ],
  enhanced: [
    '<strong>25 HDR Professional Photos</strong>',
    '<strong>1x Key lock box</strong>',
    '<strong>1x personalized yard sign + open house package</strong>',
    '<strong>Customizable flyers and brochure</strong>',
    '<strong>Virtual tour YouTube© video</strong>',
    '<strong>Printable promotional items</strong>',
    '<strong>Craigslist© easy click & share Ad</strong>',
    '<strong>Digital advertising suitable for social media sharing</strong>',
    '<strong>Featured on beycome.com</strong>',
    '<strong>$0 due at closing — no hidden fees, ever</strong>',
  ],
  concierge: [
    '<strong>Dedicated 7/7 experienced personnel</strong>',
    '<strong>Dedicated 7/7 closing coordinator</strong>',
    '<strong>Syndication to 100+ top real estate sites</strong>',
    '<strong>Negotiation, offer reviews, and paperwork support</strong>',
    '<strong>Open house and visit schedule</strong>',
    '<strong>Home valuation guidance and pricing strategy</strong>',
    '<strong>Dedicated Closing coordinator</strong>',
    '<strong>Complete Comparative Market Analysis (CMA)</strong>',
    '<strong>Professional HDR pictures</strong>',
    '<strong>Immersive 3D home tour (where available)</strong>',
    '<strong>Drone photography (where available)</strong>',
  ],
};

// ── Compare Table Rows ───────────────────────────────────────
export const compareRows = [
  ['MLS listing', '✓', '✓', '✓'],
  ['Syndication to 100+ sites', '✓', '✓', '✓'],
  ['Maximum MLS photos', '✓', '✓', '✓'],
  ['Online offers & messaging', '✓', '✓', '✓'],
  ['Unlimited updates & changes', '✓', '✓', '✓'],
  ['Open house scheduler', '✓', '✓', '✓'],
  ['ShowingTime℠', '✓', '✓', '✓'],
  ['All legal forms & disclosures', '✓', '✓', '✓'],
  ['24-month listing', '✓', '✓', '✓'],
  ['Cancel anytime for free', '✓', '✓', '✓'],
  ['$0 due at closing', '✓', '✓', '✓'],
  ['Support (6 days/week)', '✓', '✓', '✓'],
  ['25 HDR professional photos', '—', '✓', '✓'],
  ['Key lock box', '—', '✓', '✓'],
  ['Yard sign + open house kit', '—', '✓', '✓'],
  ['Flyers & brochure', '—', '✓', '✓'],
  ['Virtual tour video', '—', '✓', '✓'],
  ['Social media ad materials', '—', '✓', '✓'],
  ['beycome Spotlight Listing', '—', '✓', '✓'],
  ['Dedicated 7/7 personnel', '—', '—', '✓'],
  ['Closing coordinator', '—', '—', '✓'],
  ['Negotiation & offer review', '—', '—', '✓'],
  ['Pricing strategy & CMA', '—', '—', '✓'],
  ['3D home tour', '—', '—', '✓'],
  ['Drone photography', '—', '—', '✓'],
  ['Title/Escrow', 'Add-on $99', 'Add-on $99', '✓ Included'],
];

// ── Product Helpers ──────────────────────────────────────────
export function getAvailableAlacarte(packageId) {
  return products.alacarte.filter((a) => !a.hideFor.includes(packageId));
}

export function getTotal(packageId, selectedAlacarteIds = []) {
  const pkg = products.packages.find((p) => p.id === packageId);
  if (!pkg) return 0;
  const extras = products.alacarte
    .filter((a) => selectedAlacarteIds.includes(a.id))
    .filter((a) => !a.hideFor.includes(packageId));
  return pkg.price + extras.reduce((sum, a) => sum + a.price, 0);
}

export function hasPhysicalItems(packageId, selectedAlacarteIds = []) {
  const isPhysicalPkg = packageId === 'enhanced' || packageId === 'concierge';
  const hasPhysicalAlc = products.alacarte.some(
    (a) => a.physical && selectedAlacarteIds.includes(a.id) && !a.hideFor.includes(packageId)
  );
  return isPhysicalPkg || hasPhysicalAlc;
}

export function getSelectedAlcIds() {
  const labels = document.querySelectorAll('#aLaCarteOptions > label');
  const ids = [];
  labels.forEach((l, i) => {
    if (products.alacarte[i] && l.style.display !== 'none' && l.querySelector('input[type="checkbox"]')?.checked)
      ids.push(products.alacarte[i].id);
  });
  return ids;
}

// ── Format Helpers ───────────────────────────────────────────
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function formatHour(h) {
  if (h === 0) return '12 AM';
  if (h === 12) return '12 PM';
  return h > 12 ? h - 12 + ' PM' : h + ' AM';
}

export function formatTime(d) {
  let h = d.getHours();
  const m = d.getMinutes();
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ap;
}

export function formatDate(d) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

export function formatPhoneNumber(input) {
  let val = input.value.replace(/\D/g, '');
  if (val.length > 10) val = val.substring(0, 10);
  let formatted = '';
  if (val.length > 0) formatted = '(' + val.substring(0, 3);
  if (val.length >= 3) formatted += ') ';
  if (val.length > 3) formatted += val.substring(3, 6);
  if (val.length >= 6) formatted += '-' + val.substring(6, 10);
  input.value = formatted;
  return validatePhone(input);
}

export function formatDecimalInput(el) {
  let v = el.value.replace(/[^0-9.]/g, '');
  const parts = v.split('.');
  if (parts.length > 2) v = parts[0] + '.' + parts.slice(1).join('');
  const dp = v.indexOf('.');
  let whole = dp >= 0 ? v.substring(0, dp) : v;
  const dec = dp >= 0 ? v.substring(dp) : '';
  whole = whole.replace(/^0+(?=\d)/, '');
  whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  el.value = whole + dec;
}

// ── Validation ───────────────────────────────────────────────
export function validatePhone(input) {
  const errId = input.id + 'Error';
  const errEl = document.getElementById(errId);
  if (!errEl) return true;
  const val = input.value.replace(/\D/g, '');
  errEl.textContent = '';
  input.style.borderColor = '';

  if (val.length === 0) return true;
  if (val.length < 10) {
    errEl.textContent = 'Phone number must be 10 digits';
    input.style.borderColor = 'var(--c-error)';
    return false;
  }
  if (/^(\d)\1{9}$/.test(val)) {
    errEl.textContent = 'Invalid phone number';
    input.style.borderColor = 'var(--c-error)';
    return false;
  }
  if (/^(0000000000|1234567890|0123456789)$/.test(val)) {
    errEl.textContent = 'Invalid phone number';
    input.style.borderColor = 'var(--c-error)';
    return false;
  }
  const areaCode = val.substring(0, 3);
  if (areaCode === '000' || areaCode === '111' || areaCode === '555') {
    errEl.textContent = 'Invalid area code';
    input.style.borderColor = 'var(--c-error)';
    return false;
  }
  input.style.borderColor = 'var(--c-success)';
  return true;
}

// ── DOM Helpers ──────────────────────────────────────────────
export function $(id) {
  return document.getElementById(id);
}

export function $$(selector) {
  return document.querySelectorAll(selector);
}

export function show(el) {
  if (typeof el === 'string') el = $(el);
  if (el) el.style.display = '';
}

export function hide(el) {
  if (typeof el === 'string') el = $(el);
  if (el) el.style.display = 'none';
}

export function toggle(el, visible) {
  if (typeof el === 'string') el = $(el);
  if (el) el.style.display = visible ? '' : 'none';
}

export function addClass(el, cls) {
  if (typeof el === 'string') el = $(el);
  if (el) el.classList.add(cls);
}

export function removeClass(el, cls) {
  if (typeof el === 'string') el = $(el);
  if (el) el.classList.remove(cls);
}

export function toggleClass(el, cls, force) {
  if (typeof el === 'string') el = $(el);
  if (el) el.classList.toggle(cls, force);
}

export function setText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}

export function setHTML(id, html) {
  const el = $(id);
  if (el) el.innerHTML = html;
}

// ── Greeting ─────────────────────────────────────────────────
export function getGreeting(name = 'John Doe') {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  const icon = h < 12 ? '☀️' : h < 17 ? '🌤️' : '🌙';
  return `<span style="font-size:20px;line-height:1;">${icon}</span> ${g}, ${name}`;
}

// ── Dropdown / Menu Management ───────────────────────────────
export function closeAllDropdowns() {
  $$('.menu, .dashboard-menu, .notifications-menu').forEach((m) => m.classList.remove('show'));
  document.body.style.overflow = '';
}

export function toggleMenu(menuId, e) {
  e.stopPropagation();
  e.preventDefault();
  const m = $(menuId);
  const isOpen = m.classList.contains('show');
  closeAllDropdowns();
  if (!isOpen) {
    m.classList.add('show');
    if (window.innerWidth <= 1024) document.body.style.overflow = 'hidden';
  }
  return !isOpen; // returns true if menu was opened
}

// ── Modal Helpers ────────────────────────────────────────────
export function openModal(id) {
  const el = $(id);
  if (el) el.classList.add('show');
}

export function closeModal(id) {
  const el = $(id);
  if (el) el.classList.remove('show');
}

export function showSuccessModal(title, message, icon = '👍') {
  setText('successIcon', icon);
  setText('successTitle', title);
  const msgEl = $('successMessage');
  if (msgEl) msgEl.innerHTML = message;
  openModal('successModal');
}

// ── Toast Notification ───────────────────────────────────────
export function showToast(msg, duration = 2000) {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed; bottom:100px; left:50%; transform:translateX(-50%);
    background:var(--c-primary); color:white; padding:12px 24px;
    border-radius:24px; font-size:14px; font-weight:500; z-index:9999;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transition = 'opacity 0.3s';
    setTimeout(() => t.remove(), 300);
  }, duration);
}

// ── Responsive Check ─────────────────────────────────────────
export function isDesktop() {
  return window.innerWidth > 1024;
}

export function isMobile() {
  return window.innerWidth <= 768;
}

// ── Number Animation ─────────────────────────────────────────
const animFrames = {};

export function animateNumber(elId, target, duration = 400) {
  if (animFrames[elId]) cancelAnimationFrame(animFrames[elId]);
  const el = $(elId);
  if (!el) return;
  const current = parseInt(el.textContent.replace(/,/g, '')) || 0;
  if (current === target) {
    el.textContent = target.toLocaleString('en-US');
    return;
  }
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3); // ease-out cubic
    const val = Math.round(current + (target - current) * ease);
    el.textContent = val.toLocaleString('en-US');
    if (p < 1) animFrames[elId] = requestAnimationFrame(tick);
    else delete animFrames[elId];
  }
  animFrames[elId] = requestAnimationFrame(tick);
}

// ── Counter Animation (for stats) ────────────────────────────
export function animateCounters(selector = '.submit-stat-number[data-target]') {
  $$(selector).forEach((el) => {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const fmt = el.dataset.format;
    const duration = 1800;
    const startTime = performance.now();
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = eased * target;

      if (fmt === 'number') {
        el.textContent = Math.round(current).toLocaleString('en-US');
      } else if (fmt === 'countdown') {
        const startVal = parseFloat(el.dataset.start) || 999;
        const val = Math.round(startVal - eased * (startVal - target));
        el.textContent = prefix + val + suffix;
      } else {
        el.textContent = prefix + Math.round(current) + suffix;
      }
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// ── Stepper Controls ─────────────────────────────────────────
export function stepValue(id, delta) {
  const el = $(id);
  let v = parseInt(el.textContent) || 0;
  v = Math.max(0, Math.min(20, v + delta));
  el.textContent = v;
  updateStepperBtns(id);
}

export function clampStepper(id) {
  const el = $(id);
  let v = parseInt(el.textContent.replace(/\D/g, '')) || 0;
  v = Math.max(0, Math.min(20, v));
  el.textContent = v;
  updateStepperBtns(id);
}

export function updateStepperBtns(id) {
  const el = $(id);
  const v = parseInt(el.textContent) || 0;
  const mi = $(id + '_minus');
  const pl = $(id + '_plus');
  if (mi) mi.classList.toggle('disabled', v <= 0);
  if (pl) pl.classList.toggle('disabled', v >= 20);
}

export function stepperKeydown(e, id) {
  if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); }
  if (!/[\d]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
    e.preventDefault();
  }
}

// ── Info Bubble ──────────────────────────────────────────────
export function toggleInfoBubble(el) {
  event.stopPropagation();
  $$('.info-bubble').forEach((b) => { if (b !== el) b.classList.remove('active'); });
  el.classList.toggle('active');
}

// ── Document Renderer ────────────────────────────────────────
export function renderDocumentsHtml(docs) {
  if (!docs || docs.length === 0) return '';
  let h = '<div class="message-documents">';
  docs.forEach((d) => {
    const iconType = d.type === 'pdf' ? 'pdf' : d.type === 'doc' || d.type === 'docx' ? 'doc' : 'img';
    const iconText = d.type === 'pdf' ? 'PDF' : d.type === 'doc' || d.type === 'docx' ? 'DOC' : 'IMG';
    h += `<div class="document-attachment" onclick="viewDocument('${encodeURIComponent(d.name)}')">
      <div class="document-icon ${iconType}">${iconText}</div>
      <div class="document-info">
        <div class="document-name">${d.name}</div>
        <div class="document-size">${d.size}</div>
      </div>
    </div>`;
  });
  return h + '</div>';
}

// ── Debounce & Throttle ──────────────────────────────────────
export function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function throttle(fn, limit = 200) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ── Event Delegation Helper ──────────────────────────────────
export function delegate(parent, selector, event, handler) {
  const el = typeof parent === 'string' ? $(parent) : parent;
  if (!el) return;
  el.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target && el.contains(target)) handler.call(target, e, target);
  });
}

// ── Local Date Utils ─────────────────────────────────────────
export function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

export function isToday(d) {
  return isSameDay(d, new Date());
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

// ── URL / Router Helpers ─────────────────────────────────────
export const routeMap = {
  '/your-listing': 'properties',
  '/offers': 'offers',
  '/requested-show': 'visits',
  '/your-messages': 'messages',
  '/calendar': 'calendar',
  '/contract': 'contracts',
  '/profile': 'account',
  '/submit-property': 'addProperty',
};

export const pageToRoute = {};
Object.entries(routeMap).forEach(([k, v]) => (pageToRoute[v] = k));

export function getPageFromHash() {
  const hash = window.location.hash.slice(1);
  return routeMap[hash] || null;
}

export function navigateTo(route) {
  window.location.hash = route;
}

// ── US States List ───────────────────────────────────────────
export const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado',
  'Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho',
  'Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana',
  'Maine','Maryland','Massachusetts','Michigan','Minnesota',
  'Mississippi','Missouri','Montana','Nebraska','Nevada',
  'New Hampshire','New Jersey','New Mexico','New York',
  'North Carolina','North Dakota','Ohio','Oklahoma','Oregon',
  'Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington',
  'West Virginia','Wisconsin','Wyoming',
];
