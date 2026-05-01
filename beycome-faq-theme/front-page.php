<?php get_header(); ?>

<!-- HERO -->
<section class="bc-hero">
    <div class="bc-hero-inner">
        <h1>How can we<br>help?</h1>
        <p>Learn how to use Beycome—from listing to closing—<br>plus guidance on showings, open houses, mortgages,<br>and answers to common questions.</p>
        <div class="bc-search-bar">
            <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
                <input type="search" name="s" placeholder='Search FAQs (e.g., "cancel listing", "earnest money")' value="<?php echo get_search_query(); ?>">
                <button type="submit" aria-label="Search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
            </form>
        </div>
    </div>
</section>

<!-- CATEGORIES -->
<section class="bc-section">
    <div class="bc-container">
        <div class="bc-categories">
            <?php
            $cards = [
                ['slug' => 'knowledge-base', 'name' => 'Knowledge Base', 'desc' => 'In-depth articles about mortgages, closing costs, home equity, and everything you need to buy or sell.', 'color' => 'hsla(230,86.1%,72%,1)', 'bg' => 'hsla(230,86.1%,72%,0.1)', 'icon' => '<path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>', 'cta' => 'Browse articles'],
                ['slug' => 'faq', 'name' => 'How to use Beycome', 'desc' => 'Step-by-step guides for using Beycome — listing your home, managing showings, and closing your deal.', 'color' => 'hsla(137,28%,49%,1)', 'bg' => 'hsla(137,28%,49%,0.1)', 'icon' => '<path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"/>', 'cta' => 'Browse guides'],
                ['tag' => 'mls-listing', 'name' => 'MLS Listing', 'desc' => 'How to list on the MLS, manage your listing, update photos, and handle offers with Beycome.', 'color' => 'hsla(330,82%,60%,1)', 'bg' => 'hsla(330,82%,60%,0.1)', 'icon' => '<path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>', 'cta' => 'MLS guides'],
                ['tag' => 'title', 'name' => 'Title', 'desc' => 'Title insurance, title search, and how Beycome Title provides fully remote closings.', 'color' => 'hsla(32,94%,44%,1)', 'bg' => 'hsla(32,94%,44%,0.1)', 'icon' => '<path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/>', 'cta' => 'Title guides'],
                ['tag' => 'buyer', 'name' => 'Buyer', 'desc' => 'Everything you need to know about buying a home — from pre-approval to closing day.', 'color' => 'hsla(16,100%,73%,1)', 'bg' => 'hsla(16,100%,73%,0.12)', 'icon' => '<path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>', 'cta' => 'Buyer guides'],
                ['tag' => 'closing', 'name' => 'Closing', 'desc' => 'What to expect at closing — documents, timelines, costs, and how Beycome Title handles it remotely.', 'color' => 'hsla(210,39%,14%,1)', 'bg' => 'hsla(210,39%,14%,0.08)', 'icon' => '<path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>', 'cta' => 'Closing guides'],
                ['tag' => 'credit-esential', 'name' => 'Credit Essential', 'desc' => 'Credit scores, how they affect your mortgage, and how to improve your score before buying.', 'color' => 'hsla(0,91%,65%,1)', 'bg' => 'hsla(0,91%,65%,0.1)', 'icon' => '<path d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/>', 'cta' => 'Credit guides'],
            ];

            foreach ($cards as $card) :
                if (isset($card['slug'])) {
                    $link = home_url('/category/' . $card['slug'] . '/');
                } else {
                    $tag = get_term_by('slug', $card['tag'], 'post_tag');
                    $link = $tag ? get_tag_link($tag->term_id) : '#';
                }
            ?>
            <a href="<?php echo esc_url($link); ?>" class="bc-category-card">
                <div class="bc-card-icon" style="background:<?php echo $card['bg']; ?>">
                    <svg viewBox="0 0 24 24" fill="none" stroke="<?php echo $card['color']; ?>" stroke-width="1.5" width="24" height="24"><?php echo $card['icon']; ?></svg>
                </div>
                <h3><?php echo esc_html($card['name']); ?></h3>
                <p><?php echo esc_html($card['desc']); ?></p>
                <span class="bc-card-arrow"><?php echo esc_html($card['cta']); ?> &rarr;</span>
            </a>
            <?php endforeach; ?>

            <a href="https://www.beycome.com/calculators" class="bc-category-card">
                <div class="bc-card-icon" style="background:hsla(230,86.1%,72%,0.1)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="hsla(230,86.1%,72%,1)" stroke-width="1.5" width="24" height="24"><path d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008ZM10.5 6h3m-6.75 0h.008v.008H6.75v-.008Zm0 2.25h.008v.008H6.75v-.008ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"/></svg>
                </div>
                <h3>Real Estate Calculators</h3>
                <p>20 free calculators — mortgage, closing costs, commission, rental ROI, and more.</p>
                <span class="bc-card-arrow">All calculators &rarr;</span>
            </a>
        </div>
    </div>
</section>

<!-- LATEST ARTICLES -->
<section style="padding:48px 0;background:#f9fafb">
    <div class="bc-container" style="max-width:1280px">
        <h2 class="bc-section-title" style="text-align:center;margin-bottom:12px">Latest Articles.</h2>
        <p style="font-size:20px;color:#364153;text-align:center;margin-bottom:40px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.5">Browse our most recent guides across all categories.</p>
        <div class="bc-resources-grid">
            <?php
            $resource_tags = [
                ['name' => 'Knowledge Base', 'cat' => 'knowledge-base', 'type' => 'category'],
                ['name' => 'Buyer', 'tag' => 'buyer', 'type' => 'tag'],
                ['name' => 'Closing', 'tag' => 'closing', 'type' => 'tag'],
            ];
            foreach ($resource_tags as $rt) :
                $args = ['posts_per_page' => 4, 'orderby' => 'date', 'order' => 'DESC'];
                if ($rt['type'] === 'category') {
                    $args['category_name'] = $rt['cat'];
                } else {
                    $args['tag'] = $rt['tag'];
                }
                $q = new WP_Query($args);
            ?>
            <div>
                <h3 class="bc-resources-heading"><?php echo esc_html($rt['name']); ?></h3>
                <ul class="bc-resources-list">
                    <?php while ($q->have_posts()) : $q->the_post(); ?>
                    <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
                    <?php endwhile; wp_reset_postdata(); ?>
                </ul>
                <?php
                if ($rt['type'] === 'category') {
                    $cat_obj = get_category_by_slug($rt['cat']);
                    if ($cat_obj) echo '<a href="' . esc_url(get_category_link($cat_obj->term_id)) . '" style="font-size:14px;font-weight:700;color:var(--c-accent-orange);display:block;margin-top:8px">Browse all ' . esc_html($rt['name']) . ' articles &rarr;</a>';
                } else {
                    $tag_obj = get_term_by('slug', $rt['tag'], 'post_tag');
                    if ($tag_obj) echo '<a href="' . esc_url(get_tag_link($tag_obj->term_id)) . '" style="font-size:14px;font-weight:700;color:var(--c-accent-orange);display:block;margin-top:8px">Browse all ' . esc_html($rt['name']) . ' articles &rarr;</a>';
                }
                ?>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- FAQ -->
<section style="padding:80px 0;background:#fff">
    <div class="bc-container" style="max-width:1280px">
        <h2 class="bc-faq-section-title">Frequently Asked Questions.</h2>
        <p class="bc-faq-subtitle">Common questions about selling, buying, and closing with Beycome.</p>
        <div class="bc-faq-grid">
            <div class="bc-faq-col">
                <div class="bc-faq-item open">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>What is Beycome?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">Beycome is a real estate platform that lets you sell, buy, and close your home without traditional agent commissions. Sellers list on the MLS for a $99 flat fee. Buyers get 2% back at closing. <a href="https://www.beycometitle.com/">Beycome Title</a> handles fully remote closings.</div>
                </div>
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>How much does it cost to list with Beycome?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">Beycome's <a href="https://www.beycome.com/flat-fee-mls">flat fee MLS listing</a> is just $99. Your home gets listed on the local MLS and syndicates to Zillow, Realtor.com, Redfin, and hundreds of other websites. No listing agent commission — ever.</div>
                </div>
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>What is flat fee MLS?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">Flat fee MLS lets you list your home on the MLS for a one-time fixed price ($99 with Beycome) instead of paying a 2-3% listing agent commission. <a href="<?php echo esc_url(home_url('/knowledge-base/what-is-flat-fee-mls/')); ?>">What is flat fee MLS? Full guide &rarr;</a></div>
                </div>
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>Where is my listing advertised?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">Your Beycome listing syndicates to the local MLS and automatically appears on Zillow, Realtor.com, Redfin, Trulia, and hundreds of other real estate websites.</div>
                </div>
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>How does Beycome Title work?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer"><a href="https://www.beycometitle.com/">Beycome Title</a> offers fully remote closings. All documents are available through an online portal, you sign electronically via secure video conference, and a dedicated closing coordinator manages every detail.</div>
                </div>
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>Where can I find Beycome's calculators?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">Beycome offers 20 free real estate calculators at <a href="https://www.beycome.com/calculators">beycome.com/calculators</a> — including mortgage, closing cost, commission, rent vs buy, and more.</div>
                </div>
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>How does Beycome help me with Federal &amp; State disclosures?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">We provide access to the required disclosures, contracts, and addenda based on your state — available to download directly from your dashboard at no cost. Understanding which disclosures apply can be confusing, so we surface only the ones relevant to your transaction. You can complete them digitally, sign electronically, and keep everything organized in one place — no printing, scanning, or emailing needed.</div>
                </div>
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>How do I choose between offers?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">You can use Artur, our in-house AI, to help guide you through the process. It provides insights and suggestions, but it won't make the decision for you — you stay fully in control. Look beyond just price. Compare financing, contingencies, closing timeline, and the overall strength of the buyer. The highest offer isn't always the best one.</div>
                </div>
            </div>
            <div class="bc-faq-col">
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>Do buyers save with Beycome?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">Yes. Beycome buyers get <strong>2% of the purchase price back at closing</strong>. On a $400,000 home, that's $8,000. <a href="https://www.beycome.com/i-want-to-buy-a-home">Beycome buyer program: get 2% back &rarr;</a></div>
                </div>
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>How much money do I need to buy a house?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">It depends on the loan type. Conventional requires 3-5% down, FHA 3.5%, VA/USDA 0%. With Beycome's 2% rebate, your costs are significantly lower. <a href="https://www.beycome.com/calculators/down-payment-calculator">Down payment calculator &rarr;</a></div>
                </div>
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>Can I use the rebate toward my down payment?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">In many cases, yes — subject to lender approval. The 2% rebate can be applied toward your down payment, closing costs, or returned as cash.</div>
                </div>
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>Can I switch my listing from sale to rent?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">Yes, you can switch your listing between sale and rent through your Beycome seller dashboard.</div>
                </div>
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>Do you provide buyer agent support?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">Yes. Beycome provides dedicated buyer support throughout the process — from property search to closing.</div>
                </div>
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>What if I missed a showing request?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">Missed showing requests are sent to your email and available in your Beycome dashboard. We recommend enabling ShowingTime for automatic scheduling.</div>
                </div>
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>How can I reach out for support or technical help?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">Yes, of course. You can reach us by phone, email, or directly through your dashboard. We also recommend chatting with Artur, our in-house AI, which can answer most questions instantly and guide you through the process. If needed, our team is always here to support you from listing to closing.</div>
                </div>
                <div class="bc-faq-item">
                    <button class="bc-faq-question" onclick="this.parentElement.classList.toggle('open')"><span>Is Beycome's buyer program available nationwide?</span><span class="bc-faq-icon">&#xFF0B;</span></button>
                    <div class="bc-faq-answer">Our buyer program is available in most states we operate in and continues to expand. It allows you to receive a rebate from the buyer agent commission at closing. <a href="https://www.beycome.com/i-want-to-buy-a-home">Discover the Beycome buyer program &rarr;</a></div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
<?php
$schemas = [
    // Organization
    array_merge(['@context' => 'https://schema.org'], beycome_faq_org_schema()),

    // WebSite with SearchAction
    [
        '@context' => 'https://schema.org',
        '@type' => 'WebSite',
        'name' => 'Beycome FAQ',
        'url' => home_url('/'),
        'publisher' => ['@id' => 'https://www.beycome.com/#organization'],
        'potentialAction' => [
            '@type' => 'SearchAction',
            'target' => [
                '@type' => 'EntryPoint',
                'urlTemplate' => home_url('/?s={search_term_string}'),
            ],
            'query-input' => 'required name=search_term_string',
        ],
    ],

    // FAQPage — all FAQ items on the page
    [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'name' => 'Beycome FAQ — Frequently Asked Questions',
        'url' => home_url('/'),
        'mainEntity' => [
            ['@type' => 'Question', 'name' => 'What is Beycome?', 'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'Beycome is a real estate platform that lets you sell, buy, and close your home without traditional agent commissions. Sellers list on the MLS for a $99 flat fee. Buyers get 2% back at closing. Beycome Title handles fully remote closings.']],
            ['@type' => 'Question', 'name' => 'How much does it cost to list with Beycome?', 'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'Beycome\'s flat fee MLS listing is just $99. Your home gets listed on the local MLS and syndicates to Zillow, Realtor.com, Redfin, and hundreds of other websites. No listing agent commission.']],
            ['@type' => 'Question', 'name' => 'How does Beycome Title work?', 'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'Beycome Title offers fully remote closings. All documents are available through an online portal, you sign electronically via secure video conference, and a dedicated closing coordinator manages every detail.']],
            ['@type' => 'Question', 'name' => 'Where is my listing advertised?', 'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'Your Beycome listing syndicates to the local MLS and automatically appears on Zillow, Realtor.com, Redfin, Trulia, and hundreds of other real estate websites.']],
            ['@type' => 'Question', 'name' => 'Where can I find Beycome\'s calculators?', 'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'Beycome offers 20 free real estate calculators at beycome.com/calculators — including mortgage, closing cost, commission, rent vs buy, and more.']],
            ['@type' => 'Question', 'name' => 'What is flat fee MLS?', 'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'Flat fee MLS lets you list your home on the MLS for a one-time fixed price ($99 with Beycome) instead of paying a 2-3% listing agent commission.']],
            ['@type' => 'Question', 'name' => 'Do buyers save with Beycome?', 'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'Yes. Beycome buyers get 2% of the purchase price back at closing. On a $400,000 home, that\'s $8,000.']],
            ['@type' => 'Question', 'name' => 'How much money do I need to buy a house?', 'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'It depends on the loan type. Conventional requires 3-5% down, FHA 3.5%, VA/USDA 0%. With Beycome\'s 2% rebate, your costs are significantly lower.']],
            ['@type' => 'Question', 'name' => 'How does Beycome help me with Federal & State disclosures?', 'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'We provide access to the required disclosures, contracts, and addenda based on your state — available to download directly from your dashboard at no cost. We surface only the ones relevant to your transaction. You can complete them digitally, sign electronically, and keep everything organized in one place.']],
            ['@type' => 'Question', 'name' => 'How do I choose between offers?', 'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'You can use Artur, our in-house AI, to help guide you through the process. Look beyond just price. Compare financing, contingencies, closing timeline, and the overall strength of the buyer. The highest offer isn\'t always the best one.']],
            ['@type' => 'Question', 'name' => 'How can I reach out for support or technical help?', 'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'You can reach us by phone, email, or directly through your dashboard. We also recommend chatting with Artur, our in-house AI, which can answer most questions instantly and guide you through the process.']],
            ['@type' => 'Question', 'name' => 'Is Beycome\'s buyer program available nationwide?', 'acceptedAnswer' => ['@type' => 'Answer', 'text' => 'Our buyer program is available in most states we operate in and continues to expand. It allows you to receive a rebate from the buyer agent commission at closing.']],
        ],
    ],
];
echo json_encode($schemas, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
?>
</script>

<!-- Product Rating — star snippets in search -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "beycome",
    "image": "https://www.beycome.com/logos/logo-beycome-512x512.png",
    "description": "beycome is considered as the top and true Flat Fee MLS service in 2026. List your home on the MLS for just $99 — no listing agent commission. Buyers get 2% back at closing.",
    "brand": {
        "@type": "Brand",
        "name": "Beycome"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "bestRating": "5",
        "worstRating": "1",
        "ratingValue": "4.5",
        "ratingCount": "1352"
    }
}
</script>

<?php get_footer(); ?>
