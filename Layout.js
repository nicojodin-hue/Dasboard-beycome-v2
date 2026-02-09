// ============================================================
// layout.js — Injects shared shell: header, nav, chat, mobile
// nav, modals, and SVG sprite into every page.
// ============================================================

(function () {
  'use strict';

  // ----------------------------------------------------------
  // 1. SVG SPRITE
  // ----------------------------------------------------------
  const svgSprite = `
<svg style="display:none">
  <symbol id="i-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></symbol>
  <symbol id="i-chev-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></symbol>
  <symbol id="i-chev-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></symbol>
  <symbol id="i-chev-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></symbol>
  <symbol id="i-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></symbol>
  <symbol id="i-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></symbol>
  <symbol id="i-send" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></symbol>
  <symbol id="i-house" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></symbol>
  <symbol id="i-cal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></symbol>
  <symbol id="i-bell" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></symbol>
  <symbol id="i-trash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></symbol>
  <symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></symbol>
  <symbol id="i-download" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></symbol>
  <symbol id="i-print" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></symbol>
  <symbol id="i-attach" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></symbol>
  <symbol id="i-mic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></symbol>
  <symbol id="i-dollar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></symbol>
  <symbol id="i-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></symbol>
  <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></symbol>
  <symbol id="i-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></symbol>
  <symbol id="i-dots" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></symbol>
  <symbol id="i-logout" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></symbol>
  <symbol id="i-grid" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></symbol>
</svg>`;

  // ----------------------------------------------------------
  // 2. MAIN HEADER
  // ----------------------------------------------------------
  const header = `
<header class="main-header">
  <div class="main-header-container">
    <div class="main-header-left">
      <a href="#">Sell</a>
      <a href="#">Buy</a>
      <a href="#">Title services</a>
    </div>
    <div class="main-header-center">
      <a href="#" class="logo" style="color:var(--c-primary);text-transform:lowercase;">beycome</a>
    </div>
    <div class="main-header-right">
      <div class="notifications-dropdown">
        <button class="notifications-btn" onclick="toggleMenu('notificationsMenu',event)">
          <svg width="20" height="20"><use href="#i-bell"/></svg>
          <span class="notifications-badge" id="notificationsBadge">4</span>
        </button>
        <div class="notifications-menu" id="notificationsMenu">
          <div class="notifications-header">
            <h3>Notifications</h3>
            <button class="mark-all-read-btn" onclick="markAllNotificationsRead(event)">Mark all read</button>
          </div>
          <div class="notifications-list" id="notificationsList"></div>
          <div class="notifications-footer">
            <a href="#" onclick="Layout.navigate('/your-messages');return false;">View all activity</a>
          </div>
        </div>
      </div>
      <div class="dashboard-dropdown">
        <button class="dashboard-btn" onclick="toggleMenu('dashboardMenu',event)">
          <span class="dashboard-text">Dashboard</span>
          <svg class="arrow-icon desktop-only" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          <svg class="hamburger-icon mobile-only" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div class="dashboard-menu" id="dashboardMenu">
          <a href="/profile" class="dashboard-menu-item desktop-only">My Account</a>
          <a href="#" class="dashboard-menu-item mobile-only">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>Dashboard
          </a>
          <a href="#" class="dashboard-menu-item desktop-only">Sign Out</a>
          <a href="#" class="dashboard-menu-item mobile-only" style="color:var(--c-error);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>Sign Out
          </a>
        </div>
      </div>
    </div>
  </div>
</header>`;

  // ----------------------------------------------------------
  // 3. TOP NAV (greeting + menu)
  // ----------------------------------------------------------
  function buildNav(activePath) {
    const links = [
      { href: '/offers',         label: 'Offers',   badge: 'offersBadge',   badgeCount: 1 },
      { href: '/requested-show', label: 'Showings', badge: 'visitsBadge',   badgeCount: 2 },
      { href: '/your-messages',  label: 'Inbox',    badge: 'messagesBadge', badgeCount: 3 },
      { href: '/calendar',       label: '',         icon: 'i-cal' },
    ];

    const navItems = links.map(l => {
      const isActive = activePath === l.href ? ' active' : '';
      const badgeHtml = l.badge
        ? `<span class="nav-badge" id="${l.badge}">${l.badgeCount}</span>`
        : '';
      const content = l.icon
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
        : l.label + badgeHtml;
      return `<li class="nav-item"><a href="${l.href}" class="nav-link${isActive}">${content}</a></li>`;
    }).join('');

    return `
<nav class="top-nav">
  <div class="nav-greeting-section">
    <span class="nav-greeting" id="navGreeting"></span>
  </div>
  <div class="nav-container">
    <ul class="nav-menu">
      <li class="nav-item"><a href="/your-listing" class="nav-link${activePath==='/your-listing'?' active':''}">Properties</a></li>
      ${navItems}
      <li class="nav-item" style="position:relative;">
        <a href="javascript:void(0)" class="nav-link has-dropdown" onclick="toggleMenu('toolsMenu',event)">More
          <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </a>
        <div class="menu right" id="toolsMenu">
          <a href="/profile" class="menu-item">Account</a>
          <a href="/contract" class="menu-item">Contract Center</a>
        </div>
      </li>
    </ul>
  </div>
</nav>`;
  }

  // ----------------------------------------------------------
  // 4. CHAT WIDGET (desktop sidebar)
  // ----------------------------------------------------------
  const chatWidget = `
<div class="chat-widget">
  <div class="chat-header">
    <h3>💬 Chat with Artur<span class="chat-online-dot"></span></h3>
    <button class="chat-close-mobile" onclick="closeMobileChat()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>
  <div class="chat-messages" id="chatMessages"></div>
  <div class="chat-input-container">
    <div id="chatPendingAttachments" class="pending-attachments" style="display:none;"></div>
    <div class="chat-input-wrapper">
      <input type="text" class="chat-input" id="chatInput" placeholder="Ask Artur anything…" onkeypress="handleChatKeypress(event)">
      <button class="chat-attach-btn" onclick="triggerChatFileUpload()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
      </button>
      <button class="chat-mic-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
      </button>
      <button class="chat-send-btn" onclick="sendChatMessage()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
      </button>
    </div>
    <input type="file" id="chatFileInput" style="display:none;" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onchange="handleChatFileSelect(event)">
    <div class="chat-disclaimer">✨ Artur has helped <strong>18,500+</strong> homeowners close their sale<br>Beycome makes no warranties regarding content produced by Artur.</div>
  </div>
</div>`;

  // ----------------------------------------------------------
  // 5. MOBILE BOTTOM NAV
  // ----------------------------------------------------------
  function buildMobileNav(activePath) {
    const items = [
      { href: '/your-listing',    label: 'Properties', icon: 'i-house' },
      { href: '/offers',          label: 'Offers',     icon: 'i-dollar',  badge: 'mobileOffersBadge', badgeCount: 1 },
      { href: '/requested-show',  label: 'Showings',   icon: 'i-cal',     badge: 'mobileVisitsBadge', badgeCount: 2 },
      { href: '/your-messages',   label: 'Inbox',      icon: 'i-chat',    badge: 'mobileMessagesBadge', badgeCount: 3 },
    ];

    const navItems = items.map(i => {
      const active = activePath === i.href ? ' active' : '';
      const badgeHtml = i.badge
        ? `<span class="mobile-bottom-nav-badge" id="${i.badge}">${i.badgeCount}</span>`
        : '';
      return `
      <div class="mobile-bottom-nav-item${active}" onclick="Layout.navigate('${i.href}')">
        <div class="mobile-bottom-nav-icon">
          <svg width="22" height="22"><use href="#${i.icon}"/></svg>
          ${badgeHtml}
        </div>
        <span class="mobile-bottom-nav-label">${i.label}</span>
      </div>`;
    }).join('');

    return `
<nav class="mobile-bottom-nav">
  <div class="mobile-bottom-nav-chat">
    <div class="mobile-nav-chat-wrapper">
      <input type="text" class="mobile-nav-chat-input" id="mobileNavChatInput" placeholder="Ask Artur anything…" onkeypress="handleMobileNavChatKeypress(event)">
      <button class="mobile-nav-chat-attach">
        <svg width="18" height="18"><use href="#i-attach"/></svg>
      </button>
      <button class="mobile-nav-chat-mic">
        <svg width="18" height="18"><use href="#i-mic"/></svg>
      </button>
      <button class="mobile-nav-chat-send" onclick="sendMobileNavChat()">
        <svg width="16" height="16"><use href="#i-send"/></svg>
      </button>
    </div>
  </div>
  <div class="mobile-bottom-nav-items">
    ${navItems}
    <div class="mobile-more-wrapper">
      <div class="menu up right" id="mobileDropupMenu">
        <button class="menu-item" onclick="Layout.navigate('/calendar');closeAllDropdowns();">
          <svg width="18" height="18"><use href="#i-cal"/></svg>Calendar
        </button>
        <button class="menu-item" onclick="Layout.navigate('/contract');closeAllDropdowns();">
          <svg width="18" height="18"><use href="#i-doc"/></svg>Contracts
        </button>
        <button class="menu-item" onclick="Layout.navigate('/profile');closeAllDropdowns();">
          <svg width="18" height="18"><use href="#i-user"/></svg>Account
        </button>
      </div>
      <div class="mobile-bottom-nav-item" onclick="toggleMenu('mobileDropupMenu',event)">
        <div class="mobile-bottom-nav-icon">
          <svg width="22" height="22"><use href="#i-dots"/></svg>
        </div>
        <span class="mobile-bottom-nav-label">More</span>
      </div>
    </div>
  </div>
</nav>`;
  }

  // ----------------------------------------------------------
  // 6. SHARED MODALS
  // ----------------------------------------------------------
  const sharedModals = `
<!-- Success Modal -->
<div class="modal-overlay" id="successModal">
  <div class="modal">
    <div class="success-message">
      <div class="success-icon" id="successIcon">👍</div>
      <h2 id="successTitle">Success!</h2>
      <p id="successMessage">Your response has been sent.</p>
      <button class="btn btn-s btn-lg modal-btn" onclick="closeModal('successModal')" style="max-width:200px;margin:0 auto;">Close</button>
    </div>
  </div>
</div>

<!-- Compose Message Modal -->
<div class="modal-overlay" id="composeModal">
  <div class="modal">
    <h2>New Message</h2>
    <div class="form-group"><label>To</label><input type="text" id="composeTo" placeholder="Enter recipient name or email"></div>
    <div class="form-group"><label>Subject</label><input type="text" id="composeSubject" placeholder="Enter subject"></div>
    <div class="form-group"><label>Message</label><textarea id="composeMessage" placeholder="Type your message here..." style="min-height:150px;"></textarea></div>
    <div class="modal-actions">
      <button class="btn btn-s btn-lg modal-btn" onclick="closeModal('composeModal')">Cancel</button>
      <button class="btn btn-p btn-lg modal-btn" onclick="sendNewMessage()">Send Message</button>
    </div>
  </div>
</div>

<!-- Contact / Message Modal -->
<div class="modal-overlay" id="messageModal">
  <div class="modal">
    <h2 style="font-size:16px;">
      <span id="messageModalTitle" style="color:var(--c-primary);">Message to</span>
      <span id="messageModalAddress"></span>
    </h2>
    <div id="messageModalContactInfo" style="margin-bottom:20px;">
      <div style="flex-direction:column;align-items:flex-start;gap:8px;">
        <h3 style="margin:0 0 1.6em 0;font-size:13px;font-weight:normal;color:var(--c-text-secondary);">
          From <span id="messageModalName" style="font-weight:bold;"></span>
        </h3>
        <div class="visit-meta-row">
          <a href="#" id="messageModalPhoneRow" style="display:flex;align-items:center;gap:6px;text-decoration:none;color:var(--c-text-secondary);" onmouseover="this.style.color='var(--c-accent)'" onmouseout="this.style.color='var(--c-text-secondary)'">
            <svg width="14" height="14"><use href="#i-phone"/></svg>
            <span id="messageModalPhone"></span>
          </a>
          <span style="color:var(--c-text-secondary);" id="messageModalDivider">·</span>
          <a href="#" id="messageModalEmailRow" style="display:flex;align-items:center;gap:6px;text-decoration:none;color:var(--c-text-secondary);" onmouseover="this.style.color='var(--c-accent)'" onmouseout="this.style.color='var(--c-text-secondary)'">
            <svg width="14" height="14"><use href="#i-mail"/></svg>
            <span id="messageModalEmail"></span>
          </a>
        </div>
      </div>
    </div>
    <div class="form-group"><textarea id="messageText" placeholder="Type your message here..."></textarea></div>
    <div class="modal-actions">
      <button class="btn btn-s btn-lg modal-btn" onclick="closeModal('messageModal')">Cancel</button>
      <button class="btn btn-p btn-lg modal-btn" onclick="sendContactMessage()">Send Message</button>
    </div>
  </div>
</div>

<!-- Decline Visit Modal -->
<div class="modal-overlay" id="declineVisitModal">
  <div class="modal">
    <h2>Just checking 😄</h2>
    <p id="declineVisitModalText">This will decline the visit and notify the buyer.</p>
    <div class="modal-actions" style="gap:10px;">
      <button class="btn btn-s btn-lg modal-btn" onclick="closeModal('declineVisitModal')">Keep it</button>
      <button class="btn btn-accent btn-lg modal-btn" onclick="rescheduleVisit()">Reschedule</button>
      <button class="btn btn-danger btn-lg modal-btn" onclick="confirmDeclineVisit()">Decline it</button>
    </div>
  </div>
</div>

<!-- Cancel Visit Modal -->
<div class="modal-overlay" id="cancelVisitModal">
  <div class="modal">
    <h2>Hold on 👀</h2>
    <p id="cancelVisitModalText">This will cancel the visit and we'll notify the buyer.</p>
    <div class="modal-actions" style="gap:10px;">
      <button class="btn btn-s btn-lg modal-btn" onclick="closeModal('cancelVisitModal')">Keep it</button>
      <button class="btn btn-accent btn-lg modal-btn" onclick="rescheduleRequestedVisit()">Reschedule</button>
      <button class="btn btn-danger btn-lg modal-btn" onclick="confirmCancelVisit()">Cancel it</button>
    </div>
  </div>
</div>

<!-- Calendar Event Popover -->
<div class="event-popover" id="eventPopover" style="display:none;">
  <div class="event-popover-header">
    <span class="event-popover-badge confirmed" id="eventPopoverBadge">Confirmed</span>
    <button class="event-popover-close" onclick="closeEventPopover()">
      <svg width="16" height="16"><use href="#i-close"/></svg>
    </button>
  </div>
  <div class="event-popover-title" id="eventPopoverTitle">Property Address</div>
  <div class="event-popover-details">
    <div class="event-popover-row"><svg width="16" height="16"><use href="#i-cal"/></svg><span id="eventPopoverDate">Feb 02, 2026</span></div>
    <div class="event-popover-row"><svg width="16" height="16"><use href="#i-clock"/></svg><span id="eventPopoverTime">11:00 AM</span></div>
    <div class="event-popover-row"><svg width="16" height="16"><use href="#i-user"/></svg><span id="eventPopoverPerson"><strong>David Miller</strong></span></div>
  </div>
  <div class="event-popover-actions" id="eventPopoverActions">
    <button class="btn" onclick="messageFromCalendar()" style="flex:1"><svg width="14" height="14"><use href="#i-chat"/></svg>Message</button>
    <button class="btn btn-p" onclick="addToExternalCalendar()" style="flex:1"><svg width="14" height="14"><use href="#i-plus"/></svg>Add to Calendar</button>
  </div>
</div>

<!-- Add Calendar Event Modal -->
<div class="modal-overlay" id="addEventModal">
  <div class="modal" style="max-width:480px;">
    <h2>📅 Add to Calendar</h2>
    <div class="form-group"><label>Event Type</label>
      <select id="addEventType" class="form-select">
        <option value="visit">👁️ Visit / Showing</option>
        <option value="milestone">📋 Milestone (Inspection, Appraisal, etc.)</option>
        <option value="deadline">⚠️ Deadline</option>
        <option value="closing">🔑 Closing</option>
        <option value="other">📌 Other</option>
      </select>
    </div>
    <div class="form-group"><label>Property</label>
      <select id="addEventProperty" class="form-select">
        <option value="456 Ocean Drive">456 Ocean Drive, Miami Beach, FL</option>
      </select>
    </div>
    <div class="form-group"><label>Title / Description</label><input type="text" id="addEventTitle" placeholder="e.g., Home Inspection with ABC Inspections"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div class="form-group"><label>Date</label><input type="date" id="addEventDate"></div>
      <div class="form-group"><label>Time</label><input type="time" id="addEventTime" value="10:00"></div>
    </div>
    <div class="form-group" id="addEventContactGroup"><label>Contact Person (Optional)</label><input type="text" id="addEventContact" placeholder="e.g., John Smith"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;" id="addEventContactDetails">
      <div class="form-group"><label>Phone</label><input type="tel" id="addEventPhone" placeholder="(305) 555-0000"></div>
      <div class="form-group"><label>Email</label><input type="email" id="addEventEmail" placeholder="email@example.com"></div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-s btn-lg modal-btn" onclick="closeModal('addEventModal')">Cancel</button>
      <button class="btn btn-p btn-lg modal-btn" onclick="saveNewEvent()">Add to Calendar</button>
    </div>
  </div>
</div>

<!-- Document Viewer Modal -->
<div class="modal-overlay" id="documentViewerModal">
  <div class="modal" style="max-width:800px;padding:0;overflow:hidden;">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--c-border);">
      <h3 id="documentViewerTitle" style="margin:0;font-size:16px;font-weight:600;">Document</h3>
      <div style="display:flex;gap:8px;">
        <button class="btn" onclick="downloadDocument()"><svg width="14" height="14" style="margin-right:6px;"><use href="#i-download"/></svg>Download</button>
        <button class="btn btn-s" onclick="closeModal('documentViewerModal')">Close</button>
      </div>
    </div>
    <div id="documentViewerContent" style="padding:40px;min-height:400px;background:var(--c-bg-light);display:flex;align-items:center;justify-content:center;">
      <div style="text-align:center;color:var(--c-text-secondary);">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:16px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        <p style="font-size:14px;">Document preview</p>
      </div>
    </div>
  </div>
</div>

<!-- Compare Packages Modal -->
<div class="modal-overlay" id="compareModal" style="z-index:2100;">
  <div class="modal" style="max-width:720px;padding:0;overflow:hidden;max-height:85vh;">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--c-border);">
      <h2 style="margin:0;font-size:18px;font-weight:700;color:var(--c-primary);">Compare packages</h2>
      <button class="icon-btn" onclick="closeModal('compareModal')"><svg width="20" height="20"><use href="#i-close"/></svg></button>
    </div>
    <div style="overflow:auto;padding:0 24px 24px;max-height:calc(85vh - 70px);">
      <table style="width:100%;border-collapse:collapse;font-size:13px;min-width:500px;">
        <thead>
          <tr>
            <th style="text-align:left;padding:16px 12px 12px 0;font-weight:500;color:var(--c-text-secondary);width:40%;"></th>
            <th style="text-align:center;padding:16px 8px 12px;font-weight:700;color:var(--c-primary);">Basic<br><span style="font-size:18px;">$99</span></th>
            <th style="text-align:center;padding:16px 8px 12px;font-weight:700;color:var(--c-accent);background:#f8f9ff;border-radius:12px 12px 0 0;">Enhanced<br><span style="font-size:18px;">$399</span></th>
            <th style="text-align:center;padding:16px 8px 12px;font-weight:700;color:var(--c-primary);">Concierge<br><span style="font-size:18px;">$999</span></th>
          </tr>
        </thead>
        <tbody id="compareTableBody"></tbody>
      </table>
    </div>
  </div>
</div>

<!-- Mobile Message Thread View -->
<div class="mobile-message-view" id="mobileMessageView">
  <div class="mobile-message-header">
    <button class="mobile-back-btn" onclick="closeMobileMessageView()"><svg width="20" height="20"><use href="#i-chev-left"/></svg></button>
    <div class="mobile-message-title">
      <h3 id="mobileMessageSubject">Subject</h3>
      <p id="mobileMessageStatus">Status</p>
    </div>
    <div class="mobile-message-actions-top"></div>
  </div>
  <div class="mobile-message-thread" id="mobileMessageThread"></div>
  <div class="mobile-message-reply">
    <div id="mobilePendingAttachments" class="pending-attachments" style="display:none;"></div>
    <div class="mobile-reply-wrapper">
      <button class="mobile-attach-btn" onclick="triggerMobileFileUpload()">
        <svg width="18" height="18"><use href="#i-attach"/></svg>
      </button>
      <input type="text" class="mobile-reply-input" id="mobileReplyInput" placeholder="Type your reply..." onkeypress="handleMobileReplyKeypress(event)">
      <button class="mobile-send-btn" onclick="sendMobileReply()">
        <svg width="16" height="16"><use href="#i-send"/></svg>
      </button>
    </div>
    <input type="file" id="mobileFileInput" style="display:none;" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onchange="handleMobileFileSelect(event)">
  </div>
</div>`;

  // ----------------------------------------------------------
  // 7. GREETING HELPER
  // ----------------------------------------------------------
  function setGreeting(userName) {
    const h = new Date().getHours();
    const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    const i = h < 12 ? '☀️' : h < 17 ? '🌤️' : '🌙';
    const el = document.getElementById('navGreeting');
    if (el) el.innerHTML = '<span style="font-size:20px;line-height:1;">' + i + '</span> ' + g + ', ' + userName;
  }

  // ----------------------------------------------------------
  // 8. COMPARE TABLE BUILDER
  // ----------------------------------------------------------
  function buildCompareTable() {
    const rows = [
      ['MLS listing','✓','✓','✓'],['Syndication to 100+ sites','✓','✓','✓'],
      ['Maximum MLS photos','✓','✓','✓'],['Online offers & messaging','✓','✓','✓'],
      ['Unlimited updates & changes','✓','✓','✓'],['Open house scheduler','✓','✓','✓'],
      ['ShowingTime℠','✓','✓','✓'],['All legal forms & disclosures','✓','✓','✓'],
      ['24-month listing','✓','✓','✓'],['Cancel anytime for free','✓','✓','✓'],
      ['$0 due at closing','✓','✓','✓'],['Support (6 days/week)','✓','✓','✓'],
      ['25 HDR professional photos','—','✓','✓'],['Key lock box','—','✓','✓'],
      ['Yard sign + open house kit','—','✓','✓'],['Flyers & brochure','—','✓','✓'],
      ['Virtual tour video','—','✓','✓'],['Social media ad materials','—','✓','✓'],
      ['beycome Spotlight Listing','—','✓','✓'],['Dedicated 7/7 personnel','—','—','✓'],
      ['Closing coordinator','—','—','✓'],['Negotiation & offer review','—','—','✓'],
      ['Pricing strategy & CMA','—','—','✓'],['3D home tour','—','—','✓'],
      ['Drone photography','—','—','✓'],['Title Settlement','Add-on $99','Add-on $99','✓ Included'],
    ];
    const tb = document.getElementById('compareTableBody');
    if (!tb) return;
    rows.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td style="padding:10px 12px 10px 0;border-bottom:1px solid #f0f0f0;color:var(--c-primary);font-weight:500;">' + r[0] + '</td>' +
        [r[1], r[2], r[3]].map((v, i) => {
          const bg = i === 1 ? 'background:#f8f9ff;' : '';
          const color = v === '✓' ? 'color:var(--c-success);font-size:16px;font-weight:700;'
            : v === '—' ? 'color:#d0d0d0;font-size:16px;'
            : 'color:var(--c-primary);font-size:11px;font-weight:500;';
          return '<td style="text-align:center;padding:10px 8px;border-bottom:1px solid #f0f0f0;' + bg + '"><span style="' + color + '">' + v + '</span></td>';
        }).join('');
      tb.appendChild(tr);
    });
  }

  // ----------------------------------------------------------
  // 9. GLOBAL CLICK HANDLERS (close menus, info bubbles)
  // ----------------------------------------------------------
  function initGlobalListeners() {
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.filter-dropdown') &&
          !e.target.closest('.property-filter-dropdown') &&
          !e.target.closest('.dashboard-dropdown') &&
          !e.target.closest('.notifications-dropdown') &&
          !e.target.closest('.nav-item') &&
          !e.target.closest('.mobile-more-wrapper') &&
          !e.target.closest('.menu')) {
        closeAllDropdowns();
      }
      if (!e.target.closest('.info-bubble')) {
        document.querySelectorAll('.info-bubble').forEach(b => b.classList.remove('active'));
      }
      if (!e.target.closest('.event-popover') &&
          !e.target.closest('.calendar-event') &&
          !e.target.closest('.week-event')) {
        const pop = document.getElementById('eventPopover');
        if (pop) pop.style.display = 'none';
      }
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(o => {
      o.addEventListener('click', e => { if (e.target === o) o.classList.remove('show'); });
    });

    // Intercept link clicks for SPA-style navigation
    document.addEventListener('click', function (e) {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href && Layout._routes[href]) {
        e.preventDefault();
        e.stopPropagation();
        Layout.navigate(href);
      }
    }, true);
  }

  // ----------------------------------------------------------
  // 10. ROUTE MAP (path → page file)
  // ----------------------------------------------------------
  const ROUTES = {
    '/your-listing':    'properties',
    '/offers':          'offers',
    '/requested-show':  'showings',
    '/your-messages':   'messages',
    '/calendar':        'calendar',
    '/contract':        'contracts',
    '/profile':         'account',
    '/submit-property': 'submit-property',
  };

  // ----------------------------------------------------------
  // 11. PUBLIC API — window.Layout
  // ----------------------------------------------------------
  window.Layout = {
    _routes: ROUTES,
    _userName: 'John Doe',
    _currentPath: null,

    /**
     * Initialize the layout shell.
     * Call once from every page's inline <script>:
     *   Layout.init({ activePath: '/offers', userName: 'John Doe' });
     */
    init: function (opts) {
      opts = opts || {};
      const activePath = opts.activePath || window.location.pathname;
      const userName = opts.userName || this._userName;
      this._currentPath = activePath;
      this._userName = userName;

      // Inject SVG sprite at top of body
      document.body.insertAdjacentHTML('afterbegin', svgSprite);

      // Inject header
      const headerSlot = document.getElementById('layout-header');
      if (headerSlot) headerSlot.innerHTML = header;

      // Inject top nav
      const navSlot = document.getElementById('layout-nav');
      if (navSlot) navSlot.innerHTML = buildNav(activePath);

      // Inject chat widget
      const chatSlot = document.getElementById('layout-chat');
      if (chatSlot) chatSlot.innerHTML = chatWidget;

      // Inject mobile bottom nav
      const mobileNavSlot = document.getElementById('layout-mobile-nav');
      if (mobileNavSlot) mobileNavSlot.innerHTML = buildMobileNav(activePath);

      // Inject shared modals
      const modalsSlot = document.getElementById('layout-modals');
      if (modalsSlot) modalsSlot.innerHTML = sharedModals;

      // Set greeting
      setGreeting(userName);

      // Build compare table
      buildCompareTable();

      // Attach global listeners
      initGlobalListeners();
    },

    /**
     * Navigate to a route (for multi-page: redirect; for SPA: hash).
     * In multi-page mode each route maps to its own HTML file.
     */
    navigate: function (path) {
      if (ROUTES[path]) {
        // Multi-page: go to actual file
        window.location.href = '/pages/' + ROUTES[path] + '.html';
      } else {
        window.location.href = path;
      }
    },

    /**
     * Update nav badge counts from page-specific JS.
     */
    updateBadge: function (id, count) {
      const el = document.getElementById(id);
      if (!el) return;
      if (count > 0) {
        el.textContent = count;
        el.style.display = 'flex';
      } else {
        el.style.display = 'none';
      }
    },

    /**
     * Highlight the active nav link (called after init if needed).
     */
    setActiveNav: function (path) {
      document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === path);
      });
    },
  };

})();
