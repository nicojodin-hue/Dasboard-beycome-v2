<?php
$bc_footer_topics = [
    'selling-a-home'   => ['Preparing Your Home' => 'preparing-your-home', 'Pricing Your Home' => 'pricing-your-home', 'Flat Fee MLS' => 'flat-fee-mls', 'FSBO Contracts' => 'fsbo-contracts', 'Selling Process' => 'selling-process', 'Handling Negotiations' => 'handling-negotiations', 'Finances of Selling' => 'finances-of-selling'],
    'buying-a-home'    => ['Buying Process' => 'buying-process', 'Finding a Home' => 'finding-a-home', 'Inspecting a Home' => 'inspecting-a-home', 'Making an Offer' => 'making-an-offer', 'Mortgage Basics' => 'mortgage-basics', 'Moving Tips' => 'moving-tips', 'Preparing to Buy' => 'preparing-to-buy', 'Where to Live' => 'where-to-live'],
    'homeowner-guides' => ['Home Improvements' => 'home-improvements', 'Landscaping' => 'landscaping', 'Lifestyle & Design' => 'lifestyle-design', 'Refinancing' => 'refinancing', 'Renting a Home' => 'renting-a-home'],
    'local-insights'   => ['Florida' => 'florida', 'Georgia' => 'georgia', 'Texas' => 'texas', 'North Carolina' => 'north-carolina', 'South Carolina' => 'south-carolina', 'Ohio' => 'ohio'],
];
$bc_footer_modifiers = [
    'selling-a-home'   => 'bc-footer-topics--selling',
    'buying-a-home'    => 'bc-footer-topics--buying',
    'homeowner-guides' => 'bc-footer-topics--homeowner',
    'local-insights'   => 'bc-footer-topics--local',
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

<footer class="bc-footer">
    <div class="bc-footer-inner">
        <div class="bc-footer-grid">
            <div>
                <h3>Features</h3>
                <ul>
                    <li><a href="https://www.beycome.com/flat-fee-mls/">Sell My Home</a></li>
                    <li><a href="https://www.beycome.com/i-want-to-buy-a-home">Buy a Home</a></li>
                    <li><a href="https://www.beycometitle.com/">Title</a></li>
                    <li><a href="https://www.beycome.com/how-much-is-my-home-worth">Property Price Estimator</a></li>
                    <li><a href="https://www.beycome.com/calculators">Real Estate Calculators</a></li>
                    <li><a href="https://www.beycome.com/yard-sign">Yard Sign</a></li>
                    <li><a href="https://www.beycome.com/for-sale/military">Military FSBO</a></li>
                    <li><a href="https://www.beycome.com/properties-closed/all">Closed Homes</a></li>
                </ul>
            </div>
            <div>
                <h3>Resources</h3>
                <ul>
                    <li><a href="https://www.beycome.com/contact">Contact</a></li>
                    <li><a href="https://www.beycome.com/how-it-works">How It Works</a></li>
                    <li><a href="https://www.beycome.com/real-estate-glossary">Real Estate Glossary</a></li>
                    <li><a href="<?php echo esc_url(home_url('/')); ?>">Blog</a></li>
                    <li><a href="https://www.beycome.com/faq">FAQ</a></li>
                </ul>
            </div>
            <div>
                <h3>Company</h3>
                <ul>
                    <li><a href="https://www.beycome.com/about-us">About Us</a></li>
                    <li><a href="https://www.beycome.com/reviews">Reviews</a></li>
                    <li><a href="https://www.beycome.com/press">Press</a></li>
                    <li><a href="https://www.beycome.com/terms-and-conditions">Terms &amp; Conditions</a></li>
                    <li><a href="https://www.beycome.com/privacy-policy">Privacy Policy</a></li>
                    <li><a href="https://www.beycome.com/dmca">DMCA</a></li>
                    <li><a href="https://www.beycome.com/accessibility">Accessibility</a></li>
                </ul>
            </div>
            <div class="bc-footer-contact">
                <h3>Contact</h3>
                <p>5701 Sunset Drive #224,<br>South Miami, FL 33143</p>
                <p>Phone: <a href="tel:+18046565007">804-656-5007</a></p>
                <p>Email: <a href="mailto:contact@beycome.com">contact@beycome.com</a></p>
                <div class="bc-footer-hours">
                    <p><strong>Hours:</strong></p>
                    <p>Mon - Fri: 8:30am - 6:30pm EST</p>
                    <p>Sat: 9am - 5pm EST</p>
                </div>
                <div class="bc-footer-actions">
                    <a href="https://beycome.zohobookings.com/#/customer/beycome" target="_blank" rel="noopener nofollow noreferrer" class="bc-footer-btn bc-footer-btn-call">Schedule a call</a>
                    <a href="https://wa.me/18046565007" target="_blank" rel="noopener nofollow noreferrer" class="bc-footer-btn bc-footer-btn-whatsapp">WhatsApp</a>
                </div>
                <div class="bc-footer-social">
                    <p class="bc-footer-social-title">FOLLOW US</p>
                    <div class="bc-footer-social-icons">
                        <a href="https://www.facebook.com/beycomeUSA/" target="_blank" rel="nofollow noreferrer" aria-label="Facebook">f</a>
                        <a href="https://www.instagram.com/beycome/" target="_blank" rel="nofollow noreferrer" aria-label="Instagram">in</a>
                        <a href="https://linkedin.com/company/beycome" target="_blank" rel="nofollow noreferrer" aria-label="LinkedIn">li</a>
                        <a href="https://x.com/beycome" target="_blank" rel="nofollow noreferrer" aria-label="X">X</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="bc-footer-disclaimer">
            <p><strong>Agreement to Terms and Privacy Policy:</strong> By using beycome.com, you agree to our <a href="https://www.beycome.com/terms-and-conditions" target="_blank">Terms and Conditions</a> and our <a href="https://www.beycome.com/privacy-policy" target="_blank">Privacy Policy</a>.</p>
            <p class="bc-footer-copy">All rights reserved, Copyright <?php echo date('Y'); ?> beycome&trade; | Made with passion in the USA.</p>
        </div>
    </div>
</footer>
<script>
(function() {
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
