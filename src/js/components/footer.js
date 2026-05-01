import { toggleMenu, closeAllDropdowns, showMobileToast } from '../utils.js';

export function renderFooter() {
    return `<div class="mobile-bottom-nav-chat">
        <div class="mobile-nav-chat-wrapper">
            <input type="text" class="mobile-nav-chat-input" id="mobileNavChatInput" placeholder="Ask Artur anything…">
            <button class="mobile-nav-chat-attach"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></button>
            <button class="mobile-nav-chat-mic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg></button>
            <button class="mobile-nav-chat-send" id="mobileNavChatSend"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></button>
        </div>
    </div>
    <div class="mobile-bottom-nav-items">
        <div class="mobile-bottom-nav-item" data-route="/your-listing">
            <div class="mobile-bottom-nav-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>
            <span class="mobile-bottom-nav-label">Properties</span>
        </div>
        <div class="mobile-bottom-nav-item active" data-route="/offers">
            <div class="mobile-bottom-nav-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg><span class="mobile-bottom-nav-badge">1</span></div>
            <span class="mobile-bottom-nav-label">Offers</span>
        </div>
        <div class="mobile-bottom-nav-item" data-route="/requested-show">
            <div class="mobile-bottom-nav-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg><span class="mobile-bottom-nav-badge" id="mobileVisitsBadge">2</span></div>
            <span class="mobile-bottom-nav-label">Showings</span>
        </div>
        <div class="mobile-bottom-nav-item" data-route="/your-messages">
            <div class="mobile-bottom-nav-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><span class="mobile-bottom-nav-badge" id="mobileMessagesBadge">3</span></div>
            <span class="mobile-bottom-nav-label">Inbox</span>
        </div>
        <div class="mobile-more-wrapper">
            <div class="menu up right" id="mobileDropupMenu">
                <button class="menu-item" data-route="/collection"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>Favorites</button>
                <button class="menu-item" data-route="/calendar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>Calendar</button>
                <button class="menu-item" data-route="/contract"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>Contracts</button>
                <button class="menu-item" data-route="/profile"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>Account</button>
                <button class="menu-item" data-route="/market-trends"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>Market Trends</button>
            </div>
            <div class="mobile-bottom-nav-item" id="mobileMoreBtn">
                <div class="mobile-bottom-nav-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></div>
                <span class="mobile-bottom-nav-label">More</span>
            </div>
        </div>
    </div>`;
}

export function initFooter() {
    document.querySelectorAll('.mobile-bottom-nav-item[data-route]').forEach(item => {
        item.addEventListener('click', () => { window.location.hash = item.dataset.route; });
    });
    document.querySelectorAll('#mobileDropupMenu .menu-item[data-route]').forEach(item => {
        item.addEventListener('click', () => { window.location.hash = item.dataset.route; closeAllDropdowns(); });
    });
    const moreBtn = document.getElementById('mobileMoreBtn');
    if (moreBtn) moreBtn.addEventListener('click', (e) => toggleMenu('mobileDropupMenu', e));
    const sendBtn = document.getElementById('mobileNavChatSend');
    if (sendBtn) sendBtn.addEventListener('click', sendMobileNavChat);
    const chatInput = document.getElementById('mobileNavChatInput');
    if (chatInput) chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMobileNavChat(); });

    // Investor modal
    const investorLink = document.getElementById('footer-investors-link');
    const investorModal = document.getElementById('investorModal');
    const investorClose = document.getElementById('investorModalClose');
    const investorInput = document.getElementById('investorPasswordInput');
    const investorSubmit = document.getElementById('investorPasswordSubmit');
    const investorError = document.getElementById('investorPasswordError');

    if (investorLink && investorModal) {
        investorLink.addEventListener('click', (e) => {
            e.preventDefault();
            investorModal.style.display = 'flex';
            investorInput.value = '';
            investorError.style.display = 'none';
            setTimeout(() => investorInput.focus(), 100);
        });

        investorClose.addEventListener('click', () => {
            investorModal.style.display = 'none';
        });

        investorModal.addEventListener('click', (e) => {
            if (e.target === investorModal) investorModal.style.display = 'none';
        });

        function submitInvestorPassword() {
            if (investorInput.value === 'beycome2026') {
                investorModal.style.display = 'none';
                window.location.hash = '/investor-reports';
            } else {
                investorError.style.display = 'block';
                investorInput.value = '';
                investorInput.focus();
            }
        }

        investorSubmit.addEventListener('click', submitInvestorPassword);
        investorInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') submitInvestorPassword();
        });
    }
}

function sendMobileNavChat() {
    const input = document.getElementById('mobileNavChatInput');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    showMobileToast('Message sent to Artur!');
}

export function renderSiteFooter() {
    return `<footer class="site-footer">
        <div class="site-footer-main">
            <div class="site-footer-col">
                <h4 class="site-footer-heading">Features</h4>
                <ul class="site-footer-links">
                    <li><a href="https://www.beycome.com/flat-fee-mls/">Sell my home</a></li>
                    <li><a href="https://www.beycome.com/i-want-to-buy-a-home">Buy a home</a></li>
                    <li><a href="https://www.beycometitle.com">Title</a></li>
                    <li><a href="https://www.beycome.com/how-much-is-my-home-worth">Property price estimator</a></li>
                    <li><a href="https://www.beycome.com/yard-sign">Yard sign</a></li>
                    <li><a href="https://www.beycome.com/for-sale/military">Military FSBO</a></li>
                    <li><a href="https://www.beycome.com/properties-closed/all">Closed homes</a></li>
                </ul>
            </div>
            <div class="site-footer-col">
                <h4 class="site-footer-heading">Resources</h4>
                <ul class="site-footer-links">
                    <li><a href="https://www.beycome.com/contact">Contact</a></li>
                    <li><a href="https://www.beycome.com/how-it-works">How it works</a></li>
                    <li><a href="https://www.beycome.com/real-estate-glossary">Real estate glossary</a></li>
                    <li><a href="https://www.beycome.com/blog">Blog</a></li>
                    <li><a href="https://www.beycome.com/faq">FAQ</a></li>
                </ul>
            </div>
            <div class="site-footer-col">
                <h4 class="site-footer-heading">Company</h4>
                <ul class="site-footer-links">
                    <li><a href="https://www.beycome.com/about-us">About us</a></li>
                    <li><a href="https://www.beycome.com/reviews">Reviews</a></li>
                    <li><a href="https://www.beycome.com/media-press-inquiries">Press</a></li>
                    <li><a href="https://www.beycome.com/terms-and-conditions">Terms & conditions</a></li>
                    <li><a href="https://www.beycome.com/privacy-policy">Privacy & security</a></li>
                    <li><a href="https://www.beycome.com/dmca">DMCA</a></li>
                    <li><a href="https://www.beycome.com/accessibility">Accessibility</a></li>
                    <li><a href="#" id="footer-investors-link">Investors</a></li>
                </ul>
            </div>
            <div class="site-footer-col site-footer-contact">
                <h4 class="site-footer-heading">Contact</h4>
                <p>5701 Sunset Drive #224,<br>South Miami, FL 33143</p>
                <p>Phone: <a href="tel:8046565007">804-656-5007</a></p>
                <p>Email: <a href="mailto:contact@beycome.com">contact@beycome.com</a></p>
                <p>Monday to Friday - 8:30am - 6:30pm EST</p>
                <p>Saturday - 9am - 5pm EST</p>
                <div class="site-footer-cta">
                    <a href="https://beycome.zohobookings.com/#/customer/beycome" class="site-footer-btn site-footer-btn--call">Schedule a free call</a>
                    <a href="https://wa.me/17865202755" class="site-footer-btn site-footer-btn--whatsapp" aria-label="WhatsApp"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
                </div>
                <div class="site-footer-social">
                    <span class="site-footer-social-label">Follow us</span>
                    <div class="site-footer-social-icons">
                        <a href="https://www.facebook.com/beycomeUSA/" aria-label="Facebook"><svg width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M10.51,6.68v-1.56c0-.81.06-1.25,1.19-1.25h2.09V.75h-3c-2.91,0-3.58,1.55-3.58,4.09v1.84h-2.21v3.12h2.21v9.05h3.29v-9.05h2.99l.32-3.12h-3.3Z" fill="currentColor"/></svg></a>
                        <a href="https://www.instagram.com/beycome/" aria-label="Instagram"><svg width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M13.1115 0.753906H5.00447C3.68082 0.755758 2.4119 1.2824 1.47594 2.21837C0.539968 3.15434 0.0133264 4.42325 0.0114746 5.74691V13.8539C0.0133264 15.1776 0.539968 16.4465 1.47594 17.3824C2.4119 18.3184 3.68082 18.8451 5.00447 18.8469H13.1115C14.4353 18.8453 15.7045 18.3188 16.6407 17.3828C17.5768 16.4468 18.1036 15.1777 18.1055 13.8539V5.74691C18.1036 4.42308 17.5768 3.15401 16.6407 2.21801C15.7045 1.28202 14.4353 0.755494 13.1115 0.753906ZM16.4995 13.8539C16.4984 14.7521 16.1411 15.6133 15.506 16.2484C14.8708 16.8836 14.0097 17.2408 13.1115 17.2419H5.00447C4.10625 17.2408 3.24511 16.8836 2.60997 16.2484C1.97482 15.6133 1.61753 14.7521 1.61647 13.8539V5.74691C1.61753 4.84868 1.97482 3.98754 2.60997 3.3524C3.24511 2.71725 4.10625 2.35996 5.00447 2.35891H13.1115C14.0097 2.35996 14.8708 2.71725 15.506 3.3524C16.1411 3.98754 16.4984 4.84868 16.4995 5.74691V13.8539Z" fill="currentColor"/><path d="M9.05845 5.14258C8.13719 5.14258 7.23661 5.41577 6.47061 5.92759C5.7046 6.43942 5.10758 7.1669 4.75502 8.01804C4.40247 8.86917 4.31023 9.80575 4.48996 10.7093C4.66969 11.6129 5.11332 12.4428 5.76475 13.0943C6.41618 13.7457 7.24616 14.1893 8.14972 14.3691C9.05329 14.5488 9.98985 14.4566 10.841 14.104C11.6921 13.7515 12.4196 13.1544 12.9314 12.3884C13.4433 11.6224 13.7165 10.7218 13.7165 9.80058C13.7151 8.5656 13.224 7.38159 12.3507 6.50834C11.4774 5.63508 10.2934 5.1439 9.05845 5.14258ZM9.05845 12.8546C8.45443 12.8546 7.86397 12.6755 7.36174 12.3399C6.85951 12.0043 6.46807 11.5273 6.23692 10.9693C6.00577 10.4112 5.94529 9.79719 6.06313 9.20477C6.18097 8.61235 6.47184 8.06818 6.89895 7.64107C7.32606 7.21396 7.87023 6.9231 8.46265 6.80526C9.05506 6.68742 9.66912 6.7479 10.2272 6.97905C10.7852 7.2102 11.2622 7.60164 11.5978 8.10387C11.9333 8.60609 12.1125 9.19655 12.1125 9.80058C12.1114 10.6102 11.7893 11.3864 11.2168 11.9589C10.6443 12.5314 9.8681 12.8535 9.05845 12.8546Z" fill="currentColor"/><path d="M13.9165 3.77734C13.6439 3.77736 13.3798 3.87187 13.1692 4.04477C12.9585 4.21768 12.8143 4.45828 12.7612 4.72558C12.708 4.99288 12.7492 5.27034 12.8777 5.51069C13.0061 5.75104 13.214 5.93941 13.4658 6.04369C13.7176 6.14798 13.9977 6.16173 14.2585 6.08261C14.5193 6.00348 14.7446 5.83638 14.896 5.60977C15.0474 5.38316 15.1156 5.11106 15.0888 4.83984C15.0621 4.56862 14.9422 4.31505 14.7495 4.12234C14.5282 3.90189 14.2288 3.77788 13.9165 3.77734Z" fill="currentColor"/></svg></a>
                        <a href="https://linkedin.com/company/beycome" aria-label="LinkedIn"><svg width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M4.61,18.92V7.36H.77v11.56h3.84,0ZM2.69,5.79c.57,0,1.11-.23,1.51-.64.4-.4.62-.95.62-1.52s-.23-1.11-.63-1.52c-.4-.4-.95-.63-1.52-.63s-1.11.23-1.52.63c-.4.4-.63.95-.63,1.52,0,.57.22,1.12.62,1.52.4.4.95.63,1.51.64h.02ZM6.74,18.92h3.84v-6.46c-.01-.32.03-.63.13-.94.14-.41.41-.76.76-1.01.35-.25.77-.39,1.21-.39,1.39,0,1.95,1.06,1.95,2.61v6.18h3.84v-6.63c0-3.55-1.9-5.2-4.42-5.2-.7-.03-1.4.14-2.02.48-.62.34-1.12.85-1.47,1.46h.03v-1.68h-3.84c.05,1.08,0,11.56,0,11.56Z" fill="currentColor"/></svg></a>
                        <a href="https://twitter.com/beycome" aria-label="X"><svg width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M11.49,8.4L18.14.68h-1.57l-5.77,6.71L6.18.68H.87l6.97,10.14L.87,18.92h1.58l6.09-7.08,4.87,7.08h5.32l-7.23-10.52h0ZM9.34,10.91l-.71-1.01L3.01,1.86h2.42l4.53,6.49.71,1.01,5.89,8.43h-2.42l-4.81-6.88h0Z" fill="currentColor"/></svg></a>
                        <a href="https://www.zillow.com/profile/gobeycome/" aria-label="Zillow"><svg width="19" height="19" viewBox="0 0 19 19"><path d="M12.15,5.86c.08-.02.11,0,.16.06.26.32,1.09,1.41,1.32,1.71,0,.01.01.02.02.04,0,.01,0,.03,0,.04,0,.01,0,.03-.01.04,0,.01-.02.02-.03.03-1.7,1.45-3.24,3.08-4.6,4.86-.02.03,0,.03.01.03,2.59-1.08,5.27-1.94,8.01-2.57v-2.64L9.51,1.04,1.97,7.47v2.88c3.22-1.86,6.63-3.37,10.18-4.48h0ZM5.87,16.89s.05.04.08.05c.03,0,.06,0,.09-.02,3.51-1.71,7.2-3.02,11-3.91v5.91H1.97v-6.14c2.32-1.29,4.73-2.43,7.2-3.41.03-.01.04,0,.01.03-1.8,1.63-3.39,3.49-4.71,5.53-.05.08-.05.11,0,.16l1.4,1.81Z" fill="currentColor"/></svg></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="site-footer-legal">
            <p><strong>Agreement to Terms and Privacy Policy:</strong> By using beycome.com, you agree to our <a href="https://www.beycome.com/terms-and-conditions">Terms and Conditions</a> and our <a href="https://www.beycome.com/privacy-policy">Privacy Policy</a>.</p>
            <p><strong>Legal Disclaimer:</strong> Information is current as of May 14, 2024. Beycome Corp. may modify or discontinue products and benefits without notice. Eligibility and underwriting requirements must be met. No guarantee, warranty, or representation of any kind is made regarding the completeness or accuracy of descriptions or measurements (including square footage measurements and property condition); such should be independently verified, and Beycome expressly disclaims any liability in connection therewith.</p>
            <p><strong>Trademark Notice:</strong> Logos and trademarks on our website are used to illustrate industry partnerships and do not imply endorsement unless explicitly stated. All trademarks belong to their respective owners, and we comply with trademark laws.</p>
            <p><strong>Beycome Family of Companies:</strong> Beycome Mortgage LLC provides home loans; Beycome Brokerage Realty LLC, Beycome Brokerage Realty Inc., and Beycome of Florida LLC provide real estate services; Beycome Title of Florida LLC provides title insurance services. These are separate entities under Beycome Corp., each governed by its own management as required by law, but all owned by the same individuals, forming a business relationship. Beycome Corp. holds real estate brokerage licenses in Multiple States: Beycome of Florida LLC is licensed in FL. Beycome Brokerage Realty Inc is licensed in CA. Beycome of Connecticut in CT. Beycome Brokerage Realty LLC is licensed in AL, GA, IL, IN, MI, MN, NC, OH, SC, TN, TX and VA. CalDRE #01804683 TREC: <a href="https://www.beycome.com/terms-and-conditions">Brokerage Services</a>, <a href="https://www.beycome.com/terms-and-conditions">Consumer Protection Notice</a></p>
            <p>IDX&copy; information is provided exclusively for consumers' personal, non-commercial use. It may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing. Information deemed reliable but not guaranteed to be accurate.</p>
            <p><strong>Listings Information:</strong> Listings information is updated daily. All information provided is deemed reliable but is not guaranteed accurate and should be independently verified.</p>
            <p>Broker Compensation is fully negotiable and is not fixed, controlled, recommended, or suggested by law or any multiple listing service or association of REALTORS&reg;. Beycome fully supports the <a href="https://www.beycome.com/accessibility">Equal Housing Opportunity</a> laws.</p>
            <p>All rights reserved, Copyright 2026 beycome&trade; | Made with <svg class="footer-heart" width="14" height="14" viewBox="0 0 24 24" fill="#FF9B77"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> in the USA.</p>
        </div>
    </footer>
    <!-- Investor Password Modal -->
    <div class="ir-modal-overlay" id="investorModal" style="display:none; position:fixed; inset:0; z-index:9999; background:hsla(0,0%,0%,0.5); align-items:center; justify-content:center;">
        <div style="background:#fff; border-radius:16px; padding:40px; max-width:400px; width:90%; text-align:center; position:relative;">
            <button id="investorModalClose" style="position:absolute; top:12px; right:12px; background:none; border:none; cursor:pointer; color:var(--c-text-secondary); font-size:20px;">&times;</button>
            <img src="/logos/logo-beycome.svg" alt="Beycome" style="height:28px; margin-bottom:8px;">
            <div style="font-size:14px; color:var(--c-text-secondary); margin-bottom:24px;">Investor Report | FY 2025</div>
            <div style="position:relative; margin-bottom:16px;">
                <svg style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--c-text-secondary);" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input type="password" id="investorPasswordInput" placeholder="Enter password" style="width:100%; box-sizing:border-box; padding:12px 16px 12px 42px; border:1px solid var(--c-border); border-radius:8px; font-size:15px; outline:none;">
            </div>
            <div id="investorPasswordError" style="display:none; color:var(--c-error); font-size:13px; margin-bottom:12px;">Incorrect password. Please try again.</div>
            <button id="investorPasswordSubmit" style="width:100%; padding:14px; border:none; border-radius:10px; background:var(--c-accent, hsla(230,86.1%,72%,1)); color:#fff; font-size:15px; font-weight:700; cursor:pointer;">Access Report</button>
            <div style="font-size:12px; color:var(--c-text-secondary); margin-top:16px;">This report is confidential and intended for investors only.</div>
        </div>
    </div>`;
}

export function updateMobileBadges(pendingVisits, unreadMessages) {
    const vb = document.getElementById('mobileVisitsBadge');
    if (vb) { if (pendingVisits > 0) { vb.textContent = pendingVisits; vb.style.display = 'flex'; } else vb.style.display = 'none'; }
    const mb = document.getElementById('mobileMessagesBadge');
    if (mb) { if (unreadMessages > 0) { mb.textContent = unreadMessages; mb.style.display = 'flex'; } else mb.style.display = 'none'; }
}
