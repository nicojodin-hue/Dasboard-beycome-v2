// CSS imports
import '../styles/main.css';
import '../styles/components.css';
import '../styles/layout.css';
import '../styles/calendar.css';
import '../styles/submit-property.css';
import '../styles/responsive.css';
import '../styles/offer-detail.css';
import '../styles/market-trends.css';
import '../styles/listing-detail.css';
import '../styles/title.css';
import '../styles/investor-report.css';

// Store
import store from './store.js';

// Utilities
import { closeAllDropdowns } from './utils.js';

// Components
import { renderIcons } from './components/icons.js';
import { renderHeader, initHeader } from './components/header.js';
import { renderNav, initNav } from './components/nav.js';
import { renderFooter, initFooter, updateMobileBadges, renderSiteFooter } from './components/footer.js';
import { renderChat, initChat, showPageContextMessage, resetChatState } from './components/chat.js';
import { renderModals, initModals } from './components/modals.js';

// Pages
import * as offersPage from './pages/offers.js';
import * as propertiesPage from './pages/properties.js';
import * as visitsPage from './pages/visits.js';
import * as messagesPage from './pages/messages.js';
import * as calendarPage from './pages/calendar.js';
import * as accountPage from './pages/account.js';
import * as contractsPage from './pages/contracts.js';
import * as submitPropertyPage from './pages/submit-property.js';
import * as mlsFormPage from './pages/mls-form.js';
import * as offerDetailPage from './pages/offer-detail.js';
import * as collectionPage from './pages/collection.js';
import * as marketTrendsPage from './pages/market-trends.js';
import * as titlePage from './pages/title.js';
import * as investorReportPage from './pages/investor-report.js';
import * as investorReportQ1Page from './pages/investor-report-q1.js';
import * as investorReportsPage from './pages/investor-reports.js';

// Router
import { initRouter, navigateTo } from './router.js';

// Initialize app
const visitedPages = {};

const pageModules = {
    offers: offersPage,
    properties: propertiesPage,
    visits: visitsPage,
    messages: messagesPage,
    calendar: calendarPage,
    account: accountPage,
    contracts: contractsPage,
    addProperty: submitPropertyPage,
    mlsForm: mlsFormPage,
    offerDetail: offerDetailPage,
    collection: collectionPage,
    marketTrends: marketTrendsPage,
    title: titlePage,
    investorReport: investorReportPage,
    investorReportQ1: investorReportQ1Page,
    investorReports: investorReportsPage
};

// Expose app globals for cross-component communication
window.app = {
    navigateTo: function (page) { navigateTo(page); },
    renderCalendar: null // Will be set after calendar page loads
};

// Seed data on first load
store.seed();

// Mount layout components
document.getElementById('icons-sprite').innerHTML = renderIcons();
document.getElementById('main-header').innerHTML = renderHeader();
document.getElementById('top-nav').innerHTML = renderNav();
document.getElementById('chat-widget-container').innerHTML = renderChat();
document.getElementById('site-footer-container').innerHTML = renderSiteFooter();
document.getElementById('mobile-bottom-nav-container').innerHTML = renderFooter();
document.getElementById('modals-container').innerHTML = renderModals();

// Render submit property into its container (it's a full-screen overlay)
document.getElementById('submit-property-container').innerHTML = submitPropertyPage.render();
document.getElementById('submit-property-container').style.cssText = 'display:none; position:fixed; top:0; left:0; right:0; bottom:0; z-index:2000; background:var(--c-bg); overflow-y:auto;';
submitPropertyPage.init();

// MLS form container (rendered on demand by router)
document.getElementById('mls-form-container').style.cssText = 'display:none; position:fixed; top:0; left:0; right:0; bottom:0; z-index:2000; background:var(--c-bg); overflow-y:auto;';

// Offer detail container (no longer used as overlay — rendered in main layout)

// Initialize layout components
initHeader();
initNav();
initChat();
initFooter();
initModals();

// Close dropdowns on outside click
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
});

// Update mobile badges
function updateBadges() {
    const messages = store.get('messages');
    const unread = messages ? messages.inbox.filter(m => m.unread).length : 0;
    updateMobileBadges(2, unread);
}

updateBadges();

// Page change handler
function onPageChange(page, hash) {
    const contentArea = document.getElementById('page-content');
    const mod = pageModules[page];
    if (!mod) return;

    // Reset chat composing state when switching pages
    resetChatState();

    // Render page content
    contentArea.innerHTML = mod.render();

    // Initialize page event listeners
    mod.init();


    // Show contextual chat message
    showPageContextMessage(page, visitedPages);

    // Set calendar re-render reference if on calendar page
    if (page === 'calendar' && mod.renderCalendar) {
        window.app.renderCalendar = () => mod.renderCalendar();
    }
}

// Start router
initRouter(pageModules, onPageChange);
