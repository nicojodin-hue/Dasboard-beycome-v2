<?php
$bc_footer_topics = [
    'selling-a-home'   => ['Preparing Your Home' => 'preparing-your-home', 'Pricing Your Home' => 'pricing-your-home', 'Flat Fee MLS' => 'flat-fee-mls', 'FSBO Contracts' => 'fsbo-contracts', 'Selling Process' => 'selling-process', 'Handling Negotiations' => 'handling-negotiations', 'Finances of Selling' => 'finances-of-selling'],
    'buying-a-home'    => ['Buying Process' => 'buying-process', 'Finding a Home' => 'finding-a-home', 'Inspecting a Home' => 'inspecting-a-home', 'Making an Offer' => 'making-an-offer', 'Mortgage Basics' => 'mortgage-basics', 'Moving Tips' => 'moving-tips', 'Preparing to Buy' => 'preparing-to-buy', 'Where to Live' => 'where-to-live'],
    'homeowner-guides' => ['Home Improvements' => 'home-improvements', 'Landscaping' => 'landscaping', 'Lifestyle & Design' => 'lifestyle-design', 'Refinancing' => 'refinancing', 'Renting a Home' => 'renting-a-home'],
];
$bc_footer_modifiers = [
    'selling-a-home'   => 'bc-footer-topics--selling',
    'buying-a-home'    => 'bc-footer-topics--buying',
    'homeowner-guides' => 'bc-footer-topics--homeowner',
];
?>
<section class="bc-footer-topics-section">
    <div class="bc-container">
        <div class="bc-footer-topics-label">Dive into more topics</div>
        <div class="bc-footer-topics-pills">
            <?php foreach ($bc_footer_topics as $parent_slug => $subcats) :
                $modifier = $bc_footer_modifiers[$parent_slug] ?? '';
                foreach ($subcats as $label => $slug) :
                    $t = get_term_by('slug', $slug, 'category');
                    if (!$t || $t->count === 0) continue;
            ?>
            <a href="<?php echo esc_url(get_category_link($t->term_id)); ?>" class="bc-topic-sub <?php echo esc_attr($modifier); ?>"><?php echo esc_html($label); ?></a>
            <?php endforeach; endforeach; ?>
        </div>
    </div>
</section>

<style>
.bc-footer{background:#1b1b1b;color:#fff;font-size:16px;padding:80px 0 32px}
.bc-footer-inner{max-width:1280px;margin:0 auto;padding:0 16px}
.bc-footer-grid{max-width:1200px;margin:0 auto 64px;display:grid;grid-template-columns:1fr 1fr 1fr 2fr;gap:48px}
.bc-footer-col-title{font-size:16px;font-weight:700;letter-spacing:normal;text-transform:uppercase;color:#ffffffa6;margin-bottom:24px}
.bc-footer-col ul{list-style:none}
.bc-footer-col ul li{margin-bottom:16px}
.bc-footer-col ul li a{text-decoration:none;color:#fff;font-size:16px;font-weight:400}
.bc-footer-col ul li a:hover{opacity:.85}
.bc-footer-btn{display:inline-flex;align-items:center;gap:12px;padding:10px 16px;border-radius:8px;border:1px solid #3a3a3a;background:#2a2a2a;text-decoration:none;color:#fff;transition:border-color .15s,background .15s;white-space:nowrap;min-width:180px}
.bc-footer-btn:hover{border-color:#666;background:#333}
.bc-footer-btn-icon{flex-shrink:0;display:flex;align-items:center}
.bc-footer-btn-text{display:flex;flex-direction:column}
.bc-footer-btn-label{font-size:11px;color:#ffffffa6;line-height:1.2}
.bc-footer-btn-name{font-size:15px;font-weight:700;color:#fff;line-height:1.3}
.bc-footer-bar{display:flex;align-items:center;gap:20px;padding:20px 0;flex-wrap:wrap}
.bc-footer-bar-socials{display:flex;gap:2px;align-items:center}
.bc-footer-bar-socials a{color:#ffffffa6;text-decoration:none;display:inline-flex;width:36px;height:36px;align-items:center;justify-content:center;transition:color .15s}
.bc-footer-bar-socials a:hover{color:#fff}
.bc-footer-bar-sep{width:1px;height:20px;background:#374151;flex-shrink:0}
.bc-footer-bar-contact{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
.bc-footer-bar-contact a{color:#ffffffa6;text-decoration:none;font-size:16px;transition:color .15s}
.bc-footer-bar-contact a:hover{color:#fff}
.bc-footer-bar-ctas{display:flex;gap:10px;margin-left:auto}
.bc-footer-divider{margin:0 0 20px;border:none;border-top:1px solid #2a2a2a}
.bc-footer-bottom-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:20px}
.bc-footer-bottom-row-address{font-size:13px;color:#ffffffa6}
.bc-footer-bottom-row-sep{color:#374151}
.bc-footer-bottom-row-links{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.bc-footer-bottom-row-links a{font-size:13px;color:#ffffffa6;text-decoration:none;transition:color .15s}
.bc-footer-bottom-row-links a:hover{color:#fff}
.bc-footer-legal{font-size:13px;color:#ffffffa6;line-height:1.65}
.bc-footer-legal p{margin-bottom:12px}
.bc-footer-legal a{color:#7d8ff7;text-decoration:underline}
</style>
<footer class="bc-footer">
<div class="bc-footer-inner">
    <div class="bc-footer-grid">
        <div class="bc-footer-col">
            <div class="bc-footer-col-title">Features</div>
            <ul>
                <li><a href="https://www.beycome.com/flat-fee-mls/">Sell My Home</a></li>
                <li><a href="https://www.beycome.com/i-want-to-buy-a-home/">Buy a Home</a></li>
                <li><a href="https://www.beycometitle.com/" target="_blank" rel="noopener noreferrer">Title</a></li>
                <li><a href="https://www.beycome.com/yard-sign/">Yard Sign</a></li>
                <li><a href="https://www.beycome.com/military-fsbo/">Military</a></li>
                <li><a href="https://www.beycome.com/closed-homes/">Closed Homes</a></li>
            </ul>
        </div>
        <div class="bc-footer-col">
            <div class="bc-footer-col-title">Resources</div>
            <ul>
                <li><a href="<?php echo esc_url(home_url('/')); ?>">Blog</a></li>
                <li><a href="https://www.beycome.com/faq/">FAQ</a></li>
                <li><a href="https://www.beycome.com/how-it-works/">How It Works</a></li>
                <li><a href="https://www.beycome.com/real-estate-glossary/">Real Estate Glossary</a></li>
            </ul>
        </div>
        <div class="bc-footer-col">
            <div class="bc-footer-col-title">Company</div>
            <ul>
                <li><a href="https://www.beycome.com/about/">About Us</a></li>
                <li><a href="https://www.beycome.com/reviews/">Reviews</a></li>
                <li><a href="https://www.beycome.com/press/">Press</a></li>
                <li><a href="https://investor.beycome.com/" target="_blank" rel="noopener noreferrer">Investors</a></li>
            </ul>
        </div>
        <div class="bc-footer-col">
            <div class="bc-footer-col-title">Tools</div>
            <ul>
                <li><a href="https://www.beycome.com/how-much-is-my-home-worth/">Property Price Estimator</a></li>
                <li><a href="https://www.beycome.com/market-trends/">Market Trends</a></li>
                <li><a href="https://www.beycome.com/calculators/">Real Estate Calculators</a></li>
            </ul>
        </div>
    </div>

    <div class="bc-footer-bar">
        <div class="bc-footer-bar-socials">
            <a href="https://www.facebook.com/beycomeUSA/" target="_blank" rel="noopener noreferrer" aria-label="Beycome on Facebook">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M10.51,6.68v-1.56c0-.81.06-1.25,1.19-1.25h2.09V.75h-3c-2.91,0-3.58,1.55-3.58,4.09v1.84h-2.21v3.12h2.21v9.05h3.29v-9.05h2.99l.32-3.12h-3.3Z" fill="currentColor"/></svg>
            </a>
            <a href="https://x.com/beycome" target="_blank" rel="noopener noreferrer" aria-label="Beycome on X">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M11.49,8.4L18.14.68h-1.57l-5.77,6.71L6.18.68H.87l6.97,10.14L.87,18.92h1.58l6.09-7.08,4.87,7.08h5.32l-7.23-10.52h0ZM9.34,10.91l-.71-1.01L3.01,1.86h2.42l4.53,6.49.71,1.01,5.89,8.43h-2.42l-4.81-6.88h0Z" fill="currentColor"/></svg>
            </a>
            <a href="https://www.instagram.com/beycome/" target="_blank" rel="noopener noreferrer" aria-label="Beycome on Instagram">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M13.1115 0.753906H5.00447C3.68082 0.755758 2.4119 1.2824 1.47594 2.21837C0.539968 3.15434 0.0133264 4.42325 0.0114746 5.74691L0.0114746 13.8539C0.0133264 15.1776 0.539968 16.4465 1.47594 17.3824C2.4119 18.3184 3.68082 18.8451 5.00447 18.8469H13.1115C14.4353 18.8453 15.7045 18.3188 16.6407 17.3828C17.5768 16.4468 18.1036 15.1777 18.1055 13.8539V5.74691C18.1036 4.42308 17.5768 3.15401 16.6407 2.21801C15.7045 1.28202 14.4353 0.755494 13.1115 0.753906ZM16.4995 13.8539C16.4984 14.7521 16.1411 15.6133 15.506 16.2484C14.8708 16.8836 14.0097 17.2408 13.1115 17.2419H5.00447C4.10625 17.2408 3.24511 16.8836 2.60997 16.2484C1.97482 15.6133 1.61753 14.7521 1.61647 13.8539V5.74691C1.61753 4.84868 1.97482 3.98754 2.60997 3.3524C3.24511 2.71725 4.10625 2.35996 5.00447 2.35891H13.1115C14.0097 2.35996 14.8708 2.71725 15.506 3.3524C16.1411 3.98754 16.4984 4.84868 16.4995 5.74691V13.8539Z" fill="currentColor"/><path d="M9.05845 5.14258C8.13719 5.14258 7.23661 5.41577 6.47061 5.92759C5.7046 6.43942 5.10758 7.1669 4.75502 8.01804C4.40247 8.86917 4.31023 9.80575 4.48996 10.7093C4.66969 11.6129 5.11332 12.4428 5.76475 13.0943C6.41618 13.7457 7.24616 14.1893 8.14972 14.3691C9.05329 14.5488 9.98985 14.4566 10.841 14.104C11.6921 13.7515 12.4196 13.1544 12.9314 12.3884C13.4433 11.6224 13.7165 10.7218 13.7165 9.80058C13.7151 8.5656 13.224 7.38159 12.3507 6.50834C11.4774 5.63508 10.2934 5.1439 9.05845 5.14258ZM9.05845 12.8546C8.45443 12.8546 7.86397 12.6755 7.36174 12.3399C6.85951 12.0043 6.46807 11.5273 6.23692 10.9693C6.00577 10.4112 5.94529 9.79719 6.06313 9.20477C6.18097 8.61235 6.47184 8.06818 6.89895 7.64107C7.32606 7.21396 7.87023 6.9231 8.46265 6.80526C9.05506 6.68742 9.66912 6.7479 10.2272 6.97905C10.7852 7.2102 11.2622 7.60164 11.5978 8.10387C11.9333 8.60609 12.1125 9.19655 12.1125 9.80058C12.1114 10.6102 11.7893 11.3864 11.2168 11.9589C10.6443 12.5314 9.8681 12.8535 9.05845 12.8546Z" fill="currentColor"/><circle cx="13.9165" cy="4.98" r="1.2" fill="currentColor"/></svg>
            </a>
            <a href="https://linkedin.com/company/beycome" target="_blank" rel="noopener noreferrer" aria-label="Beycome on LinkedIn">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M4.61,18.92V7.36H.77v11.56h3.84ZM2.69,5.79c.57,0,1.11-.23,1.51-.64.4-.4.62-.95.62-1.52s-.23-1.11-.63-1.52c-.4-.4-.95-.63-1.52-.63s-1.11.23-1.52.63c-.4.4-.63.95-.63,1.52,0,.57.22,1.12.62,1.52.4.4.95.63,1.51.64h.02ZM6.74,18.92h3.84v-6.46c-.01-.32.03-.63.13-.94.14-.41.41-.76.76-1.01.35-.25.77-.39,1.21-.39,1.39,0,1.95,1.06,1.95,2.61v6.18h3.84v-6.63c0-3.55-1.9-5.2-4.42-5.2-.7-.03-1.4.14-2.02.48-.62.34-1.12.85-1.47,1.46h.03v-1.68h-3.84c.05,1.08,0,11.56,0,11.56Z" fill="currentColor"/></svg>
            </a>
            <a href="https://www.zillow.com/profile/gobeycome/" target="_blank" rel="noopener noreferrer" aria-label="Beycome on Zillow">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M12.15,5.86c.08-.02.11,0,.16.06.26.32,1.09,1.41,1.32,1.71,0,.01.01.02.02.04,0,.01,0,.03,0,.04,0,.01,0,.03-.01.04,0,.01-.02.02-.03.03-1.7,1.45-3.24,3.08-4.6,4.86-.02.03,0,.03.01.03,2.59-1.08,5.27-1.94,8.01-2.57v-2.64L9.51,1.04,1.97,7.47v2.88c3.22-1.86,6.63-3.37,10.18-4.48h0ZM5.87,16.89s.05.04.08.05c.03,0,.06,0,.09-.02,3.51-1.71,7.2-3.02,11-3.91v5.91H1.97v-6.14c2.32-1.29,4.73-2.43,7.2-3.41.03-.01.04,0,.01.03-1.8,1.63-3.39,3.49-4.71,5.53-.05.08-.05.11,0,.16l1.4,1.81Z" fill="currentColor"/></svg>
            </a>
        </div>
        <div class="bc-footer-bar-sep"></div>
        <div class="bc-footer-bar-contact">
            <a href="tel:+18046565007">1-804-656-5007</a>
            <span class="bc-footer-bar-sep"></span>
            <a href="mailto:contact@beycome.com">contact@beycome.com</a>
        </div>
        <div class="bc-footer-bar-ctas">
            <a href="https://beycome.zohobookings.com/#/customer/beycome" target="_blank" rel="noopener noreferrer" class="bc-footer-btn">
                <span class="bc-footer-btn-icon"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3V2zm13 8H4v10h16V10z" fill="currentColor"/></svg></span>
                <span class="bc-footer-btn-text">
                    <span class="bc-footer-btn-name">Schedule a call</span>
                </span>
            </a>
            <a href="https://wa.me/18046565007" target="_blank" rel="noopener noreferrer" class="bc-footer-btn">
                <span class="bc-footer-btn-icon"><svg viewBox="0 0 17 17" width="22" height="22" aria-hidden="true"><path d="M16.5333 8.7668C16.5333 13.0668 13.02 16.5535 8.67999 16.5535C7.29999 16.5535 6.01333 16.2001 4.87999 15.5868L0.533325 16.9668L1.95333 12.7868C1.21185 11.5746 0.81965 10.1811 0.819992 8.76013C0.826659 4.45346 4.34666 0.966797 8.68666 0.966797C13.0133 0.966797 16.5333 4.45346 16.5333 8.7668ZM8.67999 2.20013C5.03999 2.20013 2.07999 5.14013 2.07999 8.75346C2.07999 10.1868 2.54666 11.5135 3.33333 12.5935L2.50666 15.0335L5.03999 14.2335C6.12135 14.9422 7.38707 15.3178 8.67999 15.3135C12.32 15.3135 15.28 12.3801 15.28 8.76013C15.2712 7.01671 14.5715 5.3479 13.3343 4.11948C12.0972 2.89106 10.4234 2.20325 8.67999 2.2068V2.20013ZM12.6467 10.5535C12.5933 10.4735 12.4667 10.4268 12.2733 10.3335C12.0867 10.2401 11.14 9.77346 10.96 9.71346C10.7867 9.6468 10.6533 9.61346 10.5267 9.8068C10.3933 10.0001 10.0267 10.4268 9.91999 10.5535C9.80666 10.6868 9.69333 10.7001 9.49999 10.6068C9.30666 10.5068 8.68666 10.3068 7.95333 9.65346C7.53454 9.26854 7.17509 8.82372 6.88666 8.33346C6.76666 8.14013 6.86666 8.04013 6.96666 7.9468C7.05333 7.86013 7.15999 7.72013 7.25333 7.61346C7.35333 7.50013 7.38666 7.41346 7.44666 7.29346C7.51333 7.16013 7.47999 7.05346 7.43333 6.96013C7.37999 6.86013 6.99999 5.92013 6.83333 5.54013C6.67333 5.15346 6.51333 5.22013 6.40666 5.22013C6.29333 5.22013 6.15999 5.20013 6.03333 5.20013C5.89999 5.20013 5.69999 5.25346 5.51999 5.44013C5.34666 5.63346 4.85333 6.09346 4.85333 7.04013C4.85333 7.97346 5.53999 8.88013 5.63333 9.01346C5.72666 9.14013 6.96666 11.1268 8.91999 11.8935C10.88 12.6601 10.88 12.4068 11.2333 12.3735C11.5867 12.3401 12.3667 11.9068 12.5333 11.4668C12.6933 11.0201 12.6933 10.6335 12.6467 10.5535Z" fill="currentColor"/></svg></span>
                <span class="bc-footer-btn-text">
                    <span class="bc-footer-btn-name">WhatsApp</span>
                </span>
            </a>
        </div>
    </div>

    <hr class="bc-footer-divider">

    <div class="bc-footer-bottom-row">
        <span class="bc-footer-bottom-row-address">Beycome Corp., 5701 Sunset Drive #224, South Miami, FL 33143</span>
        <span class="bc-footer-bottom-row-sep">|</span>
        <div class="bc-footer-bottom-row-links">
            <a href="https://www.beycome.com/terms-and-conditions/">Terms &amp; Conditions</a>
            <a href="https://www.beycome.com/privacy-policy/">Privacy Policy</a>
            <a href="https://www.beycome.com/dmca/">DMCA</a>
            <a href="https://www.beycome.com/accessibility/">Accessibility</a>
        </div>
    </div>

    <div class="bc-footer-legal">
        <p><strong>Agreement to Terms and Privacy Policy:</strong> By using beycome.com, you agree to our <a href="https://www.beycome.com/terms-and-conditions/">Terms and Conditions</a> and our <a href="https://www.beycome.com/privacy-policy/">Privacy Policy</a>.</p>
        <p><strong>Technology Platform — Not a Brokerage:</strong> Beycome Corp. is a software technology company and does not provide real estate brokerage, mortgage lending, or title insurance services. Beycome Corp. is not a licensed real estate broker, mortgage lender, or title insurer, and nothing on this platform constitutes real estate, legal, financial, or investment advice. The beycome.com platform connects consumers with independently operated licensed entities and third-party service providers. Beycome Corp. expressly disclaims any liability arising from real estate transactions, brokerage activities, loan origination, or title services conducted by any affiliated or third-party company.</p>
        <p><strong>Affiliated Licensed Entities (Separate Legal Entities):</strong> The following companies are legally separate from Beycome Corp., each governed by its own licensed management as required by applicable law, and each solely responsible for its own licensed activities: Beycome Brokerage Realty LLC, Beycome Brokerage Realty Inc., and Beycome of Florida LLC provide real estate brokerage services; Beycome Mortgage LLC provides mortgage loan origination in Florida; Beycome Title of Florida LLC provides title insurance services in Florida; Beycome Title of Texas LLC provides title insurance services in Texas. These entities share common ownership with Beycome Corp. but operate independently and are individually liable for their respective licensed activities. Licensed states: FL (Beycome of Florida LLC), CA &mdash; CalDRE #01804683 (Beycome Brokerage Realty Inc.), CT (Beycome of Connecticut), AL, GA, IL, IN, MI, MN, NC, OH, SC, TN, TX (Beycome Brokerage Realty LLC). TREC: <a href="/legal/IABS-1-2.pdf" rel="noreferrer noopener" target="_blank">Brokerage Services</a>, <a href="https://www.trec.texas.gov/forms/consumer-protection-notice" rel="noreferrer noopener" target="_blank">Consumer Protection Notice</a>.</p>
        <p><strong>Legal Disclaimer:</strong> Information is current as of May 14, 2024. Beycome Corp. may modify or discontinue products and benefits without notice. No guarantee, warranty, or representation of any kind is made regarding the completeness or accuracy of descriptions or measurements (including square footage and property condition); such should be independently verified, and Beycome Corp. expressly disclaims any liability in connection therewith.</p>
        <p><strong>Trademark Notice:</strong> Logos and trademarks on this website are used to illustrate industry partnerships and do not imply endorsement unless explicitly stated. All trademarks belong to their respective owners.</p>
        <p>IDX&copy; information is provided exclusively for consumers' personal, non-commercial use. It may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing. Information deemed reliable but not guaranteed to be accurate. Listings information is updated daily. Broker Compensation is fully negotiable and is not fixed, controlled, recommended, or suggested by any MLS or association of REALTORS&reg;. Beycome fully supports the <a href="https://www.hud.gov" rel="noreferrer noopener" target="_blank">Equal Housing Opportunity</a> laws.</p>
    </div>
</div>
</footer>
<script>
(function() {
    // Guard against double-init: WP Fastest Cache bundles this inline IIFE
    // into the combined deferred JS file while ALSO leaving the inline tag in
    // place, so without this both copies would attach click listeners and
    // every other click would toggle the .open class back off — making the
    // search button look broken (visible icon, nothing happens on click).
    if (window.__bcHSearchInit) return;
    window.__bcHSearchInit = true;

    var form = document.getElementById('bc-hsearch');
    var btn = document.getElementById('bc-hsearch-btn');
    var input = document.getElementById('bc-hsearch-input');
    if (!form || !btn || !input) return;

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!form.classList.contains('open')) {
            form.classList.add('open');
            setTimeout(function() { input.focus(); }, 150);
        } else if (input.value.trim()) {
            form.submit();
        } else {
            form.classList.remove('open');
        }
    });

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') { form.classList.remove('open'); input.value = ''; }
    });

    document.addEventListener('click', function(e) {
        if (form.classList.contains('open') && !form.contains(e.target)) {
            form.classList.remove('open');
            input.value = '';
        }
    });

    var menuBtn = document.getElementById('bc-mobile-menu-btn');
    var menu = document.getElementById('bc-mobile-menu');
    if (menuBtn && menu) {
        var iconOpen = menuBtn.querySelector('.bc-menu-icon-open');
        var iconClose = menuBtn.querySelector('.bc-menu-icon-close');
        menuBtn.addEventListener('click', function() {
            var isOpen = menu.classList.toggle('open');
            menu.style.display = isOpen ? 'block' : 'none';
            menuBtn.setAttribute('aria-expanded', isOpen);
            if (iconOpen) iconOpen.style.display = isOpen ? 'none' : 'block';
            if (iconClose) iconClose.style.display = isOpen ? 'block' : 'none';
        });
        document.addEventListener('click', function(e) {
            if (menu.classList.contains('open') && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
                menu.classList.remove('open');
                menu.style.display = 'none';
                menuBtn.setAttribute('aria-expanded', 'false');
                if (iconOpen) iconOpen.style.display = 'block';
                if (iconClose) iconClose.style.display = 'none';
            }
        });
    }
})();
</script>
<?php wp_footer(); ?>
</body>
</html>
