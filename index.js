// ============================================================
// index.js — Beycome Dashboard Main Entry Point
// ============================================================

import {
  products, pkgIncludes, compareRows, US_STATES,
  routeMap, pageToRoute, getPageFromHash, navigateTo,
  getTotal, hasPhysicalItems, getSelectedAlcIds, getAvailableAlacarte,
  formatFileSize, formatHour, formatTime, formatDate,
  formatPhoneNumber, formatDecimalInput, validatePhone,
  $, $$, show, hide, toggle, addClass, removeClass, toggleClass,
  setText, setHTML,
  getGreeting, closeAllDropdowns, toggleMenu,
  openModal, closeModal, showSuccessModal, showToast,
  isDesktop, isMobile,
  animateNumber, animateCounters,
  stepValue, clampStepper, updateStepperBtns, stepperKeydown,
  toggleInfoBubble, renderDocumentsHtml,
  delegate, debounce, isSameDay,
} from './utils.js';

// ============================================================
// 1. APPLICATION STATE
// ============================================================
const state = {
  // Messages
  messages: {
    inbox: [
      { id: 1, sender: 'John Smith', email: 'john.smith@email.com', phone: '(305) 555-1234', subject: 'Question about 1505 N Jean Baptiste Pointe du Sable Lake Shore Dr', time: '2 hours ago', status: 'new', unread: true, thread: [{ type: 'incoming', text: "Hi, I'm very interested in your property at 1505 N Jean Baptiste Pointe du Sable Lake Shore Dr. Is the price negotiable?", sender: 'John Smith', time: '2 hours ago', documents: [] }] },
      { id: 2, sender: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '(305) 555-5678', subject: 'Visit confirmation for 456 Ocean Drive', time: 'Yesterday', status: 'read', unread: false, thread: [{ type: 'incoming', text: "Hi! I'd like to schedule a visit.", sender: 'Sarah Johnson', time: '3 days ago', documents: [] }, { type: 'outgoing', text: 'Hi Sarah! Yes, Thursday at 2:30 PM works perfectly.', sender: 'You', time: '2 days ago', documents: [] }, { type: 'incoming', text: 'Thank you for accepting my visit request!', sender: 'Sarah Johnson', time: 'Yesterday', documents: [] }] },
      { id: 3, sender: 'Michael Chen', email: 'michael.chen@email.com', phone: '(305) 555-9012', subject: 'Offer inquiry', time: '2 days ago', status: 'new', unread: true, thread: [{ type: 'incoming', text: "Hello, I saw your listing and I'm interested in making an offer.", sender: 'Michael Chen', time: '2 days ago', documents: [] }] },
      { id: 4, sender: 'Emily Davis', email: 'emily.davis@email.com', phone: '(305) 555-3456', subject: 'Property documents received', time: '3 days ago', status: 'replied', unread: false, thread: [{ type: 'incoming', text: 'Could you send me the property disclosure documents?', sender: 'Emily Davis', time: '4 days ago', documents: [] }, { type: 'outgoing', text: "Of course! I've attached the documents.", sender: 'You', time: '3 days ago', documents: [{ name: 'Property_Disclosure.pdf', size: '245 KB', type: 'pdf' }] }, { type: 'incoming', text: 'Thanks for sending the documents.', sender: 'Emily Davis', time: '3 days ago', documents: [] }] },
    ],
    sent: [],
  },

  // Notifications
  notifications: [
    { id: 1, type: 'offer', icon: '💰', title: '<strong>John Smith</strong> submitted an offer on <strong>123 Main Street</strong>', time: '2 hours ago', unread: true, link: 'offers' },
    { id: 2, type: 'visit', icon: '📅', title: '<strong>Sarah Johnson</strong> requested a visit', time: '5 hours ago', unread: true, link: 'visits' },
    { id: 3, type: 'message', icon: '💬', title: '<strong>Michael Chen</strong> sent you a message', time: '2 days ago', unread: true, link: 'messages' },
    { id: 4, type: 'visit', icon: '✅', title: 'Visit confirmed for <strong>789 Palm Avenue</strong>', time: '3 days ago', unread: true, link: 'visits' },
  ],

  // Calendar
  calendarEvents: [
    { id: 1, type: 'visit', status: 'confirmed', title: '789 Palm Avenue, Coral Gables, FL', shortTitle: '789 Palm Avenue', date: new Date(2026, 1, 2, 11, 0), person: 'David Miller', phone: '(305) 555-9012', email: 'david.miller@email.com', property: '789 Palm Avenue' },
    { id: 2, type: 'visit', status: 'pending', title: '1505 N Jean Baptiste Pointe du Sable Lake Shore Dr, Bonadelle Ranchos-Madera Ranchos, CA 33135', shortTitle: '1505 N Jean Baptiste...', date: new Date(2026, 0, 28, 10, 0), person: 'John Smith', phone: '(305) 555-1234', email: 'john.smith@email.com', property: '1505 N Jean Baptiste Pointe du Sable Lake Shore Dr' },
  ],

  // Properties
  properties: [
    { id: 'all', name: 'All Properties' },
    { id: '456 Ocean Drive', name: '456 Ocean Drive, Miami Beach, FL' },
  ],

  // Counters & Tracking
  pendingVisitsCount: 2,
  pendingOffersCount: 1,
  selectedMessageId: null,
  currentVisitCard: null,
  currentCancelCardId: '',
  currentMobileMessageId: null,
  currentMessageFilter: 'all',
  currentCalendarDate: new Date(2026, 1, 1),
  currentCalendarView: 'month',
  selectedEventData: null,
  visitedPages: {},

  // Property Filters per page
  selectedProperties: ['all'],
  selectedPropertiesOffers: ['all'],
  selectedPropertiesVisits: ['all'],
  selectedPropertiesMessages: ['all'],
  selectedPropertiesProperties: ['all'],

  // Chat compose state
  isComposingMessage: false,
  composingMessageTo: '',
  isReplyingToMessage: false,
  replyingToMessageId: null,

  // File attachments
  mobilePendingFiles: [],
  chatPendingFiles: [],
  signingDocs: [],

  // Google Maps
  propertyMap: null,
  propertyMarker: null,
  geocoder: null,
};

// ============================================================
// 2. NOTIFICATIONS
// ============================================================
function renderNotifications() {
  setHTML('notificationsList', state.notifications.map((n) =>
    `<div class="notification-item ${n.unread ? 'unread' : ''}" data-notif-id="${n.id}" data-notif-link="${n.link}">
      <div class="notification-icon ${n.type}">${n.icon}</div>
      <div class="notification-content">
        <div class="notification-title">${n.title}</div>
        <div class="notification-meta">${n.unread ? '<span class="notification-dot"></span>' : ''}<span>${n.time}</span></div>
      </div>
    </div>`
  ).join(''));
}

function handleNotificationClick(id, link, e) {
  e.stopPropagation();
  const n = state.notifications.find((x) => x.id === id);
  if (n) n.unread = false;
  updateNotificationsBadge();
  closeAllDropdowns();
  showPage(link, e);
}

function markAllNotificationsRead(e) {
  e.stopPropagation();
  state.notifications.forEach((n) => (n.unread = false));
  updateNotificationsBadge();
  renderNotifications();
}

function updateNotificationsBadge() {
  const count = state.notifications.filter((n) => n.unread).length;
  const badge = $('notificationsBadge');
  const btn = document.querySelector('.notifications-btn');
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = 'flex';
    btn.classList.add('has-unread');
  } else {
    badge.style.display = 'none';
    btn.classList.remove('has-unread');
  }
}

// ============================================================
// 3. BADGE UPDATES
// ============================================================
function updateMobileBadges() {
  const vb = $('mobileVisitsBadge');
  if (vb) {
    if (state.pendingVisitsCount > 0) { vb.textContent = state.pendingVisitsCount; vb.style.display = 'flex'; }
    else vb.style.display = 'none';
  }
  const unread = state.messages.inbox.filter((m) => m.unread).length;
  const mb = $('mobileMessagesBadge');
  if (mb) {
    if (unread > 0) { mb.textContent = unread; mb.style.display = 'flex'; }
    else mb.style.display = 'none';
  }
}

function updateMessagesBadge() {
  const unread = state.messages.inbox.filter((m) => m.unread).length;
  const b = $('messagesBadge');
  if (unread > 0) { b.textContent = unread; b.style.display = 'flex'; }
  else b.style.display = 'none';
  updateMobileBadges();
}

function updateVisitBadge() {
  state.pendingVisitsCount--;
  const b = $('visitsBadge');
  if (state.pendingVisitsCount > 0) b.textContent = state.pendingVisitsCount;
  else b.style.display = 'none';
  updateMobileBadges();
}

function updateMessageFilterCount() {
  const all = state.messages.inbox.length;
  const unread = state.messages.inbox.filter((m) => m.unread).length;
  const read = all - unread;
  const sent = state.messages.sent.length;
  let count = all;
  if (state.currentMessageFilter === 'unread') count = unread;
  else if (state.currentMessageFilter === 'read') count = read;
  else if (state.currentMessageFilter === 'sent') count = sent;
  setText('messageFilterCount', count);
  const sentEl = $('sentFilterCount');
  if (sentEl) sentEl.textContent = sent;
}

// ============================================================
// 4. CHAT WIDGET (Artur)
// ============================================================
function addChatMessage(msg, isUser = false) {
  const cm = $('chatMessages');
  const d = document.createElement('div');
  d.className = 'chat-message ' + (isUser ? 'user' : 'bot');
  d.innerHTML = `<div><div class="message-bubble">${msg}</div></div>`;
  cm.appendChild(d);
  cm.scrollTop = cm.scrollHeight;
}

function sendChatMessage() {
  const i = $('chatInput');
  const msg = i.value.trim();
  if (!msg && state.chatPendingFiles.length === 0) return;
  addChatMessage(msg || `📎 Sent ${state.chatPendingFiles.length} attachment(s)`, true);
  i.value = '';
  if (state.isComposingMessage) handleComposedMessage(msg);
  else if (state.isReplyingToMessage && state.replyingToMessageId) handleReplyToMessage(msg);
  else {
    state.chatPendingFiles = [];
    setTimeout(() => addChatMessage("I can help with that! What would you like to do?"), 800);
  }
}

function handleReplyToMessage(text) {
  const m = state.messages.inbox.find((x) => x.id === state.replyingToMessageId);
  if (!m) return;
  m.thread.push({ type: 'outgoing', text: text || 'Sent attachment(s)', sender: 'You', time: 'Just now', documents: [...state.chatPendingFiles] });
  m.status = 'replied';
  state.chatPendingFiles = [];
  setTimeout(() => {
    addChatMessage(`✅ Your reply has been sent to <strong>${m.sender}</strong>!`);
    $('chatInput').placeholder = 'Ask Artur anything…';
    state.isReplyingToMessage = false;
    state.replyingToMessageId = null;
  }, 600);
  renderInboxMessages();
}

function handleComposedMessage(msg) {
  state.isComposingMessage = false;
  $('chatInput').placeholder = 'Ask Artur anything…';
  setTimeout(() => {
    const cm = $('chatMessages');
    const d = document.createElement('div');
    d.className = 'chat-message bot';
    d.innerHTML = `<div><div class="message-bubble">📝 Message to <strong>${state.composingMessageTo}</strong>:<br><br><em>"${msg}"</em><br><br>Ready to send?</div>
      <div style="display:flex;gap:8px;margin-top:12px;">
        <button class="btn" data-action="edit-msg">Edit</button>
        <button class="btn btn-success" data-action="send-msg" data-msg="${encodeURIComponent(msg)}">Send</button>
      </div></div>`;
    cm.appendChild(d);
    cm.scrollTop = cm.scrollHeight;
  }, 600);
}

function openMobileChat() {
  document.querySelector('.chat-widget').classList.add('mobile-open');
}

function closeMobileChat() {
  document.querySelector('.chat-widget').classList.remove('mobile-open');
}

function sendMobileNavChat() {
  const input = $('mobileNavChatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  showToast('Message sent to Artur!');
}

function askArturAbout(topic) {
  if (!isDesktop()) openMobileChat();
  let msg = '';
  if (topic === 'notifications') msg = '📱 <strong>About Notifications:</strong><br><br>• <strong>Email</strong> - Get updates about offers, visits, and messages<br>• <strong>SMS</strong> - Quick alerts for time-sensitive items<br>• <strong>Phone</strong> - Only for urgent matters (rarely used)<br>• <strong>Marketing</strong> - Tips and market updates (optional)<br><br>I recommend keeping Email and SMS on so you never miss an offer!';
  else if (topic === 'contracts') msg = '📋 <strong>About Contracts:</strong><br><br>These are official state-approved forms. Pick your state first, then choose the category:<br>• <strong>Sell</strong> - Purchase agreements<br>• <strong>Rent</strong> - Lease forms<br>• <strong>Disclosure</strong> - Required property disclosures<br>• <strong>Agreement</strong> - Listing and commission forms<br><br>Need help filling one out? Just ask!';
  addChatMessage(msg);
}

// ── Chat context messages per page ───────────────────────────
function showPageContextMessage(page, subTab) {
  if (!isDesktop()) return;
  const pk = page + (subTab ? '-' + subTab : '');
  if (state.visitedPages[pk]) return;
  state.visitedPages[pk] = true;
  let msg = '';
  if (page === 'visits') {
    msg = state.pendingVisitsCount > 0
      ? `👋 You have <strong>${state.pendingVisitsCount} visit request${state.pendingVisitsCount > 1 ? 's' : ''} waiting</strong>! Would you like me to help you respond to them?<div style="margin-top:12px;"><button class="btn btn-p" data-action="scroll-visits">Let's do it</button></div>`
      : '✨ All caught up on visits!';
  } else if (page === 'offers') {
    msg = state.pendingOffersCount > 0
      ? `💰 You have <strong>${state.pendingOffersCount} pending offer</strong> that expires soon! Want me to explain your options?<div style="margin-top:12px;"><button class="btn btn-p" data-action="show-options">Show me my options</button></div>`
      : '✨ No pending offers right now.';
  } else if (page === 'properties') msg = '🏠 Here are your listings. Need help adding a new property or updating an existing one? Just ask!';
  else if (page === 'messages') {
    const unread = state.messages.inbox.filter((m) => m.unread).length;
    msg = unread > 0 ? `💬 You have <strong>${unread} unread message${unread > 1 ? 's' : ''}</strong>! I can help you draft quick responses. Just click on a message.` : '✨ All messages read!';
  } else if (page === 'calendar') msg = '📅 Your calendar shows all visits, deadlines, and milestones. Want me to add an important date?';
  else if (page === 'contracts') msg = "📋 Here you'll find all the legal forms you need for your state. Not sure which one? Just ask me!";
  else if (page === 'account') msg = '⚙️ Manage your profile and preferences here. Need help with anything?';
  if (msg) setTimeout(() => addChatMessage(msg), 500);
}

// ============================================================
// 5. MESSAGE MODAL / CONTACT
// ============================================================
function showMessageModal(name, address, email, phone, title) {
  if (isDesktop()) {
    addChatMessage('Contact ' + name, true);
    setTimeout(() => {
      let ci = `📋 <strong>${name}</strong><br>`;
      if (phone) ci += `📞 ${phone}<br>`;
      if (email) ci += `✉️ ${email}`;
      const cm = $('chatMessages');
      const d = document.createElement('div');
      d.className = 'chat-message bot';
      d.innerHTML = `<div><div class="message-bubble">${ci}<br><br>Would you like to send a message?</div>
        <div style="display:flex;gap:8px;margin-top:12px;">
          <button class="btn" data-action="close-msg-chat">Cancel</button>
          <button class="btn btn-success" data-action="open-msg-from-chat" data-name="${name}" data-address="${address}" data-email="${email}" data-phone="${phone}" data-title="${title}">Send a Message</button>
        </div></div>`;
      cm.appendChild(d);
      cm.scrollTop = cm.scrollHeight;
    }, 600);
  } else {
    setText('messageModalTitle', title || 'Message to');
    setText('messageModalAddress', address);
    setText('messageModalName', name);
    setText('messageModalPhone', phone || '');
    $('messageModalPhoneRow').href = phone ? 'tel:' + phone : '#';
    $('messageModalPhoneRow').style.display = phone ? 'flex' : 'none';
    setText('messageModalEmail', email || '');
    $('messageModalEmailRow').href = email ? 'mailto:' + email : '#';
    $('messageModalEmailRow').style.display = email ? 'flex' : 'none';
    $('messageModalDivider').style.display = phone && email ? 'inline' : 'none';
    $('messageText').value = '';
    openModal('messageModal');
  }
}

function sendContactMessage() {
  const msg = $('messageText').value.trim();
  const name = $('messageModalName').textContent;
  closeModal('messageModal');
  if (isDesktop()) {
    addChatMessage('Send message to ' + name, true);
    setTimeout(() => addChatMessage('✉️ Your message has been <strong>sent</strong>!'), 600);
  } else showSuccessModal('Message Sent!', 'Your message has been delivered.');
  if (msg) addSentMessageToData(name, msg);
}

function addSentMessageToData(to, msg) {
  const now = new Date();
  const ts = now.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
  state.messages.sent.unshift({ id: Date.now(), to, subject: 'Message to ' + to, message: msg, time: ts });
  updateMessageFilterCount();
}

// ============================================================
// 6. INBOX / MESSAGES
// ============================================================
function renderInboxMessages() {
  const sel = state.selectedPropertiesMessages;

  if (state.currentMessageFilter === 'sent') {
    setHTML('inboxList', state.messages.sent.length > 0
      ? state.messages.sent.map((m) => `<div class="visit-card"><div class="visit-card-content"><div class="visit-info"><h3>${m.subject}</h3><p class="msg-preview">${m.message ? m.message.substring(0, 80) + (m.message.length > 80 ? '...' : '') : ''}</p><div class="visit-meta-row"><span><strong>${m.time}</strong></span><span>to <strong>${m.to}</strong></span></div></div></div></div>`).join('')
      : '<p class="empty-state">No messages have been sent yet.</p>');
    return;
  }

  const filtered = state.messages.inbox
    .filter((m) => { if (sel.includes('all')) return true; return sel.some((p) => m.subject.includes(p)); })
    .filter((m) => {
      if (state.currentMessageFilter === 'all') return true;
      if (state.currentMessageFilter === 'unread') return m.unread;
      if (state.currentMessageFilter === 'read') return !m.unread;
      return true;
    })
    .sort((a, b) => (b.unread ? 1 : 0) - (a.unread ? 1 : 0));

  setHTML('inboxList', filtered.map((m) => {
    const preview = m.thread.length > 0 ? m.thread[m.thread.length - 1].text.substring(0, 80) + (m.thread[m.thread.length - 1].text.length > 80 ? '...' : '') : '';
    return `<div class="visit-card ${m.unread ? 'unread' : ''}" data-msg-id="${m.id}">
      <div class="visit-card-content"><div class="visit-info">
        <h3>${m.subject}${m.unread ? ' <span class="status-badge new">Unread</span>' : ''}</h3>
        <p class="msg-preview">${preview}</p>
        <div class="visit-meta-row"><span><strong>${m.time}</strong></span><span>from <strong>${m.sender}</strong></span>
          <button class="contact-icon-btn" data-action="contact" data-name="${m.sender}" data-email="${m.email}" data-phone="${m.phone}" data-subject="${m.subject}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
        </div></div>
        <div class="visit-actions"><button class="btn" data-action="view-msg" data-id="${m.id}">View Message</button></div>
      </div></div>`;
  }).join('') || '<p class="empty-state">No messages found.</p>');
}

function selectInboxMessage(id) {
  state.selectedMessageId = id;
  const m = state.messages.inbox.find((x) => x.id === id);
  if (!m) return;
  if (m.unread) { m.unread = false; m.status = 'read'; updateMessagesBadge(); }
  renderInboxMessages();

  if (!isDesktop()) { openMobileMessageView(m); return; }

  const cm = $('chatMessages');
  let ch = `<div class="chat-message bot"><div><div class="message-bubble">📬 <strong>${m.subject}</strong><div style="margin-top:8px;font-size:13px;color:var(--c-text-secondary);"><div>${m.sender}</div>${m.phone ? '<div>' + m.phone + '</div>' : ''}${m.email ? '<div>' + m.email + '</div>' : ''}</div></div></div></div>`;
  m.thread.forEach((t) => {
    const docs = renderDocumentsHtml(t.documents);
    if (t.type === 'incoming') ch += `<div class="chat-message bot"><div><div class="message-bubble" style="background:var(--c-bg-light);border-radius:14px;"><strong>${t.sender}</strong><br>${t.text}${docs}</div></div></div>`;
    else ch += `<div class="chat-message user"><div><div class="message-bubble">${t.text}${docs}</div></div></div>`;
  });
  ch += `<div class="chat-message bot"><div><div class="message-bubble">Would you like to respond?</div><div style="display:flex;gap:8px;margin-top:12px;"><button class="btn btn-p" data-action="start-reply" data-id="${m.id}">Reply</button></div></div></div>`;
  cm.innerHTML = ch;
  cm.scrollTop = cm.scrollHeight;
  $('chatInput').placeholder = 'Reply to ' + m.sender + '...';
  state.isReplyingToMessage = true;
  state.replyingToMessageId = id;
}

function startReplyInChat(id) {
  const m = state.messages.inbox.find((x) => x.id === id);
  if (!m) return;
  state.isReplyingToMessage = true;
  state.replyingToMessageId = id;
  $('chatInput').placeholder = 'Type your reply to ' + m.sender + '...';
  $('chatInput').focus();
  addChatMessage('✍️ Type your reply below and press Enter.');
}

function searchMessages() {
  const q = $('messageSearchInput').value.toLowerCase().trim();
  // Re-render with search applied (renderInboxMessages handles filter)
  renderInboxMessages();
}

function selectMessageFilter(filter, text, e) {
  e.stopPropagation();
  $$('#messageFilterMenu .menu-item').forEach((i) => i.classList.remove('active'));
  e.target.closest('.menu-item').classList.add('active');
  closeAllDropdowns();
  setText('messageFilterText', text);
  state.currentMessageFilter = filter;
  renderInboxMessages();
  updateMessageFilterCount();
}

// ── Mobile Message View ──────────────────────────────────────
function openMobileMessageView(m) {
  state.currentMobileMessageId = m.id;
  $('mobileMessageSubject').textContent = m.subject;
  setHTML('mobileMessageStatus', `<strong>${m.sender}</strong>${m.phone ? ` · <a href="tel:${m.phone}" style="color:var(--c-text-secondary);text-decoration:none;">${m.phone}</a>` : ''}${m.email ? ` · <a href="mailto:${m.email}" style="color:var(--c-text-secondary);text-decoration:none;">${m.email}</a>` : ''}`);
  let th = '';
  m.thread.forEach((t) => {
    const docs = renderDocumentsHtml(t.documents);
    if (t.type === 'incoming') th += `<div class="mobile-thread-message incoming"><div class="mobile-thread-bubble"><div class="mobile-thread-text">${t.text}</div>${docs}<div class="mobile-thread-time">${t.time}</div></div></div>`;
    else th += `<div class="mobile-thread-message outgoing"><div class="mobile-thread-bubble"><div class="mobile-thread-text">${t.text}</div>${docs}<div class="mobile-thread-time">${t.time}</div></div></div>`;
  });
  setHTML('mobileMessageThread', th);
  $('mobileMessageView').classList.add('show');
  $('mobileReplyInput').placeholder = 'Reply to ' + m.sender + '...';
}

function closeMobileMessageView() {
  $('mobileMessageView').classList.remove('show');
  state.currentMobileMessageId = null;
}

function sendMobileReply() {
  const i = $('mobileReplyInput');
  const t = i.value.trim();
  if (!t && state.mobilePendingFiles.length === 0) return;
  if (!state.currentMobileMessageId) return;
  const m = state.messages.inbox.find((x) => x.id === state.currentMobileMessageId);
  if (!m) return;
  m.thread.push({ type: 'outgoing', text: t || 'Sent attachment(s)', sender: 'You', time: 'Just now', documents: [...state.mobilePendingFiles] });
  m.status = 'replied';
  i.value = '';
  state.mobilePendingFiles = [];
  renderMobilePendingAttachments();
  openMobileMessageView(m);
  $('mobileMessageThread').scrollTop = $('mobileMessageThread').scrollHeight;
  renderInboxMessages();
  showToast('Reply sent!');
}

function showComposeModal() {
  $('composeTo').value = '';
  $('composeSubject').value = '';
  $('composeMessage').value = '';
  openModal('composeModal');
}

function sendNewMessage() {
  const to = $('composeTo').value.trim();
  const subj = $('composeSubject').value.trim();
  const msg = $('composeMessage').value.trim();
  if (!to || !msg) { alert('Please fill in recipient and message.'); return; }
  addSentMessageToData(to, msg);
  closeModal('composeModal');
  updateMessageFilterCount();
  if (isDesktop()) addChatMessage(`📤 Your message to <strong>${to}</strong> has been sent!`);
  else showSuccessModal('Message Sent!', 'Your message has been delivered.');
}

// ============================================================
// 7. VISITS (Showings)
// ============================================================
function acceptVisit(btn, buyerName, propertyAddress) {
  const card = btn.closest('.visit-card');
  if (isDesktop()) {
    addChatMessage('Accept visit', true);
    setTimeout(() => addChatMessage("📅 Well done! We'll automatically send a message to the lead and an email to you to confirm the visit. From that email, you'll also be able to add it to your personal calendar."), 600);
  } else showSuccessModal('Well done!', "📅 We'll automatically send a message to the lead and an email to you to confirm the visit. From that email, you'll also be able to add it to your personal calendar.");
  updateVisitCardStatus(card, 'accepted');
  updateVisitBadge();
}

function showDeclineVisitModal(btn, buyerName, propertyAddress) {
  state.currentVisitCard = btn.closest('.visit-card');
  if (isDesktop()) {
    addChatMessage('Decline visit', true);
    setTimeout(() => {
      const cm = $('chatMessages');
      const d = document.createElement('div');
      d.className = 'chat-message bot';
      d.innerHTML = `<div><div class="message-bubble">Just checking 😄 This will decline the visit and notify the buyer.</div>
        <div style="display:flex;gap:8px;margin-top:12px;">
          <button class="btn" data-action="cancel-decline">Keep it</button>
          <button class="btn btn-accent" data-action="reschedule-visit">Reschedule</button>
          <button class="btn btn-danger" data-action="confirm-decline">Decline it</button>
        </div></div>`;
      cm.appendChild(d);
      cm.scrollTop = cm.scrollHeight;
    }, 600);
  } else openModal('declineVisitModal');
}

function confirmDeclineVisit() {
  closeModal('declineVisitModal');
  if (isDesktop()) {
    addChatMessage('Decline it', true);
    setTimeout(() => addChatMessage("👍 Done! The visit has been declined.<br><br>📧 We'll automatically send a decline message to the lead. Keep pushing!"), 600);
  } else showSuccessModal('Done!', "The visit has been declined.<br><br>📧 We'll automatically send a decline message to the lead. Keep pushing!");
  updateVisitCardStatus(state.currentVisitCard, 'declined');
  updateVisitBadge();
}

function rescheduleVisit() {
  closeModal('declineVisitModal');
  if (isDesktop()) {
    addChatMessage('Reschedule', true);
    setTimeout(() => addChatMessage("📅 Done! Reschedule request sent.<br><br>📧 We'll automatically send a reschedule request to the lead and an email to you to confirm it."), 600);
  } else showSuccessModal('Reschedule Request Sent', "📧 We'll automatically send a reschedule request to the lead and an email to you to confirm it.");
  updateVisitCardStatus(state.currentVisitCard, 'rescheduling');
  updateVisitBadge();
}

function showCancelVisitModal(ownerName, propertyAddress, cardId) {
  state.currentCancelCardId = cardId;
  if (isDesktop()) {
    addChatMessage('Cancel visit', true);
    setTimeout(() => {
      const cm = $('chatMessages');
      const d = document.createElement('div');
      d.className = 'chat-message bot';
      d.innerHTML = `<div><div class="message-bubble">Hold on 👀 This will cancel the visit at <strong>${propertyAddress}</strong> and we'll notify <strong>${ownerName}</strong>.</div>
        <div style="display:flex;gap:8px;margin-top:12px;">
          <button class="btn" data-action="keep-visit">Keep it</button>
          <button class="btn btn-accent" data-action="reschedule-requested">Reschedule</button>
          <button class="btn btn-danger" data-action="confirm-cancel">Cancel it</button>
        </div></div>`;
      cm.appendChild(d);
      cm.scrollTop = cm.scrollHeight;
    }, 600);
  } else openModal('cancelVisitModal');
}

function confirmCancelVisit() {
  closeModal('cancelVisitModal');
  if (isDesktop()) {
    addChatMessage('Cancel Visit', true);
    setTimeout(() => addChatMessage("😔 We'll automatically send your cancellation request to the seller."), 600);
  } else showSuccessModal('Visit Cancelled', "We'll automatically send your cancellation request to the seller.", '😔');
  updateRequestedVisitStatus(state.currentCancelCardId, 'cancelled');
}

function updateVisitCardStatus(card, status) {
  if (!card) return;
  const badge = card.querySelector('.visit-meta-row .status-badge');
  const ad = card.querySelector('.visit-actions');
  if (status === 'declined') {
    if (badge) { badge.className = 'status-badge'; badge.style.background = 'var(--c-error-bg)'; badge.style.color = 'var(--c-error)'; badge.textContent = 'Declined'; }
    if (ad) ad.innerHTML = '';
  } else if (status === 'accepted') {
    if (badge) { badge.className = 'status-badge accepted'; badge.textContent = 'Accepted'; }
    const cid = card.id || 'visit-' + Date.now();
    card.id = cid;
    const bn = card.querySelector('.visit-meta-row strong:last-of-type')?.textContent || 'the buyer';
    const pn = card.querySelector('.address-main')?.textContent || 'the property';
    if (ad) ad.innerHTML = `<button class="btn" data-action="cancel-requested" data-owner="${bn}" data-property="${pn}" data-card-id="${cid}">Cancel</button>`;
  } else if (status === 'rescheduling') {
    if (badge) { badge.className = 'status-badge'; badge.style.background = '#fef9ed'; badge.style.color = 'var(--c-warning)'; badge.textContent = 'Rescheduling'; }
    if (ad) ad.innerHTML = '';
  }
}

function updateRequestedVisitStatus(cardId, status) {
  if (!cardId) return;
  const card = $(cardId);
  if (!card) return;
  const badge = card.querySelector('.visit-meta-row .status-badge');
  const ad = card.querySelector('.visit-actions');
  if (status === 'cancelled') {
    if (badge) { badge.className = 'status-badge'; badge.style.background = 'var(--c-error-bg)'; badge.style.color = 'var(--c-error)'; badge.textContent = 'Cancelled'; }
    if (ad) ad.innerHTML = '';
  }
}

// ============================================================
// 8. FILTERS (Offers, Visits, Properties per page)
// ============================================================
function selectOfferFilter(s, t, c, e) {
  e.stopPropagation();
  $$('#offerFilterMenu .menu-item').forEach((i) => i.classList.remove('active'));
  e.target.closest('.menu-item').classList.add('active');
  closeAllDropdowns();
  const rc = $$('#offersReceived .visit-card'), sc = $$('#offersSent .visit-card');
  let vc = 0;
  if (s === 'all') {
    show('offersReceived'); show('offersSent');
    rc.forEach((c) => { c.style.display = 'block'; vc++; });
    sc.forEach((c) => { c.style.display = 'block'; vc++; });
  } else if (s === 'received' || s === 'pending' || s === 'accepted') {
    show('offersReceived'); hide('offersSent');
    rc.forEach((c) => { c.style.display = 'block'; vc++; });
  } else if (s === 'sent') {
    hide('offersReceived'); show('offersSent');
    sc.forEach((c) => { c.style.display = 'block'; vc++; });
  }
  setText('offerFilterText', t);
  setText('offerFilterCount', vc);
}

function selectFilter(s, t, c, e) {
  e.stopPropagation();
  $$('#filterDropdownMenu .menu-item').forEach((i) => i.classList.remove('active'));
  e.target.closest('.menu-item').classList.add('active');
  closeAllDropdowns();
  const rc = $$('#visitsReceived .visit-card'), rq = $$('#visitsRequested .visit-card');
  let vc = 0;
  if (s === 'all') {
    show('visitsReceived'); show('visitsRequested');
    rc.forEach((c) => { c.style.display = 'block'; vc++; });
    rq.forEach((c) => { c.style.display = 'block'; vc++; });
  } else if (s === 'received') {
    show('visitsReceived'); hide('visitsRequested');
    rc.forEach((c) => { c.style.display = 'block'; vc++; });
  } else if (s === 'requested') {
    hide('visitsReceived'); show('visitsRequested');
    rq.forEach((c) => { c.style.display = 'block'; vc++; });
  }
  setText('filterDropdownText', t);
  setText('filterDropdownCount', vc);
}

// ── Property Filters ─────────────────────────────────────────
function renderPropertyFilter() {
  setHTML('propertyFilterMenu', state.properties.map((p) =>
    `<button class="menu-item ${state.selectedProperties.includes(p.id) ? 'active' : ''}" data-prop-id="${p.id}">${p.id === 'all' ? p.name : p.name.split(',')[0]}</button>`
  ).join(''));
}

function initPropertyFilters() {
  const hasMultiple = state.properties.length > 2;
  ['offers', 'visits', 'messages', 'calendar', 'properties'].forEach((page) => {
    const el = $(page + 'PropertyFilter');
    if (el) el.style.display = hasMultiple ? 'block' : 'none';
  });
}

// ============================================================
// 9. CALENDAR
// ============================================================
function renderCalendar() {
  const y = state.currentCalendarDate.getFullYear();
  const mo = state.currentCalendarDate.getMonth();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  setText('calendarTitle', months[mo] + ' ' + y);
  if (state.currentCalendarView === 'month') renderMonthView(y, mo);
  else renderWeekView(y, mo);
}

function getEventsForDate(d) {
  return state.calendarEvents.filter((e) =>
    isSameDay(e.date, d) && (state.selectedProperties.includes('all') || state.selectedProperties.includes(e.property))
  );
}

function getEventsForDateAndHour(d, hr) {
  return state.calendarEvents.filter((e) =>
    isSameDay(e.date, d) && e.date.getHours() === hr && (state.selectedProperties.includes('all') || state.selectedProperties.includes(e.property))
  );
}

function renderMonthView(y, mo) {
  const g = $('calendarGrid');
  const fd = new Date(y, mo, 1);
  const sd = new Date(fd); sd.setDate(sd.getDate() - fd.getDay());
  const td = new Date();
  let h = '';
  for (let i = 0; i < 42; i++) {
    const d = new Date(sd); d.setDate(sd.getDate() + i);
    const om = d.getMonth() !== mo;
    const it = d.toDateString() === td.toDateString();
    const de = getEventsForDate(d);
    let cl = 'calendar-day'; if (om) cl += ' other-month'; if (it) cl += ' today';
    h += `<div class="${cl}"><div class="calendar-day-number">${d.getDate()}</div><div class="calendar-events">`;
    de.slice(0, 2).forEach((e) => {
      h += `<div class="calendar-event ${e.type}${e.status === 'pending' ? ' pending' : ''}" data-event-id="${e.id}">${e.shortTitle}</div>`;
    });
    if (de.length > 2) h += `<div class="calendar-more">+${de.length - 2} more</div>`;
    h += '</div></div>';
    if (i >= 34 && d.getMonth() !== mo) break;
  }
  g.innerHTML = h;
}

function renderWeekView(y, mo) {
  const g = $('weekGrid');
  const sw = new Date(state.currentCalendarDate);
  sw.setDate(sw.getDate() - sw.getDay());
  const td = new Date();
  const dn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let h = '<div class="week-header"><div class="week-header-cell"></div>';
  for (let i = 0; i < 7; i++) {
    const d = new Date(sw); d.setDate(sw.getDate() + i);
    h += `<div class="week-header-cell${d.toDateString() === td.toDateString() ? ' today' : ''}"><div class="day-name">${dn[i]}</div><div class="day-number">${d.getDate()}</div></div>`;
  }
  h += '</div>';
  for (let hr = 8; hr <= 18; hr++) {
    h += `<div class="week-time-slot">${formatHour(hr)}</div>`;
    for (let day = 0; day < 7; day++) {
      const d = new Date(sw); d.setDate(sw.getDate() + day);
      const de = getEventsForDateAndHour(d, hr);
      h += '<div class="week-day-col"><div class="week-hour-row">';
      de.forEach((e) => {
        const et = e.date.getHours() + e.date.getMinutes() / 60;
        const top = (et - hr) * 60;
        h += `<div class="week-event ${e.type}${e.status === 'pending' ? ' pending' : ''}" style="top:${top}px;height:50px;" data-event-id="${e.id}"><div class="week-event-time">${formatTime(e.date)}</div><div class="week-event-title">${e.shortTitle}</div></div>`;
      });
      h += '</div></div>';
    }
  }
  g.innerHTML = h;
}

function switchCalendarView(v) {
  state.currentCalendarView = v;
  toggleClass('monthViewBtn', 'active', v === 'month');
  toggleClass('weekViewBtn', 'active', v === 'week');
  toggleClass('monthView', 'active', v === 'month');
  toggleClass('weekView', 'active', v === 'week');
  renderCalendar();
}

function showEventPopover(eid, el) {
  const e = state.calendarEvents.find((x) => x.id === eid);
  if (!e) return;
  state.selectedEventData = e;
  const sl = e.status === 'confirmed' ? 'Confirmed' : e.status === 'completed' ? 'Completed' : e.status === 'upcoming' ? 'Upcoming' : 'Pending';
  const sc = e.status === 'confirmed' || e.status === 'completed' ? 'confirmed' : 'pending';
  setText('eventPopoverBadge', sl);
  $('eventPopoverBadge').className = 'event-popover-badge ' + sc;
  setHTML('eventPopoverTitle', e.title);
  setText('eventPopoverDate', formatDate(e.date));
  setText('eventPopoverTime', formatTime(e.date));
  setHTML('eventPopoverPerson', e.person ? `<strong>${e.person}</strong>` : '<em>No contact</em>');
  const pop = $('eventPopover');
  const rect = el.getBoundingClientRect();
  let left = rect.left, top = rect.bottom + 8;
  if (left + 320 > window.innerWidth) left = window.innerWidth - 336;
  if (top + 280 > window.innerHeight) top = rect.top - 280;
  pop.style.left = Math.max(16, left) + 'px';
  pop.style.top = top + 'px';
  pop.style.display = 'block';
}

function closeEventPopover() {
  $('eventPopover').style.display = 'none';
  state.selectedEventData = null;
}

function openAddEventModal() {
  $('addEventType').value = 'visit';
  $('addEventTitle').value = '';
  $('addEventContact').value = '';
  $('addEventPhone').value = '';
  $('addEventEmail').value = '';
  const td = new Date();
  $('addEventDate').value = td.getFullYear() + '-' + String(td.getMonth() + 1).padStart(2, '0') + '-' + String(td.getDate()).padStart(2, '0');
  openModal('addEventModal');
}

function saveNewEvent() {
  const type = $('addEventType').value;
  const prop = $('addEventProperty').value;
  const title = $('addEventTitle').value.trim();
  const dateVal = $('addEventDate').value;
  const timeVal = $('addEventTime').value;
  const contact = $('addEventContact').value.trim();
  if (!title || !dateVal || !timeVal) { showToast('Please fill in title, date and time'); return; }
  const [y, m, d] = dateVal.split('-').map(Number);
  const [h, mi] = timeVal.split(':').map(Number);
  const ed = new Date(y, m - 1, d, h, mi);
  state.calendarEvents.push({ id: Date.now(), type: type === 'other' ? 'milestone' : type, status: 'upcoming', title: title + ' - ' + prop, shortTitle: title, date: ed, person: contact, phone: $('addEventPhone').value, email: $('addEventEmail').value, property: prop });
  closeModal('addEventModal');
  renderCalendar();
  showToast('✅ Event added to calendar');
  if (isDesktop()) addChatMessage(`✅ I've added <strong>${title}</strong> to your calendar for <strong>${formatDate(ed)}</strong>.`);
}

// ============================================================
// 10. SUBMIT PROPERTY
// ============================================================
function handleListProperty() {
  const addr = $('submitPropertyAddress').value.trim();
  if (!addr) { showToast('Please enter a property address'); return; }
  hide('submitStep1'); show('submitStep2');
  setText('step2PropertyAddress', addr);
  setText('legalHeaderAddress', addr);
  initPropertyMap(addr);
}

function selectPropertyType(btn) {
  $$('.submit-prop-type').forEach((b) => b.classList.remove('selected'));
  btn.classList.add('selected');
  const t = btn.textContent.trim();
  const label = t.replace(/^[^\w]+/, '').toLowerCase();
  setText('propertyTypeLabel', label);
  const isLand = t.includes('Lot/Land');
  const isAptCondo = t.includes('Apartment') || t.includes('Condo');
  const hasUnit = t.includes('Apartment') || t.includes('Condo') || t.includes('Townhouse');
  $('bedsRow').style.display = isLand ? 'none' : 'flex';
  $('fieldLivingArea').style.display = isLand ? 'none' : '';
  $('fieldLotSize').style.display = isAptCondo ? 'none' : '';
  $('fieldUnitNumber').style.display = hasUnit ? 'block' : 'none';
}

function selectPackageForm(el) {
  $$('#packageOptionsForm > label').forEach((l) => l.classList.remove('selected'));
  el.classList.add('selected');
  el.querySelector('input').checked = true;
  const pkg = el.querySelector('input').value;

  // Toggle à la carte visibility
  $$('#aLaCarteOptions > label').forEach((lbl, i) => {
    if (!products.alacarte[i]) return;
    const item = products.alacarte[i];
    if (item.hideFor.includes(pkg)) {
      lbl.style.display = 'none';
      const cb = lbl.querySelector('input[type="checkbox"]');
      if (cb) cb.checked = false;
    } else lbl.style.display = 'flex';
  });

  // Package includes
  const includes = pkgIncludes[pkg] || pkgIncludes.basic;
  const subtitle = pkg === 'enhanced' ? 'Everything on Basic +' : pkg === 'concierge' ? 'Everything on Enhanced +' : '';
  const html = includes.map((i) => `<div style="display:flex;align-items:flex-start;gap:8px;"><span style="color:var(--c-success);flex-shrink:0;">✓</span><span>${i}</span></div>`).join('');

  setText('packageIncludesSubtitle', subtitle);
  setText('packageIncludesSubtitleRight', subtitle);
  setHTML('packageIncludesList', html);
  show('packageIncludes');
  setHTML('packageIncludesListRight', html);
  show('packageIncludesRight');

  // Title settlement card
  const tsc = $('titleSettlementCard');
  if (tsc) tsc.style.display = pkg === 'concierge' ? 'block' : 'none';

  updateShippingVisibility();
  updateOrderTotal();
}

function calculateSavings() {
  const price = parseFloat(($('submitPrice').value || '0').replace(/,/g, '')) || 0;
  setText('savingsAmount', (price * 0.06).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
}

function updateOrderTotal() {
  const pkg = document.querySelector('input[name="packageForm"]:checked');
  const pkgVal = pkg ? pkg.value : 'basic';
  const ids = getSelectedAlcIds();
  const total = getTotal(pkgVal, ids);
  animateNumber('orderTotal', total);
  const price = parseFloat(($('submitPrice').value || '0').replace(/,/g, '')) || 0;
  const commission = Math.round(price * 0.06);
  const savings = Math.max(0, commission - total);
  animateNumber('commissionCost', commission);
  animateNumber('totalSavings', savings);
}

function updateShippingVisibility() {
  const pkg = document.querySelector('input[name="packageForm"]:checked');
  const pkgVal = pkg ? pkg.value : 'basic';
  const selectedIds = getSelectedAlcIds();
  const section = $('shippingAddressSection');
  if (hasPhysicalItems(pkgVal, selectedIds)) section.style.display = 'block';
  else {
    section.style.display = 'none';
    const cb = $('shippingAddressCheckbox');
    if (cb) cb.checked = false;
    const field = $('shippingAddressField');
    if (field) field.style.display = 'none';
  }
}

function submitPropertyForm() {
  $$('#submitStep2 .field-error').forEach((e) => e.remove());
  $$('#submitStep2 .input-error').forEach((e) => e.classList.remove('input-error'));
  const errors = [];
  const typeSelected = document.querySelector('.submit-prop-type.selected');
  if (!typeSelected) errors.push({ el: $('propertyTypeGrid') });

  const isLand = typeSelected && typeSelected.textContent.includes('Lot/Land');
  const hasUnit = typeSelected && (typeSelected.textContent.includes('Apartment') || typeSelected.textContent.includes('Condo') || typeSelected.textContent.includes('Townhouse'));
  const isAptCondo = typeSelected && (typeSelected.textContent.includes('Apartment') || typeSelected.textContent.includes('Condo'));

  if (hasUnit && !$('noUnitCheckbox').checked) {
    if (!$('submitUnitNumber').value.trim()) errors.push({ el: $('submitUnitNumber') });
  }
  if (!isLand) {
    if ((parseInt($('submitBeds').textContent) || 0) === 0) errors.push({ el: $('submitBeds').closest('.stepper-pill') });
    if ((parseInt($('submitBaths').textContent) || 0) === 0) errors.push({ el: $('submitBaths').closest('.stepper-pill') });
    if (!$('submitLivingArea').value.replace(/,/g, '').trim() || $('submitLivingArea').value === '0') errors.push({ el: $('submitLivingArea') });
  }
  if (!isAptCondo) {
    if (!$('submitLotSize').value.replace(/,/g, '').trim() || $('submitLotSize').value === '0') errors.push({ el: $('submitLotSize') });
  }
  if (!$('submitPrice').value.replace(/,/g, '').trim() || $('submitPrice').value === '0') errors.push({ el: $('submitPrice') });
  if (!$('submitDescription').value.trim()) errors.push({ el: $('submitDescription') });
  if (!$('submitOwnerName').value.trim()) errors.push({ el: $('submitOwnerName') });
  const ownerEmail = $('submitOwnerEmail').value.trim();
  if (!ownerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerEmail)) errors.push({ el: $('submitOwnerEmail') });
  if (($('submitOwnerPhone').value.replace(/\D/g, '')).length < 10) errors.push({ el: $('submitOwnerPhone') });

  if ($('secondaryOwnerCheckbox').checked) {
    if (!$('submitSecondaryName').value.trim()) errors.push({ el: $('submitSecondaryName') });
    const se = $('submitSecondaryEmail').value.trim();
    if (!se || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(se)) errors.push({ el: $('submitSecondaryEmail') });
  }
  if ($('signingAuthorityCheckbox').checked) {
    if (!$('signingCapacity').value) errors.push({ el: $('signingCapacity') });
    if (!$('signingEntityName').value.trim()) errors.push({ el: $('signingEntityName') });
    if (state.signingDocs.length === 0) { showToast('⚠️ Please upload at least one signing authority document'); errors.push({ el: $('signingDocInput').parentElement }); }
  }

  if (errors.length > 0) {
    errors.forEach((err) => {
      if (err.el.classList.contains('input') || err.el.tagName === 'INPUT' || err.el.tagName === 'TEXTAREA' || err.el.classList.contains('stepper-pill')) err.el.classList.add('input-error');
    });
    errors[0].el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  showToast('✅ Property submitted!');
  setTimeout(() => navigateTo('/your-listing'), 1500);
}

// ── Submit Property Helpers ──────────────────────────────────
function toggleSecondaryOwner() { $('secondaryOwnerFields').style.display = $('secondaryOwnerCheckbox').checked ? 'block' : 'none'; }
function toggleShippingAddress() { $('shippingAddressField').style.display = $('shippingAddressCheckbox').checked ? 'block' : 'none'; }
function toggleSigningAuthority() { $('signingAuthoritySection').style.display = $('signingAuthorityCheckbox').checked ? 'block' : 'none'; }
function toggleNoUnit() {
  const cb = $('noUnitCheckbox'), inp = $('submitUnitNumber'), mark = $('unitRequiredMark');
  if (cb.checked) { inp.value = ''; inp.disabled = true; inp.style.opacity = '0.4'; mark.style.display = 'none'; }
  else { inp.disabled = false; inp.style.opacity = '1'; mark.style.display = 'inline'; }
}

function handleSigningDocUpload(e) {
  const files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    if (files[i].size > 10 * 1024 * 1024) { showToast('⚠️ ' + files[i].name + ' exceeds 10MB limit'); continue; }
    state.signingDocs.push({ name: files[i].name, size: formatFileSize(files[i].size), type: files[i].name.split('.').pop().toLowerCase() });
  }
  e.target.value = '';
  renderSigningDocs();
}

function renderSigningDocs() {
  const c = $('signingDocList');
  if (state.signingDocs.length === 0) { c.innerHTML = ''; return; }
  c.innerHTML = state.signingDocs.map((f, i) => {
    const it = f.type === 'pdf' ? 'pdf' : (f.type === 'doc' || f.type === 'docx' ? 'doc' : 'img');
    const ix = f.type === 'pdf' ? 'PDF' : (f.type === 'doc' || f.type === 'docx' ? 'DOC' : 'IMG');
    return `<div class="sp-doc-item"><div class="document-icon ${it}" style="width:32px;height:32px;font-size:9px;">${ix}</div><div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:500;color:var(--c-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${f.name}</div><div style="font-size:11px;color:var(--c-text-secondary);">${f.size}</div></div><button data-action="remove-signing-doc" data-idx="${i}" style="width:28px;height:28px;border:none;background:transparent;cursor:pointer;color:var(--c-text-secondary);display:flex;align-items:center;justify-content:center;border-radius:50%;flex-shrink:0;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div>`;
  }).join('');
}

function selectBuyIntent(yes) {
  toggleClass('buyYesBtn', 'btn-p', yes);
  toggleClass('buyNoBtn', 'btn-p', !yes);
  $('buyPromo').style.display = yes ? 'block' : 'none';
}

function selectListingType(type) {
  toggleClass('saleTab', 'active', type === 'sale');
  toggleClass('rentTab2', 'active', type === 'rent');
}

function selectLotUnit(unit) {
  toggleClass('sqftTab', 'active', unit === 'sqft');
  toggleClass('acresTab', 'active', unit === 'acres');
}

function toggleALaCarte(el) {
  el.classList.toggle('checked', el.querySelector('input[type="checkbox"]').checked);
  updateShippingVisibility();
  updateOrderTotal();
}

function toggleALaCarteInfo(btn) {
  event.stopPropagation();
  const label = btn.closest('label');
  const info = label.querySelector('.alc-info');
  const isOpen = info.style.display !== 'none';
  info.style.display = isOpen ? 'none' : 'block';
  btn.classList.toggle('open', !isOpen);
}

function toggleTitleFromUpsell(el) {
  const titleLabel = $('alcTitleSettlement');
  if (!titleLabel || titleLabel.style.display === 'none') return;
  const cb = titleLabel.querySelector('input[type="checkbox"]');
  if (!cb) return;
  cb.checked = !cb.checked;
  toggleALaCarte(titleLabel);
  if (cb.checked) { el.textContent = '✓ Title/Escrow added'; el.style.color = 'var(--c-success-dark)'; el.style.fontWeight = '600'; }
  else { el.textContent = 'Add Title/Escrow · $99'; el.style.color = ''; el.style.fontWeight = ''; }
  titleLabel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ── Google Maps ──────────────────────────────────────────────
window.initMapCallback = function () { state.geocoder = new google.maps.Geocoder(); };

function initPropertyMap(addr) {
  if (!state.geocoder) { setTimeout(() => initPropertyMap(addr), 100); return; }
  state.geocoder.geocode({ address: addr }, function (results, status) {
    if (status === 'OK') {
      const loc = results[0].geometry.location;
      if (!state.propertyMap) {
        state.propertyMap = new google.maps.Map($('propertyMap'), { center: loc, zoom: 17, mapTypeControl: false, streetViewControl: false, fullscreenControl: false });
        state.propertyMarker = new google.maps.Marker({ position: loc, map: state.propertyMap, draggable: true, title: 'Drag to correct location' });
      } else {
        state.propertyMap.setCenter(loc);
        state.propertyMarker.setPosition(loc);
      }
    }
  });
}

// ============================================================
// 11. ACCOUNT / PROFILE
// ============================================================
function switchAccountTab(tab) {
  toggleClass('profileTab', 'active', tab === 'profile');
  toggleClass('invoicesTab', 'active', tab === 'invoices');
  toggleClass('notificationsTab', 'active', tab === 'notifications');
  toggle('accountProfile', tab === 'profile');
  toggle('accountInvoices', tab === 'invoices');
  toggle('accountNotifications', tab === 'notifications');
}

function saveProfile() {
  const primary = $('primaryPhone'), secondary = $('secondaryPhone');
  if (!validatePhone(primary) || (secondary.value.length > 0 && !validatePhone(secondary))) return;
  showSuccessModal('Profile Saved', 'Your changes have been saved successfully.');
  hide('phoneUpdateOption');
}

function saveNotifications() {
  showSuccessModal('Preferences Saved', 'Your notification preferences have been updated.');
}

function showPhoneUpdateOption() {
  $('phoneUpdateOption').style.display = $('primaryPhone').value !== '(305) 555-1234' ? 'block' : 'none';
}

// ============================================================
// 12. CONTRACTS
// ============================================================
function switchContractTab(tab) {
  toggleClass('sellTab', 'active', tab === 'sell');
  toggleClass('rentTab', 'active', tab === 'rent');
  toggleClass('disclosureTab', 'active', tab === 'disclosure');
  toggleClass('agreementTab', 'active', tab === 'agreement');
  toggle('contractsSell', tab === 'sell');
  toggle('contractsRent', tab === 'rent');
  toggle('contractsDisclosure', tab === 'disclosure');
  toggle('contractsAgreement', tab === 'agreement');
}

function selectState(stateName, e) {
  e.stopPropagation();
  $$('#stateFilterMenu .menu-item').forEach((i) => i.classList.remove('active'));
  e.target.classList.add('active');
  setText('stateFilterText', stateName);
  closeAllDropdowns();
}

// ============================================================
// 13. FILE ATTACHMENT HELPERS
// ============================================================
function triggerMobileFileUpload() { $('mobileFileInput').click(); }
function handleMobileFileSelect(e) {
  for (const f of e.target.files) state.mobilePendingFiles.push({ name: f.name, size: formatFileSize(f.size), type: f.name.split('.').pop().toLowerCase() });
  renderMobilePendingAttachments();
  e.target.value = '';
}
function renderMobilePendingAttachments() {
  const c = $('mobilePendingAttachments');
  if (state.mobilePendingFiles.length === 0) { c.style.display = 'none'; return; }
  c.style.display = 'flex';
  c.innerHTML = state.mobilePendingFiles.map((f, i) => `<div class="pending-attachment">${f.name}<button data-action="remove-mobile-file" data-idx="${i}">×</button></div>`).join('');
}

function triggerChatFileUpload() { $('chatFileInput').click(); }
function handleChatFileSelect(e) {
  for (const f of e.target.files) state.chatPendingFiles.push({ name: f.name, size: formatFileSize(f.size), type: f.name.split('.').pop().toLowerCase() });
  renderChatPendingAttachments();
  e.target.value = '';
}
function renderChatPendingAttachments() {
  const c = $('chatPendingAttachments');
  if (state.chatPendingFiles.length === 0) { c.style.display = 'none'; return; }
  c.style.display = 'flex';
  c.innerHTML = state.chatPendingFiles.map((f, i) => `<div class="pending-attachment">${f.name}<button data-action="remove-chat-file" data-idx="${i}">×</button></div>`).join('');
}

// ============================================================
// 14. PAGE ROUTING
// ============================================================
function showPage(page, e) {
  if (e) e.preventDefault();
  ['offersPage', 'propertiesPage', 'visitsPage', 'messagesPage', 'calendarPage', 'accountPage', 'contractsPage'].forEach((p) => hide(p));
  $$('.nav-link').forEach((l) => l.classList.remove('active'));
  show(page + 'Page');

  // Update nav active states
  const route = pageToRoute[page];
  if (route) {
    $$('.nav-link').forEach((l) => { if (l.getAttribute('href') === route) l.classList.add('active'); });
    window.location.hash = route;
  }
  updateMobileActiveNav(page);

  // Page-specific init
  if (page === 'calendar') { state.currentCalendarDate = new Date(2026, 1, 1); renderCalendar(); }
  if (page === 'messages') renderInboxMessages();

  // Hide submit property overlay
  hide('submitPropertyPage');
  document.body.style.overflow = '';

  showPageContextMessage(page);
}

function updateMobileActiveNav(page) {
  const map = { properties: 0, offers: 1, visits: 2, messages: 3 };
  $$('.mobile-bottom-nav-items > .mobile-bottom-nav-item, .mobile-bottom-nav-items > .mobile-more-wrapper .mobile-bottom-nav-item').forEach((i) => i.classList.remove('active'));
  const idx = map[page];
  if (idx !== undefined) {
    const items = $$('.mobile-bottom-nav-items > .mobile-bottom-nav-item');
    if (items[idx]) items[idx].classList.add('active');
  }
}

function handleHash() {
  const hash = window.location.hash.slice(1);
  const page = routeMap[hash];
  hide('submitPropertyPage');
  document.body.style.overflow = '';
  if (page === 'addProperty') {
    show('submitPropertyPage');
    document.body.style.overflow = 'hidden';
  } else if (page) {
    showPage(page);
  }
}

// ============================================================
// 15. COMPARE TABLE INIT
// ============================================================
function initCompareTable() {
  const tb = $('compareTableBody');
  compareRows.forEach((r) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td style="padding:10px 12px 10px 0;border-bottom:1px solid #f0f0f0;color:var(--c-primary);font-weight:500;">${r[0]}</td>` +
      [r[1], r[2], r[3]].map((v, i) => {
        const bg = i === 1 ? 'background:#f8f9ff;' : '';
        const color = v === '✓' ? 'color:var(--c-success);font-size:16px;font-weight:700;' : v === '—' ? 'color:#d0d0d0;font-size:16px;' : 'color:var(--c-primary);font-size:11px;font-weight:500;';
        return `<td style="text-align:center;padding:10px 8px;border-bottom:1px solid #f0f0f0;${bg}"><span style="${color}">${v}</span></td>`;
      }).join('');
    tb.appendChild(tr);
  });
}

// ============================================================
// 16. GLOBAL EVENT DELEGATION
// ============================================================
function initEventDelegation() {
  // Chat messages area — delegated actions
  delegate('chatMessages', '[data-action]', 'click', function (e) {
    const action = this.dataset.action;
    const parent = this.parentElement;

    if (action === 'close-msg-chat') { parent.style.display = 'none'; addChatMessage('Cancel', true); state.isComposingMessage = false; state.composingMessageTo = ''; $('chatInput').placeholder = 'Ask Artur anything…'; setTimeout(() => addChatMessage('No problem!'), 600); }
    else if (action === 'open-msg-from-chat') { parent.style.display = 'none'; addChatMessage('Send a Message', true); state.isComposingMessage = true; state.composingMessageTo = this.dataset.name; setTimeout(() => { addChatMessage(`✍️ What would you like to say to <strong>${this.dataset.name}</strong>?`); $('chatInput').placeholder = 'Type your message to ' + this.dataset.name + '...'; $('chatInput').focus(); }, 600); }
    else if (action === 'edit-msg') { parent.style.display = 'none'; addChatMessage('Edit', true); state.isComposingMessage = true; setTimeout(() => { addChatMessage('✍️ Type your new message below.'); $('chatInput').placeholder = 'Type your message to ' + state.composingMessageTo + '...'; $('chatInput').focus(); }, 600); }
    else if (action === 'send-msg') { parent.style.display = 'none'; const msg = decodeURIComponent(this.dataset.msg); addChatMessage('Send', true); setTimeout(() => { addChatMessage(`✅ Done! Your message has been sent to <strong>${state.composingMessageTo}</strong>!`); addSentMessageToData(state.composingMessageTo, msg); state.composingMessageTo = ''; }, 600); }
    else if (action === 'start-reply') startReplyInChat(parseInt(this.dataset.id));
    else if (action === 'cancel-decline') { parent.style.display = 'none'; addChatMessage('Cancel', true); setTimeout(() => addChatMessage('No problem! The visit request is still pending.'), 600); }
    else if (action === 'reschedule-visit') { parent.style.display = 'none'; addChatMessage('Reschedule', true); setTimeout(() => addChatMessage("📅 Done! Reschedule request sent."), 600); updateVisitCardStatus(state.currentVisitCard, 'rescheduling'); updateVisitBadge(); }
    else if (action === 'confirm-decline') { parent.style.display = 'none'; addChatMessage('Decline it', true); setTimeout(() => addChatMessage("Done! The visit has been declined."), 600); updateVisitCardStatus(state.currentVisitCard, 'declined'); updateVisitBadge(); }
    else if (action === 'keep-visit') { parent.style.display = 'none'; addChatMessage('Keep Visit', true); setTimeout(() => addChatMessage('No problem! Your visit is still scheduled.'), 600); }
    else if (action === 'reschedule-requested') { parent.style.display = 'none'; addChatMessage('Reschedule', true); setTimeout(() => addChatMessage("📅 Done! Reschedule request sent."), 600); }
    else if (action === 'confirm-cancel') { parent.style.display = 'none'; addChatMessage('Cancel Visit', true); setTimeout(() => addChatMessage("😔 We'll automatically send your cancellation request to the seller."), 600); updateRequestedVisitStatus(state.currentCancelCardId, 'cancelled'); }
    else if (action === 'scroll-visits') { this.parentElement.parentElement.style.display = 'none'; $('visit1')?.scrollIntoView({ behavior: 'smooth' }); }
    else if (action === 'show-options') { this.parentElement.parentElement.style.display = 'none'; }
  });

  // Calendar events
  delegate('calendarGrid', '.calendar-event', 'click', function (e) {
    e.stopPropagation();
    showEventPopover(parseInt(this.dataset.eventId), this);
  });
  delegate('weekGrid', '.week-event', 'click', function (e) {
    showEventPopover(parseInt(this.dataset.eventId), this);
  });

  // Inbox messages
  delegate('inboxList', '.visit-card[data-msg-id]', 'click', function (e) {
    if (e.target.closest('[data-action="contact"]') || e.target.closest('[data-action="view-msg"]')) return;
    selectInboxMessage(parseInt(this.dataset.msgId));
  });
  delegate('inboxList', '[data-action="view-msg"]', 'click', function (e) {
    e.stopPropagation();
    selectInboxMessage(parseInt(this.dataset.id));
  });
  delegate('inboxList', '[data-action="contact"]', 'click', function (e) {
    e.stopPropagation();
    showMessageModal(this.dataset.name, this.dataset.subject, this.dataset.email, this.dataset.phone, 'Reply to');
  });

  // Notification items
  delegate('notificationsList', '.notification-item', 'click', function (e) {
    handleNotificationClick(parseInt(this.dataset.notifId), this.dataset.notifLink, e);
  });

  // Signing doc removal
  delegate('signingDocList', '[data-action="remove-signing-doc"]', 'click', function () {
    state.signingDocs.splice(parseInt(this.dataset.idx), 1);
    renderSigningDocs();
  });

  // Pending file removal
  delegate('mobilePendingAttachments', '[data-action="remove-mobile-file"]', 'click', function () {
    state.mobilePendingFiles.splice(parseInt(this.dataset.idx), 1);
    renderMobilePendingAttachments();
  });
  delegate('chatPendingAttachments', '[data-action="remove-chat-file"]', 'click', function () {
    state.chatPendingFiles.splice(parseInt(this.dataset.idx), 1);
    renderChatPendingAttachments();
  });

  // Close dropdowns on outside click
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.filter-dropdown') && !e.target.closest('.property-filter-dropdown') && !e.target.closest('.dashboard-dropdown') && !e.target.closest('.notifications-dropdown') && !e.target.closest('.nav-item') && !e.target.closest('.mobile-more-wrapper') && !e.target.closest('.menu')) closeAllDropdowns();
    if (!e.target.closest('.info-bubble')) $$('.info-bubble').forEach((b) => b.classList.remove('active'));
    if (!e.target.closest('.event-popover') && !e.target.closest('.calendar-event') && !e.target.closest('.week-event')) closeEventPopover();
  });

  // Modal overlay close on outside click
  $$('.modal-overlay').forEach((o) => o.addEventListener('click', (e) => { if (e.target === o) o.classList.remove('show'); }));

  // Hash routing
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a');
    if (a) {
      const href = a.getAttribute('href');
      if (href && routeMap[href]) { e.preventDefault(); e.stopPropagation(); navigateTo(href); }
    }
  }, true);

  window.addEventListener('hashchange', handleHash);
}

// ============================================================
// 17. EXPOSE GLOBALS (for inline onclick in HTML)
// ============================================================
function exposeGlobals() {
  const fns = {
    toggleMenu, closeAllDropdowns, closeModal, showPage,
    showMessageModal, sendContactMessage,
    selectOfferFilter, selectFilter, selectMessageFilter,
    acceptVisit, showDeclineVisitModal, confirmDeclineVisit, rescheduleVisit,
    showCancelVisitModal, confirmCancelVisit,
    switchAccountTab, saveProfile, saveNotifications,
    switchContractTab, selectState,
    showComposeModal, sendNewMessage, searchMessages,
    renderNotifications, markAllNotificationsRead,
    renderCalendar, switchCalendarView, openAddEventModal, saveNewEvent,
    closeEventPopover,
    handleListProperty, selectPropertyType, selectPackageForm,
    submitPropertyForm, calculateSavings, updateOrderTotal,
    selectBuyIntent, selectListingType, selectLotUnit,
    toggleALaCarte, toggleALaCarteInfo, toggleTitleFromUpsell,
    toggleSecondaryOwner, toggleShippingAddress, toggleSigningAuthority, toggleNoUnit,
    handleSigningDocUpload,
    sendChatMessage, handleChatKeypress: (e) => { if (e.key === 'Enter') sendChatMessage(); },
    handleMobileNavChatKeypress: (e) => { if (e.key === 'Enter') sendMobileNavChat(); },
    handleMobileReplyKeypress: (e) => { if (e.key === 'Enter') sendMobileReply(); },
    sendMobileNavChat, sendMobileReply,
    openMobileChat, closeMobileChat, closeMobileMessageView,
    triggerMobileFileUpload, handleMobileFileSelect,
    triggerChatFileUpload, handleChatFileSelect,
    formatPhoneNumber, formatDecimalInput, validatePhone,
    stepValue, clampStepper, stepperKeydown,
    toggleInfoBubble, askArturAbout,
    showPhoneUpdateOption, selectInboxMessage,
    showToast: showToast,
    viewOffer: (btn) => {
      const title = btn.closest('.visit-card').querySelector('h3').childNodes[0].textContent.trim();
      if (isDesktop()) addChatMessage(`📄 <strong>Viewing offer for ${title}</strong><br><br>I can help you understand the terms, compare to market value, draft a counter-offer, or accept/decline.`);
      else openMobileChat();
    },
    viewDocument: (en) => { setText('documentViewerTitle', decodeURIComponent(en)); openModal('documentViewerModal'); },
    downloadDocument: () => showToast('📥 Downloading...'),
    downloadInvoice: (id) => showToast('🖨️ Printing ' + id + '...'),
    downloadContract: (id) => showToast('📥 Downloading document...'),
    deleteProperty: (id, name) => {
      const card = document.querySelector(`[data-property-id="${id}"]`);
      if (card) { card.remove(); state.properties = state.properties.filter((p) => !p.id.includes(name)); initPropertyFilters(); if (isDesktop()) addChatMessage(`🗑️ Property <strong>${name}</strong> has been deleted.`); }
    },
    prevMonth: () => { if (state.currentCalendarView === 'month') state.currentCalendarDate.setMonth(state.currentCalendarDate.getMonth() - 1); else state.currentCalendarDate.setDate(state.currentCalendarDate.getDate() - 7); renderCalendar(); },
    nextMonth: () => { if (state.currentCalendarView === 'month') state.currentCalendarDate.setMonth(state.currentCalendarDate.getMonth() + 1); else state.currentCalendarDate.setDate(state.currentCalendarDate.getDate() + 7); renderCalendar(); },
    goToToday: () => { state.currentCalendarDate = new Date(2026, 0, 30); renderCalendar(); },
    messageFromCalendar: () => { if (!state.selectedEventData) return; closeEventPopover(); showMessageModal(state.selectedEventData.person, state.selectedEventData.title, state.selectedEventData.email, state.selectedEventData.phone, 'Visit at'); },
    addToExternalCalendar: () => { if (!state.selectedEventData) return; window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent('Visit: ' + state.selectedEventData.title), '_blank'); showToast('📅 Opening Google Calendar...'); },
    selectMlsInline: (text, e) => { e.stopPropagation(); $$('#mlsInlineMenu .menu-item').forEach((i) => i.classList.remove('active')); e.target.closest('.menu-item').classList.add('active'); setText('mlsInlineText', text); closeAllDropdowns(); },
    closeSubmitProperty: (e) => { e.preventDefault(); navigateTo('/your-listing'); },
    saveAndExit: () => { showToast('💾 Progress saved!'); setTimeout(() => navigateTo('/your-listing'), 1200); },
  };
  Object.entries(fns).forEach(([k, v]) => (window[k] = v));
}

// ============================================================
// 18. INIT — Bootstrap Everything
// ============================================================
function init() {
  // Expose functions for inline HTML handlers
  exposeGlobals();

  // Greeting
  setHTML('navGreeting', getGreeting('John Doe'));

  // Init compare table
  initCompareTable();

  // Init à la carte styling
  $$('#aLaCarteOptions > label').forEach((l) => {
    l.classList.add('alc-item');
    Array.from(l.querySelectorAll(':scope > div')).forEach((d) => {
      if (d.classList.contains('alc-info')) return;
      if (d.querySelector('input[type="checkbox"]')) { d.classList.add('alc-left'); const n = d.querySelector('span'); if (n) n.classList.add('alc-name'); }
      else if (d.querySelector('.alc-info-btn')) { d.classList.add('alc-right'); const p = d.querySelector('span'); if (p) p.classList.add('alc-price'); }
    });
    Array.from(l.children).forEach((c) => {
      if (c.tagName === 'SPAN') c.classList.add('alc-badge', c.textContent.includes('never') ? 'urgent' : 'popular');
    });
  });

  // Init event delegation
  initEventDelegation();

  // Render initial data
  renderInboxMessages();
  updateMessagesBadge();
  updateMobileBadges();
  updateNotificationsBadge();
  initPropertyFilters();

  // Counter animation observer
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { animateCounters(); statsObserver.unobserve(e.target); } });
  }, { threshold: 0.5 });
  $$('.submit-stats').forEach((el) => statsObserver.observe(el));

  // Welcome message
  setTimeout(() => {
    addChatMessage("👋 Hi John! I'm <strong>Artur</strong>, your personal real estate assistant. I'm here to guide you through every step of selling your property.<br><br>I can help you with:<br>• Reviewing and responding to offers<br>• Managing visit requests<br>• Understanding contracts<br>• Answering any questions<br><br>Just type below or click on anything you need help with!");
  }, 800);

  // Initial page context message
  state.visitedPages['offers'] = false;
  setTimeout(() => showPageContextMessage('offers'), 2500);

  // Handle initial route
  if (window.location.hash && routeMap[window.location.hash.slice(1)]) handleHash();
  else navigateTo('/submit-property');
}

// ── Boot ─────────────────────────────────────────────────────
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
